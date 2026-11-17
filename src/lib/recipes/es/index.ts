// Spanish text for each recipe, keyed by recipe id. See ./types note in README at the top of each part.
import type { RecipeEs } from './types';
import { part1 } from './part1';
import { part2 } from './part2';
import { part3 } from './part3';
import { part4 } from './part4';
import { part5 } from './part5';

export const RECIPES_ES: Record<string, RecipeEs> = {
	...part1,
	...part2,
	...part3,
	...part4,
	...part5
};
