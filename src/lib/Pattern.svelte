<script lang="ts">
	import { onMount } from 'svelte';
	import { defaultPalette, type Palette } from './color';
    import {splitmix32 } from './random'
	const nFlowers = 200;
	const size = 1000;
	const minDistance = 200;
	export let seed: number = 42;
	export let palette: Palette = defaultPalette;
	let canvas: HTMLCanvasElement;
    let random: () => number;

	type Point = { x: number; y: number };

	$: draw(seed, palette);

	onMount(() => {
        random = splitmix32(seed)
        draw(seed, palette)});

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

	function tilingElipse(
		ctx: CanvasRenderingContext2D,
		x: number,
		y: number,
		a: number,
		b: number,
		rotation: number
	) {
		tilingCall(
			(x, y) => {
				ctx.moveTo(x, y);
				ctx.ellipse(x, y, a, b, rotation, 0, 2 * Math.PI);
			},
			x,
			y
		);
	}

	function tilingLeaf(ctx: CanvasRenderingContext2D, x: number, y: number, rotation: number) {
		const xOffset = Math.cos(rotation) * 100;
		const yOffset = Math.sin(rotation) * 100;

		ctx.beginPath();
		ctx.fillStyle = palette.leaf;
		tilingElipse(ctx, x + xOffset, y + yOffset, 50, 25, rotation);
		ctx.fill();

		ctx.beginPath();
		ctx.fillStyle = palette.detail1;
		tilingElipse(ctx, x + xOffset, y + yOffset, 40, 5, rotation);
		ctx.fill();
	}

	function tilingFlower(ctx: CanvasRenderingContext2D, x: number, y: number) {
		const initialRotation = random() * Math.PI * 2;
		for (let i = 0; i < 5; i++) {
			const rotation = (i * 2 * Math.PI) / 5 + initialRotation;
			const xOffset = Math.cos(rotation) * 50;
			const yOffset = Math.sin(rotation) * 50;

			ctx.beginPath();
			ctx.fillStyle = palette.petal;
			tilingElipse(ctx, x + xOffset, y + yOffset, 50, 50, rotation);
			ctx.fill();
		}

		ctx.beginPath();
		ctx.fillStyle = palette.detail1;
		tilingCircle(ctx, x, y, 40);
		ctx.fill();

		ctx.beginPath();
		ctx.fillStyle = palette.detail2;
		tilingCircle(ctx, x, y, 10);
		ctx.fill();

		ctx.beginPath();
		ctx.fillStyle = palette.leaf;
		tilingCircle(ctx, x, y, 5);
		ctx.fill();

		for (let i = 0; i < 15; i++) {
			const rotation = (i * 2 * Math.PI) / 15 + initialRotation;
			const xOffset = Math.cos(rotation) * 20;
			const yOffset = Math.sin(rotation) * 20;

			ctx.beginPath();
			ctx.fillStyle = palette.leaf;
			tilingElipse(ctx, x + xOffset, y + yOffset, 2, 2, rotation);
			ctx.fill();
		}

		for (let i = 0; i < 20; i++) {
			const rotation = (i * 2 * Math.PI) / 20 + initialRotation;
			const xOffset = Math.cos(rotation) * 30;
			const yOffset = Math.sin(rotation) * 30;

			ctx.beginPath();
			ctx.fillStyle = palette.leaf;
			tilingElipse(ctx, x + xOffset, y + yOffset, 2, 2, rotation);
			ctx.fill();
		}
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
			return { x: random() * size, y: random() * size };
		});
		const positions = filterMinDistance(candidates, minDistance);

		positions.forEach((p) => {
			tilingLeaf(ctx, p.x, p.y, random() * Math.PI * 2);
			tilingLeaf(ctx, p.x, p.y, random() * Math.PI * 2);
		});

		positions.forEach((p) => {
			tilingFlower(ctx, p.x, p.y);
		});
	}
</script>

<canvas height={size} width={size} bind:this={canvas} />

<style>
    canvas {
        width: 100%;
    }
</style>
