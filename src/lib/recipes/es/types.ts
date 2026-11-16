/** Spanish version of one recipe. `ing` has one entry per ingredient, in the same order as the
 *  English recipe: translate `name`, and `note` if the English one has a note. Steps and notes keep
 *  the same count and order (a step written as [heading, text] stays a pair). */
export interface RecipeEs {
	title: string;
	blurb?: string;
	story?: string;
	variant?: string;
	ing: { name: string; note?: string }[];
	steps: (string | [string, string])[];
	notes?: string[];
	flavors?: { name: string; add: string; sweet?: string; top?: string }[];
}
