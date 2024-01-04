<script lang="ts">
	import Pattern from '$lib/Pattern.svelte';
	import { makePalette } from '$lib/color';
	import PaletteDisplay from './PaletteDisplay.svelte';

	const seed = Math.random() * 1337;
	const palettes = [...Array(5)].map(() => makePalette());
	let highlightIndex: number = 0;
</script>

<main>
	<Pattern {seed} palette={palettes[highlightIndex]} />

	{#each palettes as palette}
		<PaletteDisplay {palette} />
	{/each}

	<samples>
		{#each palettes as palette, i}
			{#if i !== highlightIndex}
				<sample
					on:click={() => {
						highlightIndex = i;
					}}
				>
					<name>{palette.name}</name>
					<Pattern {seed} {palette} />
				</sample>
			{/if}
		{/each}
	</samples>
</main>

<style>
	@font-face {
		font-family: 'Comic Neue';
		src: url('/fonts/ComicNeue-Regular.ttf');
	}
	main {
		font-family: 'Comic Neue';
		max-width: 700px;
	}
	samples {
		display: flex;
		flex-direction: row;
	}
	sample {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	name {
		text-transform: capitalize;
	}
</style>
