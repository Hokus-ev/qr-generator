import type { LinkShortener } from './index';
import { BITLY_API_KEY } from '$env/static/private';

export const bitlyShortener: LinkShortener = {
	async shorten(url: string): Promise<string> {
		// const apiKey = BITLY_API_KEY!;
		// const group_guid = process.env.BITLY_GROUP_GUID!;
		const res = await fetch('https://api-ssl.bitly.com/v4/shorten', {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${BITLY_API_KEY}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ long_url: url, domain: 'bit.ly'})
		});

		if (!res.ok) throw new Error('Bitly API failed');
		const data = await res.json();
		return data.link;
	}
};