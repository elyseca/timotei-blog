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
export const SECTIONS = [
	'Easy Weekly Meals',
	'Easy Weekly Protein',
	'Veggies & Sides',
	'Carbs',
	'Breakfast',
	'Sweet Treats'
];
export const KINDS = {
	Main: 'Easy Weekly Meals',
	Protein: 'Easy Weekly Protein',
	Side: 'Veggies & Sides',
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
		title: 'Chili',
		section: 'Easy Weekly Meals',
		kind: 'Main',
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
		title: 'Chicken Sausage & Couscous Soup',
		section: 'Easy Weekly Meals',
		kind: 'Main',
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
		title: 'Salsa Verde Chicken Soup',
		section: 'Easy Weekly Meals',
		kind: 'Main',
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
		title: 'One-Pot Chicken & White Bean Stew',
		section: 'Easy Weekly Meals',
		kind: 'Main',
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
		title: 'Butternut Squash Soup',
		section: 'Easy Weekly Meals',
		kind: 'Main',
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
		title: 'Kung Pao Beef Bowls',
		section: 'Easy Weekly Meals',
		kind: 'Main',
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
		title: 'Mediterranean Meatball Bowls',
		section: 'Easy Weekly Meals',
		kind: 'Main',
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
		title: 'Salmon, Asparagus & White Rice',
		section: 'Easy Weekly Meals',
		kind: 'Main',
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
		title: 'Chicken Thigh & Potato Sheet Pan Meal',
		section: 'Easy Weekly Meals',
		kind: 'Main',
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
		title: 'Roasted Sweet Potato, Fennel & Lentil Power Bowl',
		section: 'Easy Weekly Meals',
		kind: 'Main',
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
		title: 'Vegan Vodka Sauce (Silken Tofu)',
		section: 'Easy Weekly Meals',
		kind: 'Main',
		meal: ['everyday'],
		servings: 8,
		equip: ['Stovetop'],
		freezer: false,
		veg: true,
		by: 'Elyse',
		blurb: 'Creamy tomato sauce with roasted red pepper.',
		ing: [
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
			'Sauté the diced onion in 1 tbsp olive oil until soft and golden, about 8 minutes. Blend it with all remaining ingredients until smooth.',
			'Adjust the seasoning.',
			'Gently warm before serving.'
		],
		notes: [
			'About the cashews: "Raw" means plain, unroasted, unsalted cashews, not the roasted, salted snack kind. Soaking softens them so they blend into a smooth, creamy base instead of a gritty one. Cover them with water and soak 2–4 hours, or overnight in the fridge. For a quick soak, cover with just-boiled water for 15–20 minutes. Drain and rinse before blending.'
		]
	},
	{
		id: 'butter-beans',
		title: 'One-Pot Cherry Tomato & Basil Butter Beans',
		section: 'Easy Weekly Meals',
		kind: 'Main',
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

	/* ---------- Easy Weekly Protein ---------- */
	{
		id: 'wings',
		title: 'Chicken Wings',
		section: 'Easy Weekly Protein',
		kind: 'Protein',
		meal: ['everyday'],
		servings: 4,
		equip: ['Oven'],
		freezer: false,
		veg: false,
		by: 'Elyse',
		blurb: 'Crisp-skinned wings with salt and pepper.',
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
		title: 'Pork Loin',
		section: 'Easy Weekly Protein',
		kind: 'Protein',
		meal: ['everyday'],
		servings: 5,
		equip: ['Oven'],
		freezer: false,
		veg: false,
		by: 'Elyse',
		blurb: 'Paprika and Dijon.',
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
		title: 'Whole Chicken',
		section: 'Easy Weekly Protein',
		kind: 'Protein',
		meal: ['everyday'],
		servings: 5,
		equip: ['Oven'],
		freezer: false,
		veg: false,
		by: 'Elyse',
		blurb: 'Paprika, thyme, and lemon.',
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

	/* ---------- Veggies & Sides ---------- */
	{
		id: 'broccoli',
		title: 'Frozen Broccoli',
		section: 'Veggies & Sides',
		kind: 'Side',
		meal: ['everyday'],
		servings: 4,
		equip: ['Oven'],
		freezer: false,
		veg: true,
		by: 'Elyse',
		blurb: 'Roasted broccoli with parmesan.',
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
		title: 'Instant Pot Mashed Potatoes',
		section: 'Carbs',
		kind: 'Carb',
		meal: ['everyday'],
		servings: 4,
		equip: ['Instant Pot'],
		freezer: false,
		veg: true,
		by: 'Elyse',
		blurb: 'Creamy Yukon potatoes with parmesan.',
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
		title: 'Simple Arugula Salad',
		section: 'Veggies & Sides',
		kind: 'Side',
		meal: ['everyday'],
		servings: 2,
		equip: [],
		freezer: false,
		veg: true,
		by: 'Elyse',
		blurb: 'Peppery arugula, lemon, and parmesan.',
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

	/* ---------- Carbs (each recipe is 1 cup dry) ---------- */
	{
		id: 'white-rice',
		title: 'White Rice',
		section: 'Carbs',
		kind: 'Carb',
		meal: ['everyday'],
		servings: 3,
		equip: ['Instant Pot'],
		freezer: false,
		veg: true,
		by: 'Elyse',
		blurb: 'Plain white rice.',
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
		title: 'Brown Rice',
		section: 'Carbs',
		kind: 'Carb',
		meal: ['everyday'],
		servings: 3,
		equip: ['Instant Pot'],
		freezer: false,
		veg: true,
		by: 'Elyse',
		blurb: 'Nutty brown rice.',
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
		title: 'Sushi Rice',
		section: 'Carbs',
		kind: 'Carb',
		meal: ['everyday'],
		servings: 3,
		equip: ['Instant Pot'],
		freezer: false,
		veg: true,
		by: 'Elyse',
		blurb: 'Sticky rice seasoned with rice vinegar.',
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
		title: 'Quinoa',
		section: 'Carbs',
		kind: 'Carb',
		meal: ['everyday'],
		servings: 3,
		equip: ['Stovetop'],
		freezer: false,
		veg: true,
		by: 'Elyse',
		blurb: 'Plain quinoa.',
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
		title: 'Pearled Couscous',
		section: 'Carbs',
		kind: 'Carb',
		meal: ['everyday'],
		servings: 3,
		equip: ['Stovetop'],
		freezer: false,
		veg: true,
		by: 'Elyse',
		blurb: 'Plain pearled couscous.',
		ing: [i(1, 'cup', 'pearled couscous', 'dry'), i(1.25, 'cup', 'water', 'other')],
		steps: ['Simmer the couscous in the water for 10 minutes.'],
		notes: []
	},

	/* ---------- Breakfast ---------- */
	{
		id: 'fritters',
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
	}
];

export const MEALS = {
	everyday: 'Everyday',
	breakfast: 'Breakfast',
	dessert: 'Dessert',
	special: 'Special occasion'
};
