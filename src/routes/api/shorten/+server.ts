import { json } from '@sveltejs/kit';
import { shortener } from '$lib/shorteners';

export async function POST({ request }) {
	const { url } = await request.json();

	try {
		const shortUrl = await shortener.shorten(url);
		return json({ shortUrl });
	} catch (e) {
		return json({ error: e }, { status: 500 });
	}
}
