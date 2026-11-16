# Recipes (data + engine)

English is the source of truth. The planner, diet checks and swaps always run on English recipes; Spanish and
unit conversion are a display layer only (`localize(r)` / `tTitle(r)` in `localize.ts`, `lineText` in `engine.ts`).
Never run planner or diet logic on a localized recipe.

## Files

- `data.ts` `RECIPES` array (+ `MEALS`, `SECTIONS`, `DEPTS`, helper `i()`); `types.ts` the `Recipe` shape
- `engine.ts` scoring, `buildPlans` (3 plan types), diet flags, `swapRecipe` (veg broth, chickpea pasta), `lineText`
- `plan.ts` plan/schedule/chef actions; `store.svelte.ts` state `S` (localStorage `timotei-recipes-v1`) and UI state
- `units.ts` US<->metric (cups/oz/lb <-> ml/g/kg, °F<->°C, also inside step text); `words.ts` Spanish units + ingredient names
- `es/part*.ts` Spanish text per recipe id (`RecipeEs` in `es/types.ts`); `submit.ts` Web3Forms emails (EQUIPMENT, UNITS)

## A recipe entry (`data.ts`)

```ts
{ id: 'kebab-id', mins: { active: 30, total: 130 }, title: 'Title', section: 'Easy Weekly Meals',
  kind: 'Main', weekly: true, meal: ['everyday'], servings: 8, equip: ['Stovetop'], freezer: false, veg: true,
  by: 'Santi', story: 'Their own words (optional)', blurb: 'One line.',
  photos: [{ src: '/recipe-photos/<id>-1.jpg', kind: 'dish', by: 'Santi' }],   // optional
  family: 'shared-key', variant: 'Short name',                                 // only for versions of one dish
  ing: [ i(qty, 'unit', 'name', 'dept', 'note'), SALT, PEPPER ], steps: ['...'], notes: [] }
```

- `kind` → `section`: Main→Easy Weekly Meals, Protein→Protein, Side→Veggies, Carb→Carbs, Breakfast→Breakfast, Treat→Sweet Treats.
  `weekly: true` only for everyday mains (the planner draws from them). Desserts: `meal: ['dessert']`, `kind: 'Treat'`.
- `dept` is one of produce, meat, dairy, bakery, pantry, dry, spice, oil, frozen, other. Units: tsp, tbsp, cup, oz, lb, g, ml, 'can (14.5 oz)', clove, bunch, pinch.
- Same recipe family: shared `family`, each gets a `variant`; a plan never contains two versions; the list shows one card.
- Ingredient names singular and lowercase (the site pluralizes). Fix typos and format only; keep the cook's wording.
- `by`: one name per person (Santiago Timotei Rodriguez and Santi are the same person: use `Santi`).
- Photos live in `static/recipe-photos/`; Google Photos share links: the `og:image` URL with `=w1200` appended is the image.

## Spanish for a recipe

Add an entry in the newest `es/part*.ts` (same id): `title`, optional `blurb`/`story`/`variant`/`notes`, `steps` (same count/order),
`ing` = one `{name, note?}` per English ingredient IN THE SAME ORDER (singular, no quantities). In step text translate unit words
(tazas, cucharadas, cucharaditas, onzas, libras) but keep a number right before them and keep °F, so metric conversion still works.

## Checks

`npx prettier --write src` · `npx svelte-check` · `node scripts/check-i18n.mjs` · `npm run build`. A planner change: sample many
`buildPlans` runs in the browser console (see how variations were tested) rather than eyeballing.
