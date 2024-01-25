import { Dimensions, Platform } from 'react-native';

const isWeb = Platform.OS === 'web';
const dimensions = Dimensions.get('window');

const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

const width = isWeb ? guidelineBaseWidth : dimensions.width;
const height = isWeb ? guidelineBaseHeight : dimensions.height;

export const horizontalScale = (size: number) =>
  (width / guidelineBaseWidth) * size;
export const verticalScale = (size: number) =>
  (height / guidelineBaseHeight) * size;
export const moderateScale = (size: number, factor = 0.5) =>
  size + (horizontalScale(size) - size) * factor;
