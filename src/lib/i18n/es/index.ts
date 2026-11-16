// Spanish strings, keyed by the exact English text used in t('...'). Each file covers one area.
import { common } from './common';
import { browse } from './browse';
import { plan } from './plan';
import { forms } from './forms';
import { wedding } from './wedding';

export const ES: Record<string, string> = { ...common, ...browse, ...plan, ...forms, ...wedding };
