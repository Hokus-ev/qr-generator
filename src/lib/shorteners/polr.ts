import type { LinkShortener } from './index';
import { POLR_API_URL, POLR_API_KEY } from '$env/static/private';

// const POLR_API_URL = process.env.POLR_API_URL!;
// const POLR_API_KEY = process.env.POLR_API_KEY!;

export const polrShortener: LinkShortener = {
	async shorten(url: string): Promise<string> {
		const params = new URLSearchParams();
		params.append("key", POLR_API_KEY);
		params.append("url", url);
		const res = await fetch(`${POLR_API_URL}/api/v2/action/shorten?${params}`);

		// const res = await fetch(`${POLR_API_URL}/api/v2/action/shorten`, {
		// 	method: 'GET',
		// 	// headers: {
		// 	// 	'Content-Type': 'application/json'         
		// 	// },
		// 	body: JSON.stringify({
		// 		key: POLR_API_KEY,
		// 		url: url,
		// 	//	is_secret: false // optional je nach Konfiguration
		// 	})
		// });

		const data = await res.text();
		//console.log('Polr API response:', data); // Debugging
		if (!res.ok) {
			throw new Error(data || 'POLR API Fehler');
		}

		return data; // Das ist der gekürzte Link
	}
};