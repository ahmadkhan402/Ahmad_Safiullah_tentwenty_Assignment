import { Dimensions, PixelRatio } from "react-native";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const widthBaseScale: number = SCREEN_WIDTH / 375;
const heightBaseScale: number = SCREEN_HEIGHT / 812;

function normalize(size: number, based: 'width' | 'height' = 'width'): number {
    const newSize =
        based === 'height' ? size * heightBaseScale : size * widthBaseScale;

    return Math.round(PixelRatio.roundToNearestPixel(newSize));
}

export const heightPixel = (size: number): number => {
    return normalize(size, 'height');
};

export const widthPixel = (size: number): number => {
    return normalize(size, 'width');
};

export const font = (size: number): number => {
    return heightPixel(size);
};