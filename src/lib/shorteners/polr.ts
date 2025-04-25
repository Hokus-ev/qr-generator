import type { LinkShortener } from './index';
import { env } from '$env/dynamic/private';
// import { polrApiKey, polrApiUrl } from '$lib/config/private';

const polrApiUrl = env.POLR_API_URL!;
const polrApiKey = env.POLR_API_KEY!;

export const polrShortener: LinkShortener = {
	async shorten(url: string): Promise<string> {
		const params = new URLSearchParams();
		params.append("key", polrApiKey);
		params.append("url", url);
		const res = await fetch(`${polrApiUrl}/api/v2/action/shorten?${params}`);

		const data = await res.text();

		if (!res.ok) {
			throw new Error(data || 'POLR API Fehler');
		}

		return data; // Das ist der gekürzte Link
	}
};