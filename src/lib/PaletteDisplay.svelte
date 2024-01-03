<script lang="ts">
	import type { Palette } from "./color";

    export let palette: Palette;
    export let name: string;

</script>

<row>
    {name.toUpperCase()}
    <chip style="background: {palette.background}"/>
    <chip style="background: {palette.leaf}"/>
    <chip style="background: {palette.detail1}"/>
    <chip style="background: {palette.detail2}"/>
    <chip style="background: {palette.petal}"/>
    - {name.toUpperCase()}
</row>

<style>
    row {
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    chip {
        margin: 0.5rem;
        height: 2rem;
        width: 3rem;
        border-radius: 0.3rem;
    }
</style>
