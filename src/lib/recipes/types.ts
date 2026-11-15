export interface Ingredient {
	qty: number | null;
	unit: string;
	name: string;
	dept: string;
	note?: string;
}

export interface Recipe {
	id: string;
	title: string;
	blurb: string;
	section: string;
	kind?: string;
	/** Easy weekly dish: the meal planner and combos only use recipes with this set. */
	weekly?: boolean;
	meal: string[];
	by: string;
	servings: number;
	/** Minutes: hands-on work (`active`) and start to table (`total`). */
	mins?: { active: number; total: number };
	equip?: string[];
	tags?: string[];
	freezer?: boolean;
	veg?: boolean;
	stew?: boolean;
	ing: Ingredient[];
	steps: (string | [string, string])[];
	notes?: string[];
	flavors?: { name: string; add: string; sweet?: string; top?: string }[];
	source?: { name: string; url: string };
	user?: boolean;
	/** Set on a combo: the ids of the protein, veg and carb recipes it is made from. */
	parts?: string[];
	/** Set when ingredients were swapped for the reader's diet (see swapRecipe). */
	swaps?: { from: string; to: string }[];
}

export interface PlanItem {
	r: Recipe;
	servings: number;
}

export interface Cook {
	id: string;
	name: string;
	icon: 'shark' | 'jellyfish';
}
