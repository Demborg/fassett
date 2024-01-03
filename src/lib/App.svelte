<script lang="ts">
	import Pattern from '$lib/Pattern.svelte';
	import { makePalette } from '$lib/color';
	import { slide } from 'svelte/transition';
    
    const seed = Math.random() * 1337;
    const palettes = [...Array(5)].map(() => makePalette())
</script>

<main>
<Pattern {seed} palette={palettes[0]}/>

<samples>
    {#each palettes.slice(1) as palette}
        <Pattern {seed} palette={palette}/>
    {/each}
</samples>

</main>

<style>
    main {
        max-width: 700px;
    }
    samples {
        display: flex;
        flex-direction: row;
    }
</style>