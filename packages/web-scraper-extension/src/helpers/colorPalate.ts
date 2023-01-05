import { COLOR_PALATE } from '../global';
import { HSL } from '../interfaces/extension';
import hexToHsl from '../utils/hexToHsl';
import ListController from '../utils/ListController';

export default new ListController<HSL>(COLOR_PALATE.map(hexToHsl));
