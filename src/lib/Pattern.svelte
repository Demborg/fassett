<script lang="ts">
	import { onMount } from 'svelte';
	import { defaultPalette, type Palette } from './color';
	const size = 1000;
	export let seed: number = 42;
	export let palette: Palette = defaultPalette;
	let canvas: HTMLCanvasElement;

	$: draw(seed, palette);

	onMount(() => draw(seed, palette));

	function draw(seed: number, palette: Palette) {
		if (!canvas) {
			return;
		}
		const ctx = canvas.getContext('2d');
		if (!ctx) {
			return;
		}

		ctx.fillStyle = palette.background;
		ctx.fillRect(0, 0, size, size);
	}
</script>

<canvas height={size} width={size} bind:this={canvas} />
