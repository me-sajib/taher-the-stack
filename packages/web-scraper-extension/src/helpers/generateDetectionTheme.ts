import { detectionStyles } from '../extensionStyle';
import {
  HSL,
  StyleSchema
} from '../interfaces/extension';
import createHsl from '../utils/createHSL';
import colorPalate from './colorPalate';

const createColorVariants = (
  color: HSL
): { [key: string]: string } => ({
  detected: createHsl(color, 65),
  selected: createHsl(color),
  suggested: createHsl(color, 45),
  paginated: createHsl(
    colorPalate.exceptCurrentItem
  )
});

const generateDetectionTheme = (
  color: HSL
): StyleSchema[] => {
  const colorVariants =
    createColorVariants(color);

  return detectionStyles.map(
    (schema: StyleSchema) => {
      const value =
        schema.attr?.value ?? '';

      if (value in colorVariants) {
        return {
          ...schema,
          styles: {
            ...schema.styles,
            backgroundColor: `${colorVariants[value]} !important`,
            outlineColor: `${colorVariants[value]} !important`
          }
        };
      }

      return schema;
    }
  );
};

export default generateDetectionTheme;
