<script lang="ts">
	import Pattern from '$lib/Pattern.svelte';
	import { makePalette } from '$lib/color';
	import PaletteDisplay from './PaletteDisplay.svelte';
    
    const seed = Math.random() * 1337;
    const palettes = [...Array(5)].map(() => makePalette())
</script>

<main>
<Pattern {seed} palette={palettes[0]}/>


{#each palettes as palette}
    <PaletteDisplay palette={palette}/>
{/each}

<samples>
    {#each palettes.slice(1) as palette}
        <Pattern {seed} palette={palette}/>
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
</style>