import { easings, useSpring } from '@react-spring/web';

const useBounce = () =>
  useSpring({
    to: [{ scale: 0.8 }, { scale: 1.1 }, { scale: 1 }],
    config: {
      duration: 125,
      easing: easings.easeInExpo
    }
  });

export default useBounce;
