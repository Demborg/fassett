export type Color = string;
export type Palette = {
	background: Color;
	petal: Color;
	leaf: Color;
	detail1: Color;
	detail2: Color;
};

export const defaultPalette: Palette = {
	background: '#6d79a4',
	petal: '#ffffff',
	leaf: '#373557',
	detail1: '#adb8d0',
	detail2: '#96a0c0'
};

function lerp(a:number, b:number, t: number) {
    return a + t * (b - a);
}

export function makePalette(): Palette {
    const hue = Math.random() * 360;
    const lightest = 50 + Math.random() * 50;
    const darkest = Math.random() * (100 - lightest);
    const saturation = 50  + Math.random() * 50;

    const leafHue = Math.random() > 0.5 ? hue : hue + 180

    return {
        petal: `hsl(${hue}deg, ${saturation}%, ${lightest}%)`,
        detail1: `hsl(${hue}deg, ${saturation}%, ${lerp(lightest, darkest, 0.25)}%)`,
        detail2: `hsl(${hue}deg, ${saturation}%, ${lerp(lightest, darkest, 0.5)}%)`,
        background: `hsl(${hue}deg, ${saturation}%, ${lerp(lightest, darkest, 0.75)}%)`,
        leaf: `hsl(${leafHue}deg, ${saturation}%, ${darkest}%)`
    }
}