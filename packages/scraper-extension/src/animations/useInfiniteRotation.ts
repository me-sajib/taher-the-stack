import { useSpring } from '@react-spring/web';

const useInfiniteRotation = () =>
  useSpring({
    from: { rotate: 0 },
    to: { rotate: 360 },
    loop: true,
    config: {
      duration: 1200
    }
  });

export default useInfiniteRotation;
