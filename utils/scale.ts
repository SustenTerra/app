import { Dimensions, Platform } from 'react-native';

const dimensions = Dimensions.get('window');

const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

const width = Platform.OS === 'web' ? guidelineBaseWidth : dimensions.width;
const height = Platform.OS === 'web' ? guidelineBaseHeight : dimensions.height;

export const horizontalScale = (size: number) =>
  (width / guidelineBaseWidth) * size;
export const verticalScale = (size: number) =>
  (height / guidelineBaseHeight) * size;
export const moderateScale = (size: number, factor = 0.5) =>
  size + (horizontalScale(size) - size) * factor;
