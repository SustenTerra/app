import { Dimensions, Platform } from 'react-native';

const isWeb = Platform.OS === 'web';
const dimensions = Dimensions.get('window');

const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

export const width = isWeb && dimensions.width > 500 ? 500 : dimensions.width;
export const height =
  isWeb && dimensions.height > guidelineBaseHeight
    ? guidelineBaseHeight
    : dimensions.height;

const widthForScale = isWeb ? guidelineBaseWidth : dimensions.width;
const heightForScale = isWeb ? guidelineBaseHeight : dimensions.height;

export const horizontalScale = (size: number) =>
  (widthForScale / guidelineBaseWidth) * size;
export const verticalScale = (size: number) =>
  (heightForScale / guidelineBaseHeight) * size;
export const moderateScale = (size: number, factor = 0.5) =>
  size + (horizontalScale(size) - size) * factor;
