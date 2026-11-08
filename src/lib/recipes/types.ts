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
	meal: string[];
	by: string;
	servings: number;
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

export type CalendarId = 'google' | 'outlook' | 'office' | 'ics';
