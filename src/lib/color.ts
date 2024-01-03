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
