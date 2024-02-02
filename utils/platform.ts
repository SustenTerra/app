import { Platform } from 'react-native';

export const isWeb = Platform.OS === 'web';

export function webOnlyCSS(stylesString: string | TemplateStringsArray) {
  return isWeb ? stylesString : '';
}
