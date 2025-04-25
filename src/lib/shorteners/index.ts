export interface LinkShortener {
	shorten(url: string): Promise<string>;
}

import { bitlyShortener } from './bitly';
import { polrShortener } from './polr';
// import { tinyUrlShortener } from './tinyurl'; // vorbereitet

export const useLinkShortener = false; // Hier kannst du entscheiden, ob du den Link-Shortener verwenden möchtest oder nicht
// Hier entscheidest du zentral, welche Implementierung aktiv ist
export const shortener: LinkShortener = polrShortener;