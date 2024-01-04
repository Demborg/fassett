export type Color = string;
export type Palette = {
	background: Color;
	petal: Color;
	leaf: Color;
	detail1: Color;
	detail2: Color;
	name: string;
};

export const defaultPalette: Palette = {
	background: '#6d79a4',
	petal: '#ffffff',
	leaf: '#373557',
	detail1: '#adb8d0',
	detail2: '#96a0c0',
	name: 'blue'
};

function lerp(a: number, b: number, t: number) {
	return a + t * (b - a);
}

function nameHSL(hueDeg: number, saturationPercent: number, lightnessPercent: number) {
	const index = Math.round((hueDeg % 360) / 30);
	const colors = [
		'red',
		'orange',
		'yellow',
		'chartreuse',
		'green',
		'spring green',
		'cyan',
		'azure',
		'blue',
		'purple',
		'magenta',
		'pink',
		'red'
	];
	return colors[index];
}

export function makePalette(): Palette {
	const hue = Math.random() * 360;
	const lightest = 50 + Math.random() * 50;
	const darkest = Math.random() * (100 - lightest);
	const saturation = 50 + Math.random() * 50;
	let leafHue = hue;
	let leafLightness = darkest;
	let bgHue = hue;
	let bgLightness = lerp(lightest, darkest, 0.75);

	const flipp = Math.random();
	if (flipp > 0.66) {
		leafHue = hue + 180;
		leafLightness = lerp(lightest, darkest, 0.5);
		if (lerp(lightest, darkest, -0.25) < 100 && Math.random() > 0.3) {
			bgLightness = lerp(lightest, darkest, -0.25);
		}
	} else if (flipp > 0.33) {
		bgHue = hue + 180;
	}

	return {
		petal: `hsl(${hue}deg, ${saturation}%, ${lightest}%)`,
		detail1: `hsl(${hue}deg, ${saturation}%, ${lerp(lightest, darkest, 0.25)}%)`,
		detail2: `hsl(${hue}deg, ${saturation}%, ${lerp(lightest, darkest, 0.5)}%)`,
		background: `hsl(${bgHue}deg, ${saturation}%, ${bgLightness}%)`,
		leaf: `hsl(${leafHue}deg, ${saturation}%, ${leafLightness}%)`,
		name: nameHSL(hue, saturation, lerp(lightest, darkest, 0.5))
	};
}
