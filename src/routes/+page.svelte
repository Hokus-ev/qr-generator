<script lang="ts">
	import { onMount } from 'svelte';
	import QRCodeStyling from 'qr-code-styling';

	let baseUrl = '';
	let selectedSrc = '';
	let customSrc = '';
	let autoDownload = true;
	let fileType = 'svg';
	let finalUrl = '';
	let qrCode: QRCodeStyling;

	$: finalUrl = (() => {
		let srcValue = customSrc || selectedSrc;
		let url = baseUrl;

		if (baseUrl) {
			if (srcValue) {
				url += (baseUrl.includes('?') ? '&' : '?') + 'src=' + encodeURIComponent(srcValue);
			}
		} else {
			url = '';
		}

		return url;
	})();

	// function updatePreview() {
	// 	finalUrl = buildFinalUrl();
	// }

	function generateQRCode() {
		if (!finalUrl) {
			alert('Bitte gib mindestens eine Basis-URL ein.');
			return;
		}

		document.getElementById('canvas')!.innerHTML = '';

		if (qrCode) {
			qrCode.update({ data: finalUrl });
		} else {
			// Create a new QRCodeStyling instance
			qrCode = new QRCodeStyling({
				width: 1200,
				height: 1200,
				type: 'svg',
				data: finalUrl,
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
		}

		qrCode.append(document.getElementById('canvas')!);

		if (autoDownload) {
			qrCode.download({ name: 'qr', extension: fileType });
		}
	}
</script>

<main class="mx-auto max-w-xl p-6 text-center font-sans">
	<h1 class="mb-6 text-2xl font-bold">QR Code Generator</h1>

	<input
		type="text"
		bind:value={baseUrl}
		placeholder="Basis-URL (z.B. https://hokus.org/brauereibesichtigung/)"
		class="mb-4 w-full rounded border p-3"
	/>

	<select bind:value={selectedSrc} class="mb-4 w-full rounded border p-3">
		<option value="">-- Standard-Quelle auswählen --</option>
		<option value="Website">Website</option>
		<option value="Facebook">Facebook</option>
		<option value="Instagram">Instagram</option>
		<option value="Flyer">Flyer</option>
	</select>

	<input
		type="text"
		bind:value={customSrc}
		placeholder="Benutzerdefinierte Quelle (optional)"
		class="mb-4 w-full rounded border p-3"
	/>

	<label class="mb-4 flex items-center justify-center gap-2">
		<input type="checkbox" bind:checked={autoDownload} />
		<span>Automatisch herunterladen</span>
	</label>

	<select bind:value={fileType} class="mb-4 w-full rounded border p-3">
		<option value="svg">SVG</option>
		<option value="png">PNG</option>
		<option value="jpeg">JPEG</option>
		<option value="webp">WEBP</option>
	</select>

	<button
		on:click={generateQRCode}
		class="rounded bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
	>
		QR-Code generieren
	</button>

	<p class="mt-4 text-gray-600 italic">
		{finalUrl ? `Finale URL: ${finalUrl}` : 'Finale URL wird hier angezeigt…'}
	</p>

	<div id="canvas" class="mt-6"></div>
</main>
