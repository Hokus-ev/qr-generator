<script lang="ts">
	import { onMount } from 'svelte';
	import QRCodeStyling from 'qr-code-styling';
	import type { FileExtension } from 'qr-code-styling';

    import JSZip from 'jszip';
    import pkg from 'file-saver';
    const { saveAs } = pkg;


	let baseUrl = '';
	let name = '';
	let selectedSrc = '';
	let customSrc = '';
	let autoDownload = false;
	let fileType: FileExtension = 'svg';
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

    const sources = ["Website", "Facebook", "Instagram", "Flyer", "Sticker"];

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
			let srcValue = customSrc || selectedSrc;

			qrCode.download({ name: 'qr_' + (name?name+'_':'') + srcValue, extension: fileType });
		}
	}
	function downloadQRCode() {
		if (qrCode) {
			qrCode.update({ data: finalUrl });
		}
        let srcValue = customSrc || selectedSrc;
         
		qrCode.download({ name: 'qr_' + (name?name+'_':'') + srcValue, extension: fileType });
	}

    async function generateAndDownloadAll(){
        if (!baseUrl) {
			alert('Bitte gib mindestens eine Basis-URL ein.');
			return;
		}

        const zip = new JSZip();
        
          //await qrCodeG.download({ name: 'qr_' + (name?name+'_':'') + source1, extension: fileType });
        for(let i = 0; i < sources.length; i++){
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

            zip.file(filename, blob);
        }
        // ZIP-Datei erzeugen und herunterladen
        const zipBlob = await zip.generateAsync({ type: 'blob' });
        saveAs(zipBlob, 'qr_codes' + (name ? '_' + name : '') + '.zip');
    }
</script>

<main class="mx-auto max-w-5xl p-6 font-sans">
	<h1 class="mb-6 text-center text-2xl font-bold">QR Code Generator</h1>

	<div class="flex flex-col gap-6 md:flex-row">
		<!-- Formular -->
		<div class="flex-1">
			<input
				type="text"
				bind:value={baseUrl}
				placeholder="Basis-URL (z.B. https://hokus.org/brauereibesichtigung/)"
				class="mb-4 w-full rounded border p-3"
			/>

            <input
				type="text"
				bind:value={name}
				placeholder="Dateiname (optional)"
				class="mb-4 w-full rounded border p-3"
			/>

			<select bind:value={selectedSrc} class="mb-4 w-full rounded border p-3">
				<option value="">-- Standard-Quelle auswählen --</option>
				{#each sources as source}
                    <option value={source}>{source}</option>
                {/each}
			</select>

			<input
				type="text"
				bind:value={customSrc}
				placeholder="Benutzerdefinierte Quelle (optional)"
				class="mb-4 w-full rounded border p-3"
			/>

			<label class="mb-4 flex items-center gap-2">
				<input type="checkbox" bind:checked={autoDownload} />
				<span>Automatisch herunterladen</span>
			</label>

			<select bind:value={fileType} class="mb-4 w-full rounded border p-3">
				<option value="svg">SVG</option>
				<option value="png">PNG</option>
				<option value="jpeg">JPEG</option>
				<option value="webp">WEBP</option>
			</select>

			<div class="flex gap-4 mb-4">
				<button
					on:click={generateQRCode}
					class="flex-1 rounded bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
				>
					QR-Code generieren
				</button>
				<button
					on:click={downloadQRCode}
					class="flex-1 rounded bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
				>
					QR-Code herunterladen
				</button>
			</div>
			<div class="flex justify-center">

            <button
					on:click={generateAndDownloadAll}
					class="rounded bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
				>
					Alle Speichern!
				</button>
			</div>


			<p class="mt-4 text-center text-gray-600 italic">
				{finalUrl ? `Finale URL: ${finalUrl}` : 'Finale URL wird hier angezeigt…'}
			</p>
		</div>

		<!-- Canvas -->
		<div
			id="canvas"
			class="mt-6 flex-1 rounded border bg-gray-100 p-4 md:mt-0"
			style="max-width: 50%;"
		></div>
	</div>
</main>

<style>
	#canvas :global {
		svg {
			max-width: 100%;
			height: auto;
		}
	}
</style>


