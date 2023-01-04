import { animated } from '@react-spring/web';
import { useRef } from 'react';
import useNumberTransition from '../../../animations/useNumberTransition';
import useCountBubble from '../../../hooks/useCountBubble';
import Button from '../../Button';

interface CountBubblePropTypes {
  propInputRef?: React.RefObject<HTMLInputElement>;
  isSelected?: boolean;
  uid: string;
  classes?: string;
  styles?: any;
  resultCount: number;
}

const CountBubble = ({
  propInputRef,
  isSelected = true,
  uid,
  styles,
  resultCount
}: CountBubblePropTypes) => {
  const {
    isMouseEnter,
    mouseEnterHandler,
    mouseLeaveHandler,
    deleteActionHandler,
    propNameClickHandler
  } = useCountBubble(uid, propInputRef);

  const prevResultCount: React.MutableRefObject<number> =
    useRef<number>(0);
  const number = useNumberTransition(
    resultCount,
    prevResultCount
  );

  return (
    <animated.div
      className={'wrapper'}
      onClick={propNameClickHandler}
      onMouseEnter={mouseEnterHandler}
      onMouseLeave={mouseLeaveHandler}
      style={styles}
    >
      <animated.p
        className={'prop-name'}
      >
        {isSelected
          ? number.to(Math.floor)
          : resultCount}
      </animated.p>

      {isMouseEnter && uid && (
        <Button
          status={'exit'}
          classes={'delete-action'}
          clickAction={
            deleteActionHandler
          }
        />
      )}
    </animated.div>
  );
};

export default CountBubble;
