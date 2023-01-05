import { HSL } from '../interfaces/extension';

const createHsl = ({ h, s, l }: HSL, alpha = 100) =>
  `hsla(${h}deg ${s}% ${l}% / ${alpha}%)`;

export default createHsl;
