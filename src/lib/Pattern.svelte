<script lang="ts">
	import { onMount } from 'svelte';
	import { defaultPalette, type Palette } from './color';
	const nFlowers = 200;
	const size = 1000;
	const minDistance = 200;
	export let seed: number = 42;
	export let palette: Palette = defaultPalette;
	let canvas: HTMLCanvasElement;

	type Point = { x: number; y: number };

	$: draw(seed, palette);

	onMount(() => draw(seed, palette));

	function tilingCall(fn: (x: number, y: number) => void, x: number, y: number) {
		const offsets = [-size, 0, size];
		offsets.forEach((dx) => {
			offsets.forEach((dy) => {
				fn(x + dx, y + dy);
			});
		});
	}

	function tilingCircle(ctx: CanvasRenderingContext2D, x: number, y: number, r: number) {
		tilingCall(
			(x, y) => {
				ctx.moveTo(x, y);
				ctx.arc(x, y, r, 0, 2 * Math.PI);
			},
			x,
			y
		);
	}

	function distance(a: Point, b: Point): number {
		return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
	}

	function minTilingDistance(a: Point, b: Point): number {
		let offsets = [-size, 0, size];
		return Math.min(
			...offsets.map((dx) =>
				Math.min(...offsets.map((dy) => distance(a, { x: b.x + dx, y: b.y + dy })))
			)
		);
	}

	function filterMinDistance(positions: Point[], minDistance: number): Point[] {
		return positions.reduce(
			(filtered: Point[], incomming: Point) =>
				filtered.some((old: Point) => minTilingDistance(old, incomming) < minDistance)
					? filtered
					: [...filtered, incomming],
			[]
		);
	}

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

		const candidates = [...Array(nFlowers)].map(() => {
			return { x: Math.random() * size, y: Math.random() * size };
		});
		const positions = filterMinDistance(candidates, minDistance);

		ctx.fillStyle = palette.leaf;
		positions.forEach((p) => {
			tilingCircle(ctx, p.x, p.y, 100);
		});
		ctx.fill();
	}
</script>

<canvas height={size} width={size} bind:this={canvas} />
