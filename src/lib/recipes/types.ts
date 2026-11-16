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
	/** The cook's own note on where the recipe came from, in their words. */
	story?: string;
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
	/** Approved photos shown on the recipe page. `src` is an image under /recipe-photos/. */
	photos?: { src: string; kind: 'dish' | 'cooking'; by?: string; caption?: string }[];
	/** Recipes that share a `family` are variations of one dish: a plan never includes two of them. */
	family?: string;
	/** Short name for this version within its family, e.g. "Slow cooker". */
	variant?: string;
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
	icon: string;
}
