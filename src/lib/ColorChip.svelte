<script lang="ts">
	import { rgbToHex, type Color } from './color';

	export let color: Color;
	let element: HTMLButtonElement;

	function hexColor(): string | null {
		const style = window.getComputedStyle(element);
		return rgbToHex(style.backgroundColor);
	}

	function handleClick(): void {
		const color = hexColor();
		if (!color) return;
		navigator.clipboard.writeText(color);
	}
</script>

<button
	bind:this={element}
	style="background: {color}"
	on:click={handleClick}
	title="Click to copy"
/>

<style>
	button {
		margin: 0.5rem;
		height: 2rem;
		width: 3rem;
		border-radius: 0.3rem;
		border: none;
	}
</style>
