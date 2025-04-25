<script lang="ts">
	import QRCodeStyling from 'qr-code-styling';
	import type { FileExtension } from 'qr-code-styling';

	import JSZip from 'jszip';
	import pkg from 'file-saver';

	import { _, locale, locales } from 'svelte-i18n';

	import { env } from '$env/dynamic/public';

	const shortenerEnabled = env.PUBLIC_SHORTENER_ENABLED === 'true';


	const { saveAs } = pkg;

	let baseUrl = '';
	let name = '';
	let autoDownload = false;
	let fileType: FileExtension = 'svg';
	let finalUrl = '';
	let qrCode: QRCodeStyling;

	let selectedSrc = '';
	let customSrc = '';

	let finalSrc = '';

	$: finalUrl = (() => {
		finalSrc = customSrc || selectedSrc;
		let url = baseUrl;

		if (baseUrl) {
			if (finalSrc) {
				url += (baseUrl.includes('?') ? '&' : '?') + 'src=' + encodeURIComponent(finalSrc);
			}
		} else {
			url = '';
		}

		return url;
	})();

	const sources = ['Website', 'Instagram', 'Discord', 'WhatsApp', 'Flyer', 'Plakat', 'Sticker'];

	let showAdvancedOptions = false;
	let includeLogo = true;

	function generateQRCode() {
		if (!finalUrl) {
			alert($_('alertNoUrl'));
			return;
		}

		document.getElementById('canvas')!.innerHTML = '';

		if (qrCode) {
			qrCode.update({ data: finalUrl, image: includeLogo ? 'logo.png' : undefined });
		} else {
			// Create a new QRCodeStyling instance
			qrCode = new QRCodeStyling({
				width: 1200,
				height: 1200,
				type: 'svg',
				data: finalUrl,
				image: includeLogo ? 'logo.png' : undefined,
				dotsOptions: {
					// color: '#4267b2',
					// type: 'rounded'
				},
				backgroundOptions: {
					color: '#ffffff'
				},
				imageOptions: {
					crossOrigin: 'anonymous',
					margin: 20
				}
			});
		}

		qrCode.append(document.getElementById('canvas')!);

		if (autoDownload) {
			const fileName = 'qr_' + (name ? name + '_' : '') + finalSrc;
			qrCode.download({ name: fileName, extension: fileType });
		}
	}

	function downloadQRCode() {
		if (qrCode) {
			qrCode.update({ data: finalUrl });
		}
		const fileName = 'qr_' + (name ? name + '_' : '') + finalSrc;
		qrCode.download({ name: fileName, extension: fileType });
	}

	async function generateAndDownloadAll() {
		if (!baseUrl) {
			alert('Bitte gib mindestens eine Basis-URL ein.');
			return;
		}

		const zip = new JSZip();

		//await qrCodeG.download({ name: 'qr_' + (name?name+'_':'') + source1, extension: fileType });
		for (let i = 0; i < sources.length; i++) {
			let src = sources[i];
			const url = baseUrl + (baseUrl.includes('?') ? '&' : '?') + 'src=' + encodeURIComponent(src);

			let qrCodeG = new QRCodeStyling({
				width: 1200,
				height: 1200,
				//type: 'svg',
				data: url,
				image: 'logo_transparent.png',
				dotsOptions: {
					// color: '#4267b2',
					// type: 'rounded'
				},
				backgroundOptions: {
					color: '#ffffff'
				},
				imageOptions: {
					crossOrigin: 'anonymous',
					margin: 20
				}
			});

			const blob = await qrCodeG.getRawData(fileType);

			const filename = 'qr_' + (name ? name + '_' : '') + src + '.' + fileType;

			if (blob) {
				zip.file(filename, blob);
			} else {
				console.error(`Failed to generate QR code for ${src}`);
			}
		}
		// ZIP-Datei erzeugen und herunterladen
		const zipBlob = await zip.generateAsync({ type: 'blob' });
		saveAs(zipBlob, 'qr_codes' + (name ? '_' + name : '') + '.zip');
	}

	let originalUrl = '';
	let shortUrl = '';
	let loading = false;
	let error = '';
	async function shortenLink() {
		loading = true;
		error = '';
		shortUrl = '';

		try {
			const res = await fetch('/api/shorten', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ url: originalUrl })
			});

			const data = await res.json();
			if (!res.ok) {
				throw new Error(data.error || 'Fehler beim Kürzen');
			}
			// console.log(data);

			shortUrl = data.shortUrl;
			baseUrl = shortUrl;
		} catch (err) {
			error = (err as Error).message;
		} finally {
			loading = false;
		}
	}
</script>

<main class="mx-auto max-w-5xl p-6 font-sans">
	<h1 class="mb-6 text-center text-2xl font-bold">{$_('title')}</h1>


	{#if shortenerEnabled}
	<h2>Link kürzen</h2>

	<input
		type="text"
		bind:value={originalUrl}
		placeholder="https://example.com/dein-langer-link"
	/>

	<button on:click={shortenLink} disabled={loading || !originalUrl}>
		{loading ? 'Kürze...' : 'Kürzen'}
	</button>
	{/if}

	{#if shortUrl}
		<p><strong>Short URL:</strong> <a href={shortUrl} target="_blank">{shortUrl}</a></p>
	{/if}

	{#if error}
		<p style="color: red">{error}</p>
	{/if}
	<div class="flex flex-col gap-6 md:flex-row">
		<!-- Formular -->
		<div class="flex-1">
			{#if shortUrl}
				<input
				type="text"
				bind:value={baseUrl}
				placeholder={$_('baseUrlPlaceholder')}
				class="mb-4 w-full rounded border p-3"
				readonly
				/>
			{:else}
			<input
				type="text"
				bind:value={baseUrl}
				placeholder={$_('baseUrlPlaceholder')}
				class="mb-4 w-full rounded border p-3"
			/>
			{/if}


			<input
				type="text"
				bind:value={name}
				placeholder={$_('fileNamePlaceholder')}
				class="mb-4 w-full rounded border p-3"
			/>

			<select bind:value={selectedSrc} class="mb-4 w-full rounded border p-3">
				<option value="">{$_('selectSource')}</option>
				{#each sources as source}
					<option value={source}>{source}</option>
				{/each}
			</select>

			<input
				type="text"
				bind:value={customSrc}
				placeholder={$_('customSourcePlaceholder')}
				class="mb-4 w-full rounded border p-3"
			/>

			<label class="mb-4 flex items-center gap-2">
				<input type="checkbox" bind:checked={autoDownload} />
				<span>{$_('autoDownload')}</span>
			</label>

			<select bind:value={fileType} class="mb-4 w-full rounded border p-3">
				<option value="svg">SVG</option>
				<option value="png">PNG</option>
				<option value="jpeg">JPEG</option>
				<option value="webp">WEBP</option>
			</select>

			<button
				on:click={() => (showAdvancedOptions = !showAdvancedOptions)}
				class="cursor-pointer border-none bg-transparent text-blue-600 hover:underline"
			>
				{showAdvancedOptions ? $_('advancedOptionsHide') : $_('advancedOptionsShow')}
			</button>

			{#if showAdvancedOptions}
				<div class="mt-4">
					<label class="mb-4 flex items-center gap-2">
						<input type="checkbox" bind:checked={includeLogo} />
						<span>{$_('includeLogo')}</span>
					</label>
				</div>
			{/if}

			<div class="mb-4 flex gap-4">
				<button
					on:click={generateQRCode}
					class="flex-1 rounded bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
				>
					{$_('generateQRCode')}
				</button>
				<button
					on:click={downloadQRCode}
					class="flex-1 rounded bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
				>
					{$_('downloadQRCode')}
				</button>
			</div>
			<div class="flex justify-center">
				<button
					on:click={generateAndDownloadAll}
					class="rounded bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
				>
					{$_('saveAll')}
				</button>
			</div>

			<p class="mt-4 text-center text-gray-600 italic">
				{finalUrl ? `Finale URL: ${finalUrl}` : $_('finalUrlPlaceholder')}
			</p>
		</div>

		<!-- Canvas -->
		<!-- Canvas -->
<div class="mt-6 md:mt-0 w-full md:w-[400px]">
	<div id="canvas" class="aspect-square w-full rounded border bg-gray-100 p-4"></div>
  </div>
	</div>
	<!-- <select on:change={(e) => $setLocale(e.target.value)} class="mb-4">
		<option value="en">English</option>
		<option value="de">Deutsch</option>
	</select> -->
	<select bind:value={$locale}>
	{#each $locales as locale}
		<option value={locale}>{locale}</option>
	{/each}
	</select>
</main>

<style>
	#canvas :global {
		svg {
			max-width: 100%;
			height: auto;
		}
	}
</style>
