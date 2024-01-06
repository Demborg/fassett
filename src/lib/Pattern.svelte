<script lang="ts">
	import { onMount } from 'svelte';
	import { defaultPalette, type Palette } from './color';
	import { splitmix32 } from './random';
	const nFlowers = 1000;
	const size = 1000;
	export let seed: number = 42;
	export let palette: Palette = defaultPalette;
	let canvas: HTMLCanvasElement;
	let random: () => number;

	type Point = { x: number; y: number, scale: number };

	$: draw(seed, palette);

	onMount(() => {
		random = splitmix32(seed);
		draw(seed, palette);
	});

	function tilingCall(fn: (x: number, y: number) => void, x: number, y: number) {
		const offsets = [-size, 0, size];
		offsets.forEach((dx) => {
			offsets.forEach((dy) => {
				fn(x + dx, y + dy);
			});
		});
	}

	function tilingCircle(ctx: CanvasRenderingContext2D, x: number, y: number, r: number) {
        tilingElipse(ctx, x, y, r, r, random() * 2 * Math.PI)
	}

    function jitter() {
        return random() * 2 -1
    }

	function tilingElipse(
		ctx: CanvasRenderingContext2D,
		x: number,
		y: number,
		a: number,
		b: number,
		rotation: number
	) {
        x += jitter() * 2;
        y += jitter() * 2;
        a *= (1 + jitter() * 0.1)
        b *= (1 + jitter() * 0.1)
        rotation += jitter() * 1 / (2 * Math.PI)
		tilingCall(
			(x, y) => {
				ctx.moveTo(x, y);
				ctx.ellipse(x, y, a, b, rotation, 0, 2 * Math.PI);
			},
			x,
			y
		);
	}

	function tilingLeaf(ctx: CanvasRenderingContext2D, x: number, y: number, rotation: number, scale: number) {
        scale = scale / 100;
		const xOffset = Math.cos(rotation) * 100 * scale;
		const yOffset = Math.sin(rotation) * 100 * scale;

		ctx.beginPath();
		ctx.fillStyle = palette.leaf;
		tilingElipse(ctx, x + xOffset, y + yOffset, 50 * scale, 25 * scale, rotation);
		ctx.fill();

		ctx.beginPath();
		ctx.fillStyle = palette.detail1;
		tilingElipse(ctx, x + xOffset, y + yOffset, 40 * scale, 5 * scale, rotation);
		ctx.fill();
	}

	function tilingFlower(ctx: CanvasRenderingContext2D, x: number, y: number, scale: number) {
		const initialRotation = random() * Math.PI * 2;
        scale = scale / 100
		for (let i = 0; i < 5; i++) {
			const rotation = (i * 2 * Math.PI) / 5 + initialRotation;
			const xOffset = Math.cos(rotation) * 50 * scale;
			const yOffset = Math.sin(rotation) * 50 * scale;

			ctx.beginPath();
			ctx.fillStyle = palette.petal;
			tilingElipse(ctx, x + xOffset, y + yOffset, 50 * scale, 50 * scale, rotation);
			ctx.fill();
		}

		ctx.beginPath();
		ctx.fillStyle = palette.detail1;
		tilingCircle(ctx, x, y, 40 * scale);
		ctx.fill();

		ctx.beginPath();
		ctx.fillStyle = palette.detail2;
		tilingCircle(ctx, x, y, 10 * scale);
		ctx.fill();

		ctx.beginPath();
		ctx.fillStyle = palette.leaf;
		tilingCircle(ctx, x, y, 5 * scale);
		ctx.fill();

		for (let i = 0; i < 15; i++) {
			const rotation = (i * 2 * Math.PI) / 15 + initialRotation;
			const xOffset = Math.cos(rotation) * 20 * scale;
			const yOffset = Math.sin(rotation) * 20 * scale;

			ctx.beginPath();
			ctx.fillStyle = palette.leaf;
			tilingCircle(ctx, x + xOffset, y + yOffset, 2 * scale);
			ctx.fill();
		}

		for (let i = 0; i < 20; i++) {
			const rotation = (i * 2 * Math.PI) / 20 + initialRotation;
			const xOffset = Math.cos(rotation) * 30 * scale;
			const yOffset = Math.sin(rotation) * 30 * scale;

			ctx.beginPath();
			ctx.fillStyle = palette.leaf;
			tilingCircle(ctx, x + xOffset, y + yOffset, 2 * scale);
			ctx.fill();
		}
	}

	function distance(a: Point, b: Point): number {
		return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2)) / (a.scale + b.scale);
	}

	function minTilingDistance(a: Point, b: Point): number {
		let offsets = [-size, 0, size];
		return Math.min(
			...offsets.map((dx) =>
				Math.min(...offsets.map((dy) => distance(a, { x: b.x + dx, y: b.y + dy, scale: b.scale })))
			)
		);
	}

	function filterMinDistance(positions: Point[]): Point[] {
		return positions.reduce(
			(filtered: Point[], incomming: Point) =>
				filtered.some((old: Point) => minTilingDistance(old, incomming) < 1)
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
			return { x: random() * size, y: random() * size, scale: random() * 100 + 100};
		});
		const positions = filterMinDistance(candidates);

		positions.forEach((p) => {
			tilingLeaf(ctx, p.x, p.y, random() * Math.PI * 2, p.scale);
			tilingLeaf(ctx, p.x, p.y, random() * Math.PI * 2, p.scale);
		});

		positions.forEach((p) => {
			tilingFlower(ctx, p.x, p.y, p.scale);
		});
	}
</script>

<canvas height={size} width={size} bind:this={canvas} />

<style>
	canvas {
		width: 100%;
	}
</style>
