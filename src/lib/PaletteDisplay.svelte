<script lang="ts">
	import type { Palette } from './color';
	import ColorChip from './ColorChip.svelte';

	export let palette: Palette;
</script>

<row>
	<ColorChip color={palette.background} />
	<ColorChip color={palette.leaf} />
	<ColorChip color={palette.detail1} />
	<ColorChip color={palette.detail2} />
	<ColorChip color={palette.petal} />
	- {palette.name.toUpperCase()}
</row>

<style>
	row {
		display: flex;
		flex-direction: row;
		align-items: center;
	}
</style>
