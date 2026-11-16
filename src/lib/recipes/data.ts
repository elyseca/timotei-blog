// @ts-nocheck -- recipe data ported as-is; typed through the Recipe interface in ./types
import type { Recipe } from './types';
/* Recipe data for Elyse's Recipe Book. Quantities are for the recipe as written. */
export const DEPTS = [
	['produce', 'Produce'],
	['meat', 'Meat & fish'],
	['dairy', 'Dairy, eggs & tofu'],
	['bakery', 'Bakery'],
	['pantry', 'Canned & jarred'],
	['dry', 'Grains & dry goods'],
	['spice', 'Spices & baking'],
	['oil', 'Oils & condiments'],
	['frozen', 'Frozen'],
	['other', 'Other']
];
/* `mins` is hands-on (`active`) and start-to-table (`total`) time in minutes, excluding overnight
   chilling. They feed the effort score, so tweak them if a recipe takes you more or less time. */
/* `weekly: true` marks the easy weekly dishes the meal planner and combos draw from.
   Leave it off for special-occasion recipes. */
export const SECTIONS = [
	'Easy Weekly Meals',
	'Protein',
	'Veggies',
	'Carbs',
	'Breakfast',
	'Sweet Treats'
];
export const KINDS = {
	Main: 'Easy Weekly Meals',
	Protein: 'Protein',
	Side: 'Veggies',
	Carb: 'Carbs',
	Breakfast: 'Breakfast',
	Treat: 'Sweet Treats'
};

export const i = (qty, unit, name, dept, note) => ({
	qty,
	unit: unit || '',
	name,
	dept,
	note: note || ''
});

export const SALT = i(null, '', 'salt', 'spice');
export const PEPPER = i(null, '', 'black pepper', 'spice');

export const SS_ING = [
	i(2, 'tbsp', 'olive oil', 'oil'),
	i(1, 'lb', 'chicken sausage', 'meat', 'sliced'),
	i(2, '', 'onion', 'produce', 'medium, diced'),
	i(3, '', 'carrot', 'produce', 'sliced'),
	i(2, '', 'celery stalk', 'produce', 'diced'),
	i(1, '', 'zucchini', 'produce', 'diced'),
	i(1, 'can (14.5 oz)', 'diced tomatoes', 'pantry'),
	i(6, 'cup', 'low-sodium chicken broth', 'pantry'),
	i(1, 'cup', 'whole-wheat couscous', 'dry'),
	i(2, 'cup', 'spinach or kale', 'produce', 'frozen works'),
	i(1, 'tsp', 'oregano', 'spice'),
	i(1, 'tsp', 'basil', 'spice'),
	i(0.5, 'tsp', 'thyme', 'spice'),
	SALT,
	PEPPER,
	i(1.5, '', 'lemon', 'produce', 'juiced'),
	i(0.25, 'cup', 'fresh parsley', 'produce', 'chopped, to finish')
];

export const RECIPES: Recipe[] = [
	/* ---------- Easy Weekly Meals ---------- */
	{
		id: 'chili',
		mins: { active: 20, total: 55 },
		title: 'Chili',
		section: 'Easy Weekly Meals',
		kind: 'Main',
		weekly: true,
		meal: ['everyday'],
		servings: 8,
		equip: ['Instant Pot'],
		freezer: true,
		veg: false,
		by: 'Elyse',
		blurb: 'Turkey, beans, and fire-roasted tomatoes.',
		ing: [
			i(1, 'tbsp', 'olive oil', 'oil'),
			i(2, 'cup', 'chopped onion', 'produce', 'frozen pre-chopped works well'),
			i(1, 'lb', 'ground turkey', 'meat'),
			i(1, 'tbsp', 'sugar', 'spice'),
			i(1.5, 'tbsp', 'cumin', 'spice'),
			i(2, 'tsp', 'oregano', 'spice'),
			i(1, 'tsp', 'salt', 'spice'),
			i(0.5, 'tsp', 'black pepper', 'spice'),
			i(6, 'oz', 'tomato paste', 'pantry'),
			i(3, 'tbsp', 'tomato sauce', 'pantry'),
			i(2, 'cup', 'broth', 'pantry'),
			i(1, 'can (28 oz)', 'fire-roasted crushed tomatoes', 'pantry'),
			i(3, 'can (16 oz)', 'beans (kidney, black, pinto)', 'pantry', 'drained and rinsed'),
			i(1, 'bag', 'frozen mixed vegetables', 'frozen', 'ideally a corn, green bean, and carrot mix')
		],
		steps: [
			'Set the Instant Pot to Sauté. Add the olive oil and onions; cook until softened.',
			'Add the ground turkey and brown fully.',
			'Add the remaining ingredients and stir well, scraping the bottom of the pot to deglaze. Leave the beans on top and do not stir them in.',
			'Pressure cook on High for 12 minutes. Let it release naturally for 10 minutes, then quick release.',
			'Adjust seasoning.'
		],
		notes: []
	},
	{
		id: 'sausage-soup',
		mins: { active: 25, total: 90 },
		title: 'Chicken Sausage & Couscous Soup',
		section: 'Easy Weekly Meals',
		kind: 'Main',
		weekly: true,
		meal: ['everyday'],
		servings: 6,
		equip: ['Oven', 'Dutch oven'],
		freezer: false,
		veg: false,
		by: 'Elyse',
		blurb: 'Chicken sausage, zucchini, couscous, and lemon.',
		ing: SS_ING.concat([
			i(1, '', 'bay leaf', 'spice'),
			i(1, '', 'parmesan rind', 'dairy', 'optional')
		]),
		steps: [
			'Heat the oven to 425°F with a rack in the lower third. In the Dutch oven, toss the sliced sausage with the onion wedges, carrots, celery, 2 tbsp olive oil, salt, and pepper. Roast uncovered 20 minutes, stirring once, until well browned.',
			'Carefully stir in the tomatoes, 6 cups broth, oregano, basil, thyme, bay leaf, and parmesan rind, scraping up the browned bits. Cover with the lid.',
			'Lower the oven to 350°F and bake 40 minutes, until the carrots are tender.',
			'Stir in the zucchini, couscous, and greens. Cover and return to the oven for 10 minutes, until the couscous is tender.',
			'Remove the bay leaf and rind. Finish with the lemon juice, parsley, and salt and pepper.'
		],
		notes: ['Use oven mitts for the pot and lid, since both stay very hot.']
	},
	{
		id: 'salsa-verde-soup',
		mins: { active: 10, total: 30 },
		title: 'Salsa Verde Chicken Soup',
		section: 'Easy Weekly Meals',
		kind: 'Main',
		weekly: true,
		meal: ['everyday'],
		servings: 4,
		equip: ['Instant Pot'],
		freezer: false,
		veg: false,
		by: 'Elyse',
		blurb: 'Shredded chicken, salsa verde, and green chiles.',
		ing: [
			i(16, 'oz', 'cooked shredded chicken', 'meat'),
			i(2, 'cup', 'salsa verde', 'pantry'),
			i(4, 'cup', 'broth', 'pantry'),
			i(1, 'can (4 oz)', 'diced green chiles', 'pantry'),
			i(1, 'tsp', 'cumin', 'spice'),
			i(1, 'tsp', 'chili powder', 'spice'),
			i(2, 'cup', 'frozen kale', 'frozen'),
			i(0.25, 'cup', 'cilantro', 'produce', 'chopped, frozen or fresh'),
			SALT
		],
		steps: [
			'Add all ingredients to the Instant Pot.',
			'Pressure cook on High for 5 minutes.',
			'Quick release and stir.'
		],
		notes: []
	},
	{
		id: 'white-bean-stew',
		mins: { active: 30, total: 55 },
		title: 'One-Pot Chicken & White Bean Stew',
		section: 'Easy Weekly Meals',
		kind: 'Main',
		weekly: true,
		meal: ['everyday'],
		servings: 8,
		equip: ['Dutch oven', 'Stovetop'],
		freezer: true,
		veg: false,
		by: 'Elyse',
		blurb: 'Chicken thighs, white beans, and baby carrots.',
		ing: [
			i(2, 'tbsp', 'olive oil', 'oil'),
			i(3, '', 'onion', 'produce', 'yellow, diced'),
			i(12, 'oz', 'baby carrots', 'produce', 'about 30, halved if large'),
			i(2, 'tsp', 'dried thyme', 'spice'),
			i(1, 'tsp', 'dried rosemary', 'spice'),
			i(3, 'lb', 'boneless skinless chicken thighs', 'meat'),
			i(8, 'cup', 'low-sodium chicken broth', 'pantry'),
			i(2, 'can (15 oz)', 'white beans', 'pantry', 'drained and rinsed'),
			i(10, 'oz', 'baby spinach', 'produce'),
			i(1.5, 'tsp', 'salt', 'spice'),
			i(1, 'tsp', 'black pepper', 'spice'),
			i(0.5, '', 'lemon', 'produce', 'juiced')
		],
		steps: [
			[
				'Soften the onions',
				'Heat the olive oil in your Le Creuset over medium heat. Add the onions and stir now and then until soft and starting to turn golden, about 8 minutes.'
			],
			[
				'Add herbs',
				'Stir in the thyme, rosemary, salt, and pepper. Cook just until fragrant, about 1 minute.'
			],
			[
				'Simmer everything',
				'Add the baby carrots, chicken thighs, broth, and white beans. Bring to a boil, then turn the heat to low, cover, and simmer until the carrots are fork-tender, about 25 minutes.'
			],
			[
				'Shred the chicken',
				"Move the chicken to a plate and shred it with two forks. If it doesn't fall apart easily, simmer a few more minutes."
			],
			[
				'Finish and serve',
				'Return the chicken to the pot and stir in the spinach a handful at a time until wilted, about 3 minutes. Squeeze in the lemon juice and add more salt if needed.'
			]
		],
		notes: [
			'This fills a 5.5 qt Dutch oven about three-quarters full, so use your biggest pot.',
			'Cool leftovers and portion into containers: keeps about 4 days in the fridge or 3 months in the freezer. For the best texture, freeze without the spinach and add fresh spinach when reheating.'
		]
	},
	{
		id: 'butternut-soup',
		mins: { active: 25, total: 60 },
		title: 'Butternut Squash Soup',
		section: 'Easy Weekly Meals',
		kind: 'Main',
		weekly: true,
		meal: ['everyday'],
		servings: 6,
		equip: ['Instant Pot'],
		freezer: true,
		veg: false,
		by: 'Elyse',
		blurb: 'Butternut squash with golden onion and thyme.',
		ing: [
			i(1, 'tbsp', 'olive oil', 'oil'),
			i(2, '', 'onion', 'produce', 'yellow, diced'),
			i(
				2.5,
				'lb',
				'butternut squash',
				'produce',
				'peeled and cubed (or 2 bags pre-cubed and frozen)'
			),
			i(4, 'cup', 'low-sodium broth', 'pantry'),
			i(12, 'oz', 'silken tofu', 'dairy'),
			i(1, 'tsp', 'salt', 'spice'),
			i(0.5, 'tsp', 'black pepper', 'spice'),
			i(0.25, 'tsp', 'nutmeg or cinnamon', 'spice', 'optional'),
			i(1, 'tsp', 'dried thyme', 'spice'),
			i(1, 'tbsp', 'lemon juice', 'produce', 'to finish')
		],
		steps: [
			'Sauté the onions in the olive oil in the Instant Pot until soft and lightly golden, about 8 minutes, adding the thyme for the last minute.',
			'Add the broth and scrape the bottom of the pot.',
			'Add the squash and seasonings.',
			'Pressure cook on High for 10 minutes.',
			'Natural release 10 minutes. Add the silken tofu and blend until smooth and creamy (immersion blender works best). If it cooled while blending, warm it on Sauté for 2–3 minutes. Stir in the lemon juice before serving.'
		],
		notes: []
	},
	{
		id: 'kung-pao',
		mins: { active: 25, total: 40 },
		title: 'Kung Pao Beef Bowls',
		section: 'Easy Weekly Meals',
		kind: 'Main',
		weekly: true,
		meal: ['everyday'],
		servings: 4,
		equip: ['Instant Pot', 'Stovetop'],
		freezer: false,
		veg: false,
		by: 'Elyse',
		blurb: 'Ground beef, peppers, and peanuts in sweet soy.',
		ing: [
			i(1, 'cup', 'white rice', 'dry'),
			i(1, 'tbsp', 'olive oil', 'oil'),
			i(1, '', 'onion', 'produce', 'small, diced'),
			i(3, '', 'green bell pepper', 'produce', 'diced'),
			i(1, 'bunch', 'scallions', 'produce', 'about 6, whites and greens separated'),
			i(1, 'lb', 'ground beef', 'meat'),
			SALT,
			PEPPER,
			i(null, '', 'hot sauce', 'oil', 'optional'),
			i(0.33333, 'cup', 'Kikkoman Sweet Soy Glaze', 'oil'),
			i(2, 'tsp', 'fresh ginger', 'produce', 'grated'),
			i(0.33333, 'cup', 'roasted peanuts', 'dry')
		],
		steps: [
			'Cook the rice in the Instant Pot.',
			'Slice the scallions, keeping the whites and greens separate.',
			'Sauté the onion, peppers, and scallion whites in the olive oil until soft.',
			'Add the beef, salt, pepper, and hot sauce; brown fully.',
			'Stir in the glaze and ginger; simmer 1–2 minutes until glossy.',
			'Serve over rice with the peanuts and scallion greens.'
		],
		notes: []
	},
	{
		id: 'meatball-bowls',
		mins: { active: 20, total: 45 },
		title: 'Mediterranean Meatball Bowls',
		section: 'Easy Weekly Meals',
		kind: 'Main',
		weekly: true,
		meal: ['everyday'],
		servings: 4,
		equip: ['Oven'],
		freezer: false,
		veg: false,
		by: 'Elyse',
		blurb: 'Meatballs, quinoa, and lemony cucumber-tomato salad.',
		ing: [
			i(1, 'cup', 'quinoa', 'dry'),
			i(24, 'oz', 'low-fat meatballs', 'meat', 'pre-made, or ground turkey'),
			i(6, '', 'mini cucumber', 'produce', 'diced'),
			i(1, 'pint', 'cherry tomatoes', 'produce', 'halved'),
			i(0.25, 'cup', 'fresh parsley', 'produce', 'chopped'),
			i(0.75, 'cup', 'plain Greek yogurt', 'dairy'),
			i(2, 'tbsp', 'lemon juice', 'produce'),
			i(0.25, 'tsp', 'salt', 'spice'),
			i(1, 'lb', 'crinkle-cut carrots', 'produce', 'optional')
		],
		steps: [
			'Cook the quinoa according to the package or the Carbs section.',
			'Bake the meatballs per package directions.',
			'Mix the yogurt, lemon juice, parsley, and salt.',
			'Toss the cucumber and tomatoes with the yogurt mixture.',
			'Optional: roast the carrots at 400°F for 25 minutes.',
			'Assemble the bowls.'
		],
		notes: []
	},
	{
		id: 'salmon-asparagus',
		mins: { active: 15, total: 35 },
		title: 'Salmon, Asparagus & White Rice',
		section: 'Easy Weekly Meals',
		kind: 'Main',
		weekly: true,
		meal: ['everyday'],
		servings: 2,
		equip: ['Oven', 'Instant Pot'],
		freezer: false,
		veg: false,
		by: 'Elyse',
		blurb: 'Salmon, asparagus, and rice.',
		ing: [
			i(2, '', 'salmon fillet', 'meat', '5–6 oz each'),
			i(1, 'lb', 'asparagus', 'produce', 'trimmed'),
			i(1, 'cup', 'white rice', 'dry'),
			i(1, 'tbsp', 'olive oil', 'oil'),
			SALT,
			PEPPER,
			i(0.5, 'tsp', 'paprika', 'spice')
		],
		steps: [
			'Cook the rice in the Instant Pot.',
			'Toss the asparagus with olive oil, salt, and pepper. Roast at 400°F for 15 minutes.',
			'Season the salmon with salt, pepper, and paprika. Add it to the oven at 400°F for the last 12–15 minutes, until it flakes easily.'
		],
		notes: []
	},
	{
		id: 'sheet-pan-chicken',
		mins: { active: 15, total: 50 },
		title: 'Chicken Thigh & Potato Sheet Pan Meal',
		section: 'Easy Weekly Meals',
		kind: 'Main',
		weekly: true,
		meal: ['everyday'],
		servings: 4,
		equip: ['Oven'],
		freezer: false,
		veg: false,
		by: 'Elyse',
		blurb: 'Chicken thighs, potatoes, red onion, and broccoli.',
		ing: [
			i(2, 'lb', 'boneless skinless chicken thighs', 'meat'),
			i(1.5, 'lb', 'baby potatoes', 'produce', 'halved'),
			i(1, '', 'red onion', 'produce', 'large, cut into wedges'),
			i(1, 'lb', 'broccoli florets', 'produce', 'or green beans'),
			i(3, 'tbsp', 'olive oil', 'oil'),
			i(1, 'tsp', 'paprika', 'spice'),
			i(1, 'tsp', 'dried oregano', 'spice'),
			i(1, 'tsp', 'dried thyme', 'spice'),
			i(1, 'tsp', 'salt', 'spice'),
			i(0.5, 'tsp', 'black pepper', 'spice'),
			i(1, '', 'lemon', 'produce', 'cut into wedges')
		],
		steps: [
			'Preheat the oven to 425°F.',
			'Toss the potatoes and onion wedges with half the oil and a pinch of salt. Spread on a large sheet pan and roast 15 minutes.',
			'Toss the chicken with the remaining oil and the spices. Toss the broccoli with a little oil and salt.',
			'Move the potatoes to one side, add the chicken and broccoli, and roast 20–25 minutes, until the chicken reaches 165°F.',
			'Squeeze the lemon over everything before serving.'
		],
		notes: []
	},
	{
		id: 'power-bowl',
		mins: { active: 30, total: 55 },
		title: 'Roasted Sweet Potato, Fennel & Lentil Power Bowl',
		section: 'Easy Weekly Meals',
		kind: 'Main',
		weekly: true,
		meal: ['everyday'],
		servings: 4,
		equip: ['Oven', 'Stovetop'],
		freezer: false,
		veg: true,
		by: 'Elyse',
		blurb: 'Sweet potato, fennel, and lentils with lemon tahini.',
		ing: [
			i(2, '', 'sweet potato', 'produce', 'medium, cubed'),
			i(1, '', 'fennel bulb', 'produce', 'large, sliced'),
			i(2, 'tbsp', 'olive oil', 'oil'),
			i(1, 'tsp', 'cumin', 'spice'),
			i(0.5, 'tsp', 'smoked paprika', 'spice'),
			SALT,
			PEPPER,
			i(1, 'cup', 'dry green or brown lentils', 'dry', 'or 2 cans, drained and rinsed'),
			i(4, 'cup', 'arugula or chopped kale', 'produce'),
			i(3, 'tbsp', 'tahini', 'oil'),
			i(3, 'tbsp', 'lemon juice', 'produce'),
			i(1, 'tbsp', 'red onion', 'produce', 'finely minced'),
			i(1, 'tbsp', 'fresh parsley', 'produce', 'chopped'),
			i(null, '', 'feta', 'dairy', 'optional'),
			i(null, '', 'toasted pumpkin seeds', 'dry', 'optional')
		],
		steps: [
			'Preheat the oven to 425°F.',
			'Toss the sweet potatoes and fennel with the oil, cumin, paprika, salt, and pepper. Roast on a sheet pan for 25–30 minutes, flipping halfway.',
			'Meanwhile, simmer the lentils in about 3 cups water for 20–25 minutes until tender; drain. Skip this step if using canned.',
			'Whisk the tahini dressing (tahini, lemon juice, 2–3 tbsp water, red onion, parsley, and a pinch of salt), thinning with water until pourable.',
			'Build each bowl with greens, lentils, and roasted vegetables. Drizzle with the dressing.'
		],
		notes: []
	},
	{
		id: 'vodka-sauce',
		mins: { active: 25, total: 40 },
		title: 'Vegan Vodka Pasta (Silken Tofu Sauce)',
		section: 'Easy Weekly Meals',
		kind: 'Main',
		weekly: true,
		meal: ['everyday'],
		servings: 8,
		equip: ['Stovetop'],
		freezer: false,
		veg: true,
		by: 'Elyse',
		blurb: 'Creamy roasted red pepper and tomato sauce, tossed through pasta.',
		ing: [
			i(1, 'lb', 'pasta', 'dry', 'penne, rigatoni or spaghetti'),
			i(1, 'tbsp', 'olive oil', 'oil'),
			i(1, '', 'onion', 'produce', 'small, diced'),
			i(24, 'oz', 'silken tofu', 'dairy'),
			i(2, 'cup', 'roasted red peppers', 'pantry'),
			i(1, 'can (14.5 oz)', 'fire-roasted tomatoes', 'pantry'),
			i(1, 'cup', 'raw unsalted cashews', 'dry', 'soaked'),
			i(4, 'tbsp', 'lemon juice', 'produce'),
			i(0.5, 'cup', 'water or broth', 'pantry', 'up to 1 cup'),
			i(1, 'tsp', 'dried oregano or basil', 'spice'),
			SALT,
			PEPPER,
			i(null, '', 'nutritional yeast', 'dry', 'optional'),
			i(null, '', 'smoked paprika', 'spice', 'optional')
		],
		steps: [
			'Cook the pasta in well-salted water until just al dente. Save a mug of the pasta water, then drain.',
			'Meanwhile, sauté the diced onion in 1 tbsp olive oil until soft and golden, about 8 minutes. Blend it with all remaining ingredients until smooth.',
			'Adjust the seasoning, then warm the sauce gently in the pot.',
			'Toss the pasta through the sauce, loosening it with a splash of the pasta water until it coats every piece. Serve right away.'
		],
		notes: [
			'About 2 oz of dry pasta per serving. Use a gluten-free pasta if you need it. The sauce alone keeps well, so if you are cooking ahead, store the sauce and pasta separately.',
			'About the cashews: "Raw" means plain, unroasted, unsalted cashews, not the roasted, salted snack kind. Soaking softens them so they blend into a smooth, creamy base instead of a gritty one. Cover them with water and soak 2–4 hours, or overnight in the fridge. For a quick soak, cover with just-boiled water for 15–20 minutes. Drain and rinse before blending.'
		]
	},
	{
		id: 'butter-beans',
		mins: { active: 30, total: 40 },
		title: 'One-Pot Cherry Tomato & Basil Butter Beans',
		section: 'Easy Weekly Meals',
		kind: 'Main',
		weekly: true,
		stew: true,
		meal: ['everyday'],
		servings: 4,
		equip: ['Stovetop'],
		freezer: false,
		veg: true,
		by: 'Elyse',
		blurb: 'Butter beans and cherry tomatoes in a creamy basil sauce.',
		ing: [
			i(1, 'tbsp', 'olive oil', 'oil'),
			i(1, '', 'onion', 'produce', 'small, diced'),
			i(500, 'g', 'cherry tomatoes', 'produce'),
			i(2, 'can (13.5 oz)', 'butter beans', 'pantry', 'drained and rinsed'),
			i(0.5, 'cup', 'grated parmesan', 'dairy'),
			i(150, 'g', 'soft tofu', 'dairy', '5 oz'),
			i(0.5, 'tsp', 'salt', 'spice'),
			i(1, 'tbsp', 'lemon juice', 'produce'),
			i(1, '', 'lemon', 'produce', 'zest only'),
			i(0.5, 'cup', 'water', 'other'),
			i(1, 'bunch', 'fresh basil', 'produce'),
			i(null, '', 'toasted bread', 'bakery', 'to serve')
		],
		steps: [
			'Heat the olive oil in a non-stick frying pan over medium-low heat. Add the onion and cook until soft and golden, about 8 minutes.',
			'Add the cherry tomatoes and stir often until blistered.',
			'Set aside ⅔ cup of the butter beans for the sauce.',
			'Gently press the blistered tomatoes with a wooden spoon until they pop.',
			'In a blender, combine about ⅓ of the tomatoes, the reserved ⅔ cup beans, parmesan, tofu, salt, lemon juice, and water. Blend until smooth and creamy.',
			'Add the remaining beans to the pan, then pour in the sauce and bring to a simmer.',
			'Roughly chop the basil and stir most of it in, saving about ¼ for the top.',
			'Remove from the heat, dish up, and top with the remaining basil and the lemon zest.'
		],
		notes: []
	},

	/* ---------- Protein ---------- */
	{
		id: 'wings',
		mins: { active: 15, total: 65 },
		title: 'Chicken Wings',
		section: 'Protein',
		kind: 'Protein',
		weekly: true,
		meal: ['everyday'],
		servings: 4,
		equip: ['Oven'],
		freezer: false,
		veg: false,
		by: 'Elyse',
		blurb: '',
		ing: [
			i(3, 'lb', 'chicken wings', 'meat'),
			i(2, 'tbsp', 'flour', 'spice'),
			i(2, 'tsp', 'baking powder', 'spice'),
			i(1, 'tsp', 'salt', 'spice'),
			i(1, 'tsp', 'black pepper', 'spice')
		],
		steps: [
			'Pat the wings dry.',
			'Toss with the dry ingredients and rest 30 minutes to 4 hours (in the fridge, on a wire rack, if resting longer). A gallon zip-top bag works well for this.',
			'Bake at 425°F for 20 minutes.',
			'Flip and bake 15 minutes more.',
			'Optional: toss in a sauce of your choice at the end, or serve it on the side as a dip.'
		],
		notes: []
	},
	{
		id: 'pork-loin',
		mins: { active: 15, total: 65 },
		title: 'Pork Loin',
		section: 'Protein',
		kind: 'Protein',
		weekly: true,
		meal: ['everyday'],
		servings: 5,
		equip: ['Oven'],
		freezer: false,
		veg: false,
		by: 'Elyse',
		blurb: '',
		ing: [
			i(2, 'lb', 'pork loin', 'meat'),
			i(1, 'tbsp', 'paprika', 'spice'),
			i(1, 'tsp', 'salt', 'spice'),
			i(0.5, 'tsp', 'black pepper', 'spice'),
			i(2, 'tbsp', 'Dijon mustard', 'oil')
		],
		steps: [
			'Preheat the oven to 425°F.',
			'Rub the pork with the paprika, salt, and pepper.',
			'Brush with the Dijon.',
			'Roast about 40 minutes, until the center reaches 145°F. Rest 10 minutes before slicing.'
		],
		notes: []
	},
	{
		id: 'whole-chicken',
		mins: { active: 20, total: 100 },
		title: 'Whole Chicken',
		section: 'Protein',
		kind: 'Protein',
		weekly: true,
		meal: ['everyday'],
		servings: 5,
		equip: ['Oven'],
		freezer: false,
		veg: false,
		by: 'Elyse',
		blurb: '',
		ing: [
			i(1, '', 'whole chicken', 'meat', '4–5 lb'),
			i(1, 'tbsp', 'olive oil', 'oil'),
			i(1, 'tbsp', 'paprika', 'spice'),
			i(1, 'tsp', 'salt', 'spice'),
			i(0.5, 'tsp', 'black pepper', 'spice'),
			i(1, 'tsp', 'dried thyme', 'spice'),
			i(1, 'tsp', 'onion powder', 'spice'),
			i(1, '', 'lemon', 'produce', 'optional, for the cavity'),
			i(1, '', 'onion', 'produce', 'small, quartered, optional, for the cavity')
		],
		steps: [
			'Preheat the oven to 425°F. Pat the chicken very dry.',
			'Rub with the olive oil, paprika, thyme, onion powder, salt, and pepper. Add the lemon and onion to the cavity if using.',
			'Roast breast-side up for 60–75 minutes, until the thickest part of the thigh reaches 165°F.',
			'Rest 15 minutes before carving. Save the carcass for broth.'
		],
		notes: []
	},

	{
		id: 'salmon',
		mins: { active: 10, total: 25 },
		title: 'Salmon',
		section: 'Protein',
		kind: 'Protein',
		weekly: true,
		meal: ['everyday'],
		servings: 2,
		equip: ['Oven'],
		freezer: false,
		veg: false,
		by: 'Elyse',
		blurb: '',
		ing: [
			i(2, '', 'salmon fillet', 'meat', '5–6 oz each'),
			i(0.5, 'tsp', 'paprika', 'spice'),
			SALT,
			PEPPER
		],
		steps: [
			'Preheat the oven to 400°F.',
			'Season the salmon with salt, pepper, and paprika.',
			'Roast for 12–15 minutes, until it flakes easily.'
		],
		notes: []
	},
	{
		id: 'chicken-thighs',
		mins: { active: 10, total: 40 },
		title: 'Chicken Thighs',
		section: 'Protein',
		kind: 'Protein',
		weekly: true,
		meal: ['everyday'],
		servings: 4,
		equip: ['Oven'],
		freezer: false,
		veg: false,
		by: 'Elyse',
		blurb: '',
		ing: [
			i(2, 'lb', 'boneless skinless chicken thighs', 'meat'),
			i(1.5, 'tbsp', 'olive oil', 'oil'),
			i(1, 'tsp', 'paprika', 'spice'),
			i(1, 'tsp', 'dried oregano', 'spice'),
			i(1, 'tsp', 'dried thyme', 'spice'),
			i(0.5, 'tsp', 'salt', 'spice'),
			i(0.5, 'tsp', 'black pepper', 'spice'),
			i(1, '', 'lemon', 'produce', 'cut into wedges')
		],
		steps: [
			'Preheat the oven to 425°F.',
			'Toss the chicken with the oil and the spices. Spread on a sheet pan.',
			'Roast 20–25 minutes, until the chicken reaches 165°F.',
			'Squeeze the lemon over the top before serving.'
		],
		notes: []
	},
	{
		id: 'meatballs',
		mins: { active: 5, total: 25 },
		title: 'Low-Fat Meatballs',
		section: 'Protein',
		kind: 'Protein',
		weekly: true,
		meal: ['everyday'],
		servings: 4,
		equip: ['Oven'],
		freezer: false,
		veg: false,
		by: 'Elyse',
		blurb: '',
		ing: [i(24, 'oz', 'low-fat meatballs', 'meat', 'pre-made, or ground turkey')],
		steps: ['Bake the meatballs per the package directions.'],
		notes: []
	},
	{
		id: 'lentils',
		mins: { active: 5, total: 30 },
		title: 'Lentils',
		section: 'Protein',
		kind: 'Protein',
		weekly: true,
		meal: ['everyday'],
		servings: 4,
		equip: ['Stovetop'],
		freezer: false,
		veg: true,
		by: 'Elyse',
		blurb: '',
		ing: [
			i(1, 'cup', 'green or brown lentils', 'dry', 'dry, or 2 cans, drained and rinsed'),
			i(3, 'cup', 'water', 'other')
		],
		steps: [
			'Simmer the lentils in about 3 cups water for 20–25 minutes until tender; drain. Skip this step if using canned.'
		],
		notes: []
	},

	/* ---------- Veggies ---------- */
	{
		id: 'broccoli',
		mins: { active: 5, total: 35 },
		title: 'Frozen Broccoli',
		section: 'Veggies',
		kind: 'Side',
		weekly: true,
		meal: ['everyday'],
		servings: 4,
		equip: ['Oven'],
		freezer: false,
		veg: true,
		by: 'Elyse',
		blurb: '',
		ing: [
			i(1, 'lb', 'frozen broccoli florets', 'frozen'),
			i(1, 'tbsp', 'olive oil', 'oil'),
			SALT,
			PEPPER,
			i(null, '', 'grated parmesan', 'dairy', 'optional')
		],
		steps: [
			'Preheat the oven to 400°F.',
			'Toss the frozen broccoli with the oil, salt, and pepper on a sheet pan.',
			'Roast for 30 minutes. Top with parmesan if using.'
		],
		notes: []
	},
	{
		id: 'mashed-potatoes',
		mins: { active: 15, total: 40 },
		title: 'Instant Pot Mashed Potatoes',
		section: 'Carbs',
		kind: 'Carb',
		weekly: true,
		meal: ['everyday'],
		servings: 4,
		equip: ['Instant Pot'],
		freezer: false,
		veg: true,
		by: 'Elyse',
		blurb: '',
		ing: [
			i(2, 'lb', 'Yukon potatoes', 'produce', 'cubed'),
			i(1, 'cup', 'milk or broth', 'dairy', 'half and half is best'),
			i(0.25, 'cup', 'grated parmesan', 'dairy'),
			i(0.5, 'tsp', 'salt', 'spice', 'plus more to taste'),
			PEPPER,
			i(null, '', 'cilantro', 'produce', 'chopped')
		],
		steps: [
			'Add the potatoes and liquid to the Instant Pot. Pressure cook on High for 10 minutes. If you use milk or half and half and get a burn warning, cook in broth or water and stir the dairy in after.',
			'Mash with the parmesan, salt, pepper, and cilantro.'
		],
		notes: []
	},
	{
		id: 'arugula-salad',
		mins: { active: 10, total: 10 },
		title: 'Simple Arugula Salad',
		section: 'Veggies',
		kind: 'Side',
		weekly: true,
		meal: ['everyday'],
		servings: 2,
		equip: [],
		freezer: false,
		veg: true,
		by: 'Elyse',
		blurb: '',
		ing: [
			i(5, 'oz', 'arugula', 'produce'),
			i(1, 'tbsp', 'olive oil', 'oil'),
			i(1, 'tbsp', 'lemon juice', 'produce'),
			SALT,
			PEPPER,
			i(null, '', 'shaved parmesan', 'dairy', 'to top')
		],
		steps: [
			'Toss the arugula with the olive oil, lemon juice, salt, and pepper.',
			'Top with the shaved parmesan.'
		],
		notes: ['Use fresh lemons for the juice if you have them.']
	},

	{
		id: 'asparagus',
		mins: { active: 5, total: 20 },
		title: 'Roasted Asparagus',
		section: 'Veggies',
		kind: 'Side',
		weekly: true,
		meal: ['everyday'],
		servings: 2,
		equip: ['Oven'],
		freezer: false,
		veg: true,
		by: 'Elyse',
		blurb: '',
		ing: [
			i(1, 'lb', 'asparagus', 'produce', 'trimmed'),
			i(1, 'tbsp', 'olive oil', 'oil'),
			SALT,
			PEPPER
		],
		steps: [
			'Preheat the oven to 400°F.',
			'Toss the asparagus with the olive oil, salt, and pepper.',
			'Roast for 15 minutes.'
		],
		notes: []
	},
	{
		id: 'roasted-fennel',
		mins: { active: 10, total: 40 },
		title: 'Roasted Fennel',
		section: 'Veggies',
		kind: 'Side',
		weekly: true,
		meal: ['everyday'],
		servings: 2,
		equip: ['Oven'],
		freezer: false,
		veg: true,
		by: 'Elyse',
		blurb: '',
		ing: [
			i(1, '', 'fennel bulb', 'produce', 'large, sliced'),
			i(1, 'tbsp', 'olive oil', 'oil'),
			i(0.5, 'tsp', 'cumin', 'spice'),
			i(0.25, 'tsp', 'smoked paprika', 'spice'),
			SALT,
			PEPPER
		],
		steps: [
			'Preheat the oven to 425°F.',
			'Toss the fennel with the oil, cumin, paprika, salt, and pepper.',
			'Roast on a sheet pan for 25–30 minutes, flipping halfway.'
		],
		notes: []
	},
	{
		id: 'cucumber-salad',
		mins: { active: 10, total: 10 },
		title: 'Lemony Cucumber Tomato Salad',
		section: 'Veggies',
		kind: 'Side',
		weekly: true,
		meal: ['everyday'],
		servings: 4,
		equip: [],
		freezer: false,
		veg: true,
		by: 'Elyse',
		blurb: '',
		ing: [
			i(6, '', 'mini cucumber', 'produce', 'diced'),
			i(1, 'pint', 'cherry tomatoes', 'produce', 'halved'),
			i(0.25, 'cup', 'fresh parsley', 'produce', 'chopped'),
			i(0.75, 'cup', 'plain Greek yogurt', 'dairy'),
			i(2, 'tbsp', 'lemon juice', 'produce'),
			i(0.25, 'tsp', 'salt', 'spice')
		],
		steps: [
			'Mix the yogurt, lemon juice, parsley, and salt.',
			'Toss the cucumber and tomatoes with the yogurt mixture.'
		],
		notes: []
	},
	{
		id: 'roasted-carrots',
		mins: { active: 5, total: 30 },
		title: 'Roasted Carrots',
		section: 'Veggies',
		kind: 'Side',
		weekly: true,
		meal: ['everyday'],
		servings: 4,
		equip: ['Oven'],
		freezer: false,
		veg: true,
		by: 'Elyse',
		blurb: '',
		ing: [
			i(1, 'lb', 'carrots', 'produce', 'crinkle-cut works well'),
			i(1, 'tbsp', 'olive oil', 'oil'),
			SALT
		],
		steps: [
			'Preheat the oven to 400°F.',
			'Toss the carrots with the olive oil and salt.',
			'Roast for 25 minutes.'
		],
		notes: []
	},

	/* ---------- Carbs (each recipe is 1 cup dry) ---------- */
	{
		id: 'white-rice',
		mins: { active: 3, total: 25 },
		title: 'White Rice',
		section: 'Carbs',
		kind: 'Carb',
		weekly: true,
		meal: ['everyday'],
		servings: 3,
		equip: ['Instant Pot'],
		freezer: false,
		veg: true,
		by: 'Elyse',
		blurb: '',
		ing: [i(1, 'cup', 'white rice', 'dry'), i(1, 'cup', 'water', 'other')],
		steps: [
			'Add the rice and water to the Instant Pot.',
			'Pressure cook on High for 3 minutes.',
			'Natural release 10 minutes.'
		],
		notes: []
	},
	{
		id: 'brown-rice',
		mins: { active: 3, total: 40 },
		title: 'Brown Rice',
		section: 'Carbs',
		kind: 'Carb',
		weekly: true,
		meal: ['everyday'],
		servings: 3,
		equip: ['Instant Pot'],
		freezer: false,
		veg: true,
		by: 'Elyse',
		blurb: '',
		ing: [i(1, 'cup', 'brown rice', 'dry'), i(1.25, 'cup', 'water', 'other')],
		steps: [
			'Add the rice and water to the Instant Pot.',
			'Pressure cook on High for 22 minutes.',
			'Natural release 10 minutes.'
		],
		notes: []
	},
	{
		id: 'sushi-rice',
		mins: { active: 8, total: 35 },
		title: 'Sushi Rice',
		section: 'Carbs',
		kind: 'Carb',
		weekly: true,
		meal: ['everyday'],
		servings: 3,
		equip: ['Instant Pot'],
		freezer: false,
		veg: true,
		by: 'Elyse',
		blurb: '',
		ing: [
			i(1, 'cup', 'sushi rice', 'dry'),
			i(1.25, 'cup', 'water', 'other'),
			i(1, 'tbsp', 'rice vinegar', 'oil'),
			i(2, 'tsp', 'sugar', 'spice')
		],
		steps: [
			'Rinse the rice thoroughly.',
			'Cook with the water in the Instant Pot on High for 5 minutes, natural release 10 minutes.',
			'Season with the rice vinegar and sugar.'
		],
		notes: []
	},
	{
		id: 'quinoa',
		mins: { active: 5, total: 25 },
		title: 'Quinoa',
		section: 'Carbs',
		kind: 'Carb',
		weekly: true,
		meal: ['everyday'],
		servings: 3,
		equip: ['Stovetop'],
		freezer: false,
		veg: true,
		by: 'Elyse',
		blurb: '',
		ing: [i(1, 'cup', 'quinoa', 'dry'), i(2, 'cup', 'water', 'other')],
		steps: [
			'Rinse the quinoa.',
			'Cook with the water, covered, for 15 minutes.',
			'Rest 5 minutes, then fluff.'
		],
		notes: []
	},
	{
		id: 'pearled-couscous',
		mins: { active: 3, total: 12 },
		title: 'Pearled Couscous',
		section: 'Carbs',
		kind: 'Carb',
		weekly: true,
		meal: ['everyday'],
		servings: 3,
		equip: ['Stovetop'],
		freezer: false,
		veg: true,
		by: 'Elyse',
		blurb: '',
		ing: [i(1, 'cup', 'pearled couscous', 'dry'), i(1.25, 'cup', 'water', 'other')],
		steps: ['Simmer the couscous in the water for 10 minutes.'],
		notes: []
	},

	{
		id: 'sweet-potatoes',
		mins: { active: 8, total: 40 },
		title: 'Roasted Sweet Potatoes',
		section: 'Carbs',
		kind: 'Carb',
		weekly: true,
		meal: ['everyday'],
		servings: 4,
		equip: ['Oven'],
		freezer: false,
		veg: true,
		by: 'Elyse',
		blurb: '',
		ing: [
			i(2, '', 'sweet potato', 'produce', 'medium, cubed'),
			i(1, 'tbsp', 'olive oil', 'oil'),
			i(1, 'tsp', 'cumin', 'spice'),
			i(0.25, 'tsp', 'smoked paprika', 'spice'),
			SALT,
			PEPPER
		],
		steps: [
			'Preheat the oven to 425°F.',
			'Toss the sweet potatoes with the oil, cumin, paprika, salt, and pepper.',
			'Roast on a sheet pan for 25–30 minutes, flipping halfway.'
		],
		notes: []
	},
	{
		id: 'roasted-potatoes',
		mins: { active: 10, total: 50 },
		title: 'Roasted Potatoes & Red Onion',
		section: 'Carbs',
		kind: 'Carb',
		weekly: true,
		meal: ['everyday'],
		servings: 4,
		equip: ['Oven'],
		freezer: false,
		veg: true,
		by: 'Elyse',
		blurb: '',
		ing: [
			i(1.5, 'lb', 'baby potatoes', 'produce', 'halved'),
			i(1, '', 'red onion', 'produce', 'large, cut into wedges'),
			i(1.5, 'tbsp', 'olive oil', 'oil'),
			i(0.5, 'tsp', 'salt', 'spice')
		],
		steps: [
			'Preheat the oven to 425°F.',
			'Toss the potatoes and onion wedges with the oil and salt. Spread on a large sheet pan.',
			'Roast 35–40 minutes, stirring once, until golden.'
		],
		notes: []
	},

	/* ---------- Breakfast ---------- */
	{
		id: 'fritters',
		mins: { active: 25, total: 30 },
		title: 'Zucchini Carrot Fritters',
		section: 'Breakfast',
		kind: 'Breakfast',
		meal: ['breakfast'],
		servings: 4,
		equip: ['Stovetop'],
		freezer: true,
		veg: true,
		by: 'Elyse',
		blurb: 'Zucchini and carrot, pan-fried.',
		ing: [
			i(2, '', 'zucchini', 'produce', 'medium, about 1 lb, shredded'),
			i(2, '', 'carrot', 'produce', 'shredded'),
			i(0.5, 'cup', 'flour', 'spice'),
			i(0.25, 'cup', 'grated parmesan', 'dairy'),
			i(1, 'tsp', 'baking powder', 'spice'),
			i(0.5, 'tsp', 'salt', 'spice'),
			i(0.5, 'tsp', 'black pepper', 'spice'),
			i(2, '', 'egg', 'dairy'),
			i(null, '', 'olive oil', 'oil', 'for the pan')
		],
		steps: [
			'Shred the vegetables and squeeze them dry in a clean towel.',
			'Mix the flour, parmesan, baking powder, salt, and pepper.',
			'Stir in the vegetables, then the eggs.',
			'Pan-fry small pancakes in olive oil over medium heat until golden, 3–4 minutes per side.'
		],
		notes: ['Freeze cooled fritters in a single layer, then bag them.']
	},
	{
		id: 'pumpkin-pudding',
		mins: { active: 15, total: 25 },
		title: 'Pumpkin Chia-Oat Pudding',
		section: 'Breakfast',
		kind: 'Breakfast',
		meal: ['breakfast'],
		servings: 4,
		equip: [],
		freezer: false,
		veg: true,
		by: 'Elyse',
		blurb: 'Pumpkin, chia, and oats.',
		ing: [
			i(1, 'cup', 'canned pumpkin puree', 'pantry', 'not pie filling'),
			i(1, 'cup', 'rolled oats', 'dry'),
			i(0.25, 'cup', 'chia seeds', 'dry'),
			i(2, 'cup', 'milk', 'dairy', 'dairy or unsweetened plant-based'),
			i(3, 'tbsp', 'maple syrup', 'oil'),
			i(1, 'tsp', 'cinnamon', 'spice'),
			i(0.5, 'tsp', 'ground ginger', 'spice'),
			i(0.25, 'tsp', 'nutmeg', 'spice'),
			i(0.25, 'tsp', 'allspice or ground cloves', 'spice'),
			i(1, 'tsp', 'vanilla extract', 'spice'),
			i(0.25, 'tsp', 'salt', 'spice'),
			i(1, 'cup', 'plain Greek yogurt', 'dairy', 'optional'),
			i(0.25, 'cup', 'chopped pecans or walnuts', 'dry', 'for topping')
		],
		steps: [
			'In a large bowl, whisk the pumpkin, milk, maple syrup, spices, vanilla, and salt until smooth.',
			'Stir in the oats and chia seeds. Fold in the Greek yogurt if using.',
			'Let sit 10 minutes, then stir again to break up chia clumps.',
			'Divide evenly among 4 jars or containers with lids.',
			'Refrigerate at least 4 hours, ideally overnight.',
			'Top with nuts right before eating. Serve cold, or microwave 60–90 seconds for a warm, porridge-style version.'
		],
		notes: [
			'Add toppings day-of.',
			'If it gets too thick, stir in a splash of milk.',
			'Chia only: skip the oats and use ½ cup chia total.',
			'Oats only: skip the chia, use 1½ cups oats and an extra ¼ cup milk.'
		]
	},
	{
		id: 'chia-variations',
		mins: { active: 10, total: 20 },
		title: 'Chia-Oat Pudding Variations',
		section: 'Breakfast',
		kind: 'Breakfast',
		meal: ['breakfast'],
		servings: 4,
		equip: [],
		freezer: false,
		veg: true,
		by: 'Elyse',
		blurb: 'Chia-oat pudding in five fruit flavors.',
		ing: [
			i(1, 'cup', 'rolled oats', 'dry'),
			i(0.25, 'cup', 'chia seeds', 'dry'),
			i(2, 'cup', 'milk', 'dairy', 'dairy or unsweetened plant-based'),
			i(1, 'cup', 'fruit puree', 'produce', 'see the flavors below'),
			i(1, 'tsp', 'vanilla extract', 'spice'),
			i(0.25, 'tsp', 'salt', 'spice')
		],
		steps: [
			'Whisk the puree, milk, vanilla, salt, and any flavor add-ins until smooth.',
			'Stir in the oats and chia. Let sit 10 minutes, then stir again.',
			'Divide among 4 jars. Refrigerate at least 4 hours or overnight.',
			'Add toppings right before eating. Keeps 4–5 days.'
		],
		flavors: [
			{
				name: 'Strawberry cheesecake',
				add: '1 cup strawberry puree, ½ cup plain Greek yogurt, 1 tbsp lemon juice',
				sweet: '1–2 tbsp maple syrup',
				top: 'Crushed graham cracker'
			},
			{
				name: 'Blueberry lemon',
				add: '1 cup blueberry puree, zest of 1 lemon, 1 tbsp lemon juice',
				sweet: '1–2 tbsp honey',
				top: ''
			},
			{
				name: 'Banana peanut butter',
				add: '1 cup mashed ripe banana (about 2 large), 2 tbsp peanut butter, ½ tsp cinnamon',
				sweet: '',
				top: 'Dark chocolate chips'
			},
			{
				name: 'Raspberry chocolate',
				add: '1 cup raspberry puree (strained if you dislike seeds), 1 tbsp cocoa powder',
				sweet: '2 tbsp maple syrup',
				top: ''
			},
			{
				name: 'Peach cobbler',
				add: '1 cup peach puree, ½ tsp cinnamon, ½ tsp ground ginger',
				sweet: '1–2 tbsp maple syrup',
				top: 'Granola'
			}
		],
		notes: [
			'Fruit is already sweet, so start with less sweetener and taste before chilling.',
			'If the mixture looks loose (especially strawberry and peach), use 1¾ cups milk instead of 2.'
		]
	},

	/* ---------- Sweet Treats ---------- */
	{
		id: 'choc-chip-cookies',
		mins: { active: 30, total: 60 },
		title: 'Chocolate Chip Cookies (À la Analise)',
		section: 'Sweet Treats',
		kind: 'Treat',
		meal: ['dessert'],
		servings: 12,
		equip: ['Oven'],
		freezer: true,
		veg: true,
		by: 'Analise',
		source: {
			name: 'Jenna Barnard, Butternut Bakery',
			url: 'https://butternutbakeryblog.com/best-chocolate-chip-cookies/'
		},
		blurb: 'Classic chocolate chip.',
		ing: [
			i(1.33333, 'cup', 'all-purpose flour', 'spice', '170 g, spooned into the cup and leveled'),
			i(0.5, 'tsp', 'baking soda', 'spice'),
			i(0.5, 'tsp', 'baking powder', 'spice'),
			i(0.75, 'tsp', 'kosher salt', 'spice'),
			i(0.5, 'cup', 'unsalted butter', 'dairy', '112 g, melted and cooled'),
			i(0.5, 'cup', 'light brown sugar', 'spice', '100 g, packed'),
			i(0.33333, 'cup', 'granulated sugar', 'spice', '70 g'),
			i(2, 'tsp', 'vanilla extract', 'spice'),
			i(1, '', 'egg', 'dairy', 'large'),
			i(1.5, 'cup', 'semisweet chocolate chips', 'spice', '250 g, plus extra for topping'),
			i(null, '', 'flaky sea salt', 'spice', 'for sprinkling')
		],
		steps: [
			'Heat the oven to 350°F and line a large baking sheet with parchment.',
			'Whisk the flour, baking soda, baking powder, and kosher salt in a medium bowl.',
			'In a large bowl, whisk the melted butter with both sugars for 1–2 minutes, until thick and paste-like. The butter should be cool or only slightly warm.',
			'Whisk in the egg and vanilla until smooth.',
			"Add the dry mix and fold with a spatula until only a few flour streaks remain. Add the chocolate chips and fold just until combined. Don't overmix.",
			'Scoop with a 2 oz scoop (or a ¼ cup measure). Put 5 large cookies on the sheet and bake 12–15 minutes (12 for gooier). For regular-size cookies, put 6 on the sheet and bake 10–12 minutes.',
			"They're done when the edges are golden and the centers look pale and puffed. If they spread too much, nudge the edges in with a fork right out of the oven.",
			'While still hot, press a few extra chips on top and sprinkle with flaky sea salt.',
			"Cool on a rack about 20 minutes. They're best slightly warm."
		],
		notes: [
			"Measure the flour carefully; too much makes dry cookies that don't spread.",
			'Store airtight at room temperature up to 6 days.',
			'To freeze, scoop the dough, chill the balls about 1 hour, then freeze. Bake from frozen at 340°F, adding 2–3 minutes.'
		]
	},
	{
		id: 'carne-mechada',
		mins: { active: 30, total: 130 },
		title: 'Carne Mechada (Shredded Beef)',
		section: 'Easy Weekly Meals',
		kind: 'Main',
		weekly: true,
		meal: ['everyday'],
		servings: 8,
		equip: ['Stovetop', 'Mortar and Pestle (optional)'],
		freezer: false,
		by: 'Santiago Timotei Rodriguez',
		blurb:
			'Tender shredded beef stewed in a spiced tomato sofrito, made with the beef left over from broth.',
		ing: [
			i(1000, 'g', 'flank or skirt steak', 'meat', 'already used to make broth'),
			i(1, '', 'onion', 'produce', 'medium, finely chopped'),
			i(1, '', 'carrot', 'produce', 'medium, finely chopped'),
			i(1, '', 'celery stalk', 'produce', 'finely chopped'),
			i(1, '', 'bell pepper', 'produce', 'seeded, cut into long strips'),
			i(3, 'clove', 'garlic', 'produce', 'finely diced'),
			i(2.5, 'cup', 'beef broth', 'pantry', '2-3 cups'),
			i(400, 'g', 'tomato puree', 'pantry', 'Pomi or Mutti'),
			i(2.5, 'tbsp', 'olive oil', 'oil', '2-3 tbsp'),
			i(1, 'tbsp', 'white wine vinegar', 'oil'),
			i(1, 'tsp', 'oregano', 'spice'),
			i(0.5, 'tsp', 'thyme', 'spice'),
			i(1, 'tbsp', 'cumin', 'spice'),
			i(0.25, 'tsp', 'cinnamon', 'spice'),
			i(0.5, 'tsp', 'black pepper', 'spice'),
			i(0.25, 'tsp', 'allspice', 'spice', 'also called pimienta de Jamaica'),
			i(3, '', 'bay leaves', 'spice'),
			i(0.5, 'tsp', 'paprika', 'spice', 'or 1 guajillo chile, seeds removed'),
			i(null, '', 'salt', 'spice', 'to taste')
		],
		steps: [
			"Tear the used beef into long shreds. They don't need to be too thin, as they'll come apart while cooking. Set aside.",
			'Finely chop the onion, celery and carrot. Remove the top and seeds from the bell pepper and cut into long strips.',
			'Add the olive oil to a large pot and fry the vegetables on medium-low to medium heat until the onions are semi-translucent, stirring to prevent browning.',
			'Add the finely diced garlic and fry for 1 minute.',
			'Add the shredded beef, broth, tomato puree and vinegar. Stir and bring to a simmer, then reduce the heat to low and partially cover. Cook for 1 hour, stirring occasionally and adding water if it cooks too quickly.',
			'If you have a mortar and pestle and whole spices, grind the allspice, black peppercorns, cumin and cinnamon into a powder. Add the spice blend, bay leaves, salt, and paprika (or guajillo chile with seeds removed) to the stew and mix well. Add dried oregano and thyme now; if using fresh, add them in the final 15 minutes. Partially cover and cook for 30 minutes.',
			'If you added the whole guajillo, remove it before it disintegrates. Keep cooking until the stew is juicy and tender, but not too wet. When you mix the beef, the liquid should be picked up by the meat and take a few seconds to settle back to the bottom of the pot.'
		],
		notes: [
			'From Santiago: "Shredded beef was one of the first things my mom taught me how to make before leaving for college, as a way to re-use the beef used to make broth. I\'ve since played with the recipe she first gave me and made it my own."'
		]
	},
	{
		id: 'sweet-potato-black-bean-chili',
		mins: { active: 20, total: 45 },
		title: 'Sweet Potato Black Bean Chili',
		section: 'Easy Weekly Meals',
		kind: 'Main',
		weekly: true,
		meal: ['everyday'],
		servings: 4,
		equip: ['Stovetop'],
		freezer: true,
		veg: true,
		by: 'Sarah Clayton',
		blurb: 'A thick, smoky one-pot chili with sweet potato and black beans.',
		ing: [
			i(2, 'tbsp', 'olive oil', 'oil'),
			i(1, 'tsp', 'salt', 'spice'),
			i(2, 'tbsp', 'chili powder', 'spice'),
			i(2, 'tsp', 'cumin', 'spice'),
			i(2, 'tsp', 'smoked paprika', 'spice'),
			i(1, '', 'sweet onion', 'produce', 'medium, diced'),
			i(2, 'clove', 'garlic', 'produce', 'minced'),
			i(1, '', 'sweet potato', 'produce', 'large, peeled, in ½-inch cubes'),
			i(2, 'cup', 'water', 'pantry'),
			i(1, 'can (28 oz)', 'diced tomatoes', 'pantry', 'do not drain'),
			i(2, 'can (15 oz)', 'black beans', 'pantry', 'drained and rinsed')
		],
		steps: [
			'Prep the vegetables and set aside: peel and chop the sweet potato into ½-inch cubes, dice the onion, mince the garlic, drain and rinse the black beans, and open the can of tomatoes (do not drain).',
			'In a large pot over medium heat, add the oil and onion. Sauté for 3–4 minutes until translucent. Add the garlic and sweet potato and cook for about 2 more minutes.',
			'Add the spices and mix well.',
			'Add the black beans, the tomatoes with their juices, and the 2 cups of water.',
			'Simmer uncovered for 20–25 minutes.',
			'Check that the sweet potatoes are fully cooked. If they are ready, smash them with a potato masher.',
			'Serve with avocado, hot sauce, cheese or sour cream.'
		],
		notes: [
			'Fire-roasted tomatoes are a great swap for a bolder chili.',
			'Freezes really well in single-serving deli containers. To reheat, put it in a pot with a little water at the bottom, cover, and heat on medium, adding more water if it starts to stick as it thaws.'
		]
	},
	{
		id: 'buffalo-chicken-mac-slow-cooker',
		mins: { active: 30, total: 180 },
		title: 'Buffalo Chicken Mac N Cheese (Slow Cooker)',
		section: 'Easy Weekly Meals',
		kind: 'Main',
		weekly: true,
		meal: ['everyday'],
		servings: 10,
		equip: ['Slow cooker', 'Stovetop'],
		freezer: true,
		by: 'Katie',
		blurb: 'Creamy lightened-up buffalo chicken mac with a cottage cheese sauce.',
		ing: [
			i(28, 'oz', 'boneless, skinless chicken thighs', 'meat'),
			i(0.8, 'cup', 'buffalo sauce', 'oil', '⅓ cup for the chicken, the rest for the sauce'),
			i(2, 'tbsp', 'worcestershire sauce', 'oil'),
			i(2, 'tsp', 'garlic powder', 'spice'),
			i(2, 'tsp', 'onion powder', 'spice'),
			i(1, 'tsp', 'chicken bouillon', 'pantry'),
			i(0.75, 'cup', 'water', 'pantry'),
			i(2.5, 'cup', '2% cottage cheese', 'dairy'),
			i(0.667, 'cup', 'low-fat cream cheese', 'dairy'),
			i(0.333, 'cup', 'parmigiano reggiano', 'dairy', 'grated'),
			i(0.5, 'cup', 'cheddar powder', 'spice'),
			i(3, 'tbsp', 'honey', 'pantry'),
			i(1.25, 'cup', '1% milk', 'dairy', 'plus up to ½ cup more if needed'),
			i(24, 'oz', 'pasta', 'dry'),
			SALT,
			PEPPER
		],
		steps: [
			'Make the buffalo chicken: add the chicken thighs to a slow cooker with ⅓ cup of the buffalo sauce, the Worcestershire, garlic powder, onion powder, bouillon and water. Stir to coat. Cover and cook on high for 2–3 hours or low for 3–4 hours, until the chicken is tender and easily shredded.',
			'Bring a large pot of salted water to a boil. Add the pasta and cook for half the time listed on the package. Drain and set aside.',
			'Blend the cottage cheese until smooth and grate the Parmigiano Reggiano.',
			'Once the chicken is done, shred it lightly in the slow cooker. Add the partially cooked pasta, cottage cheese, Parmigiano Reggiano, cream cheese, cheddar powder, the remaining buffalo sauce (about ½ cup), honey, milk, salt and pepper. Stir until everything is well combined into a creamy sauce that coats the chicken and pasta.',
			'Cover and cook on high for an additional 15–20 minutes until the pasta is tender and the sauce thickens. If needed, add up to another ½ cup of milk to adjust the consistency.'
		],
		notes: ['No slow cooker? You can use a big pot.']
	},
	{
		id: 'buffalo-chicken-mac-full-yum',
		mins: { active: 15, total: 45 },
		title: 'Buffalo Chicken Mac (Full Yum Version)',
		section: 'Easy Weekly Meals',
		kind: 'Main',
		weekly: true,
		meal: ['everyday'],
		servings: 4,
		equip: ['Dutch oven', 'Stovetop'],
		freezer: false,
		by: 'Katie',
		blurb:
			'The indulgent version: a classic cheddar and jack sauce, rotisserie chicken and buffalo sauce.',
		ing: [
			i(16, 'oz', 'pasta', 'dry'),
			i(1, '', 'rotisserie chicken', 'meat', 'meat shredded'),
			i(6, 'tbsp', 'butter', 'dairy'),
			i(6, 'tbsp', 'flour', 'spice'),
			i(3, 'cup', 'milk', 'dairy'),
			i(2, 'cup', 'shredded cheddar cheese', 'dairy'),
			i(2, 'cup', 'shredded monterey jack cheese', 'dairy'),
			i(0.5, 'cup', 'buffalo sauce', 'oil', 'start with ½ cup, add to taste'),
			i(0.5, 'cup', 'blue cheese', 'dairy', 'optional'),
			PEPPER
		],
		steps: [
			'Bring a large pot of lightly salted water to a boil. Cook the pasta, then drain.',
			'Shred the meat from the rotisserie chicken and set aside.',
			'Melt the butter in a Dutch oven over medium heat. Gradually whisk in the flour and cook until golden brown. Pour in the milk slowly, whisking constantly, until thickened and bubbling. The sauce should be thick enough to coat the back of a spoon. Reduce the heat and season with pepper.',
			'Add the cheddar and monterey jack to the sauce and stir until fully melted.',
			'Stir in the buffalo sauce to your desired heat, starting with ½ cup.',
			'Add the blue cheese (if using), chicken and pasta to the sauce and stir to combine.'
		],
		notes: [
			'Sometimes Katie adds a breadcrumb or frosted flake topping for extra yum: toast breadcrumbs or cereal on the stovetop for a few minutes until golden brown, sprinkle over the mac, and broil in the oven for a few minutes.'
		]
	},
	{
		id: 'cheesecake-blueberry-sauce',
		mins: { active: 30, total: 200 },
		title: 'Cheesecake with Homemade Blueberry Sauce',
		section: 'Sweet Treats',
		kind: 'Treat',
		meal: ['dessert'],
		servings: 10,
		equip: ['Oven', 'Stand mixer', 'Double boiler'],
		freezer: false,
		veg: true,
		by: 'Katie',
		blurb: 'A baked cheesecake with a sour cream layer and a cooked blueberry topping.',
		ing: [
			i(2.5, 'cup', 'graham cracker crumbs', 'dry', 'for the crust'),
			i(0.5, 'cup', 'sugar', 'spice', 'for the crust'),
			i(0.75, 'cup', 'butter', 'dairy', 'for the crust'),
			i(4, '', 'egg whites', 'dairy'),
			i(1, 'cup', 'sugar', 'spice', 'for the filling'),
			i(24, 'oz', 'cream cheese', 'dairy', 'room temperature'),
			i(1, 'tsp', 'vanilla extract', 'spice', 'for the filling'),
			i(16, 'oz', 'sour cream', 'dairy'),
			i(2, 'tbsp', 'sugar', 'spice', 'for the sour cream layer'),
			i(0.5, 'tsp', 'vanilla extract', 'spice', 'for the sour cream layer'),
			i(2, 'can', 'Maine wild blueberries', 'pantry', 'one with its juice, one drained'),
			i(1.75, 'cup', 'sugar', 'spice', 'for the topping'),
			i(0.667, 'cup', 'flour', 'spice'),
			i(0.125, 'tsp', 'salt', 'spice'),
			i(1.5, 'tbsp', 'fresh lime juice', 'produce'),
			i(0.5, 'tbsp', 'cornstarch', 'spice'),
			i(2, 'tbsp', 'sweet butter', 'dairy')
		],
		steps: [
			'Make the crust. Mix the graham cracker crumbs, ½ cup sugar and ¾ cup butter together well. Press into an 8x10x2 baking dish to make a thick crust. Chill in the fridge for 45 minutes.',
			'Set out the cream cheese to come to room temperature and turn the oven on to 325°F.',
			'Break the cream cheese into pieces. In a stand mixer, beat the egg whites until stiff. Mix in 1 cup sugar, the cream cheese and 1 tsp vanilla until smooth, then pour into the crust.',
			'Bake for 25 minutes at 325°F.',
			'Remove from the oven and let cool for 10 minutes. Increase the oven temperature to 475°F.',
			'Mix the sour cream, 2 tbsp sugar and ½ tsp vanilla until smooth. Spoon over the first layer and bake the whole thing for 5 minutes at 435°F.',
			'Make the blueberry topping. Combine the blueberries, 1¾ cups sugar, ⅔ cup flour, ⅛ tsp salt, lime juice, cornstarch and sweet butter. Cook in the top of a double boiler until the sauce begins to thicken. Remove from the heat and cool thoroughly.',
			'Pour the topping over the slightly chilled cheesecake. Chill overnight before cutting.'
		],
		notes: [
			'Katie: "My grandma\'s recipe!"',
			'Katie has also made the topping with fresh strawberries, and it turned out very well.'
		]
	},
	{
		id: 'rosquillas',
		mins: { active: 90, total: 100 },
		title: 'Rosquillas',
		section: 'Sweet Treats',
		kind: 'Treat',
		meal: ['dessert'],
		servings: 50,
		equip: ['Skillet', 'Stovetop'],
		freezer: false,
		veg: true,
		by: 'Santi',
		blurb: 'Anise-scented fried dough rings, from a family recipe.',
		ing: [
			i(3, '', 'eggs', 'dairy'),
			i(750, 'g', 'self-rising flour', 'spice'),
			i(99, 'g', 'olive oil', 'oil', 'any neutral oil works'),
			i(90, 'g', 'anisette', 'other'),
			i(300, 'g', 'white granulated sugar', 'spice'),
			i(3, 'tbsp', 'whole aniseeds', 'spice'),
			i(null, '', 'neutral oil', 'oil', 'for deep frying')
		],
		steps: [
			'Preheat the frying oil in your skillet until it reaches 350°F.',
			'In a large bowl, whisk the eggs, sugar, anisette, aniseeds and olive oil until the sugar is completely dissolved.',
			'Slowly whisk in the flour. Once the mixture starts to thicken, switch to a spatula and keep mixing. Cover and rest for 10 minutes.',
			'Oil a large, clean work surface and your hands. Take a ping-pong-ball-sized piece of dough and roll it into a strand that can wrap around 2 fingers. Press down on the ends of the loop with your fingers or the work surface to seal, and drop it into the oil.',
			"Fry each rosquilla for roughly 2–3 minutes per side, until evenly browned. Keep an eye on the oil temperature so it doesn't get too high or too low. Drain the finished rosquillas in a bowl lined with paper towels."
		],
		notes: ['From Santi: "This recipe was given to me by my grandmother, Concepción Fortún."']
	},
	{
		id: 'flan',
		mins: { active: 30, total: 75 },
		title: 'Flan',
		section: 'Sweet Treats',
		kind: 'Treat',
		meal: ['dessert'],
		servings: 5,
		equip: ['Oven', 'Stovetop', 'Ramekins'],
		freezer: false,
		veg: true,
		by: 'Santi',
		blurb: 'Silky baked custard with a golden caramel top.',
		ing: [
			i(3, '', 'eggs', 'dairy'),
			i(3, '', 'egg yolks', 'dairy'),
			i(2, 'cup', 'whole milk', 'dairy'),
			i(1, 'tsp', 'vanilla extract', 'spice', 'or ½ tsp vanilla paste, or ½ a vanilla bean pod'),
			i(0.5, 'cup', 'white granulated sugar', 'spice', 'for the custard'),
			i(0.333, 'cup', 'white granulated sugar', 'spice', 'for the caramel')
		],
		steps: [
			'Preheat the oven to 350°F. Place a deep oven dish, big enough to fit all your ramekins or your flan mold, in the center of the oven. Fill it with water that reaches just under half the height of the mold.',
			'Add the ⅓ cup of sugar and 2 teaspoons of water to a frying pan on medium-low heat and let sit. Once the sugar begins to melt and brown, gently mix with a spatula to prevent burning. When the caramel is uniformly golden brown and no sugar crystals remain, cover the bottoms of the ramekins or flan mold with it.',
			'Pour the milk and vanilla into a small pot, mix, and place on low heat. Heat until scalding but not boiling.',
			'While the milk heats, in a large metal bowl, beat the eggs, egg yolks and remaining sugar until the sugar is completely dissolved.',
			"Extremely slowly, ladle the milk into the egg mixture while whisking constantly. This keeps the eggs from scrambling in the heat. Once you've used half the milk, you can ladle in faster.",
			'Strain the custard through a fine mesh sieve.',
			'Pour the custard into the ramekins or flan mold and gently place into the water-filled dish in the oven. Bake for 45 minutes.',
			'Cool for 15 minutes before taking the flan out of the hot-water bath. Cool on the counter for another 15 minutes, then refrigerate for at least 2 hours.',
			'To serve, run a small knife around the edge of the flan to separate it from the mold. Place a serving dish over the top, flip, and wiggle until the flan overcomes the suction and settles onto the plate.'
		],
		notes: []
	}
];

export const MEALS = {
	everyday: 'Everyday',
	breakfast: 'Breakfast',
	dessert: 'Dessert',
	special: 'Special occasion'
};
