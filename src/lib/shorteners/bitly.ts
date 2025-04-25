import type { LinkShortener } from './index';
import { env } from '$env/dynamic/private';
// import { bitlyApiKey} from '$lib/config/private';

export const bitlyShortener: LinkShortener = {
	async shorten(url: string): Promise<string> {
		const apiKey = env.BITLY_API_KEY!;
		// const group_guid = process.env.BITLY_GROUP_GUID!;
		const res = await fetch('https://api-ssl.bitly.com/v4/shorten', {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${apiKey}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ long_url: url, domain: 'bit.ly'})
		});

		if (!res.ok) throw new Error('Bitly API failed');
		const data = await res.json();
		return data.link;
	}
};