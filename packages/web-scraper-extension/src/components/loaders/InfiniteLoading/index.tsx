import { animated } from '@react-spring/web';
import useInfiniteRotation from '../../../animations/useInfiniteRotation';
import icon from '../../../icon';

const InfiniteLoading = () => {
  const infiniteRotation =
    useInfiniteRotation();

  return (
    <animated.span
      style={{
        marginRight: '5px',
        display: 'grid',
        placeItems: 'center',
        ...infiniteRotation
      }}
    >
      {icon['loading']}
    </animated.span>
  );
};

export default InfiniteLoading;
