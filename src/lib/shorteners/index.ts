export interface LinkShortener {
	shorten(url: string): Promise<string>;
}

import { bitlyShortener } from './bitly';
import { polrShortener } from './polr';
// import { tinyUrlShortener } from './tinyurl'; 

export const shortener: LinkShortener = polrShortener;