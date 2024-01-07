<script lang="ts">
	import Pattern from '$lib/Pattern.svelte';
	import { type Palette, makePalette } from '$lib/color';
	let palette: Palette = makePalette();
</script>

<button on:click={() => (palette = makePalette())}>
	<Pattern {palette} />
</button>

<style>
	button {
		border: none;
		margin: 0;
		padding: 0;
		background-color: transparent;
	}

	:global(body) {
		margin: 0;
		padding: 0;
	}
</style>
