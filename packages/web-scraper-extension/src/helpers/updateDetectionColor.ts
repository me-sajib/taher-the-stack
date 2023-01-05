import { DETECTION_STYLE_ID } from '../global';
import { HSL } from '../interfaces/extension';
import { $, generateCSS } from '../utils/scrapeHelpers';
import generateDetectionTheme from './generateDetectionTheme';

const updateDetectionColor = (color: HSL) => {
  const css = generateCSS(generateDetectionTheme(color));

  ($(`#${DETECTION_STYLE_ID}`) as HTMLStyleElement).innerText =
    css.innerText;
};

export default updateDetectionColor;
