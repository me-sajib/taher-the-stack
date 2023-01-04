import {
  animated,
  easings,
  Spring,
  useTransition
} from '@react-spring/web';
import {
  Children,
  RefObject
} from 'react';
import useBounce from '../../../animations/useBounce';
import colorPalate from '../../../helpers/colorPalate';
import { Select } from '../../../interfaces/extension';
import createHsl from '../../../utils/createHSL';
import Button from '../../Button';
import CountBubble from '../CountBubble';

interface SelectorButtonsPropTypes {
  inputRef: RefObject<HTMLInputElement>;
  scrapeSelectorList: Select[];
  currentSelector: Select;
  prevSaveCount: number;
  saveSelectorHandler: () => void;
  clearButtonHandler: () => void;
}

const SelectorButtons = ({
  inputRef,
  scrapeSelectorList,
  currentSelector,
  prevSaveCount,
  saveSelectorHandler,
  clearButtonHandler
}: SelectorButtonsPropTypes) => {
  const hasValidUid: boolean = Boolean(
    currentSelector.uid
  );
  const isPrevCurrentCountSame: boolean =
    prevSaveCount ===
    scrapeSelectorList.length;

  const currentBubbleTransition =
    useTransition(!hasValidUid, {
      from: { scale: 0 },
      enter: [
        { scale: 0 },
        { scale: 1 }
      ],
      config: {
        duration: 250
      },
      reset: !isPrevCurrentCountSame
    });
  const bounce = useBounce();

  return (
    <div className="selector-buttons">
      {Children.toArray(
        scrapeSelectorList.map(
          ({
            uid,
            totalCount,
            color
          }) => {
            const isSelected =
              currentSelector.uid ===
              uid;

            return (
              <CountBubble
                propInputRef={inputRef}
                uid={uid}
                styles={Object.assign(
                  {
                    backgroundColor:
                      createHsl(color)
                  },
                  isSelected
                    ? bounce
                    : { opacity: 0.55 }
                )}
                isSelected={isSelected}
                resultCount={
                  hasValidUid &&
                  isSelected
                    ? currentSelector.totalCount
                    : totalCount
                }
              />
            );
          }
        )
      )}

      {currentBubbleTransition(
        (styles, invalidUid) =>
          invalidUid && (
            <CountBubble
              styles={Object.assign(
                styles,
                isPrevCurrentCountSame &&
                  bounce,
                {
                  backgroundColor:
                    createHsl(
                      colorPalate.current
                    )
                }
              )}
              uid={currentSelector.uid}
              resultCount={
                currentSelector.totalCount
              }
            />
          )
      )}

      <Spring
        from={{
          x: '-25px',
          rotate: '-45deg',
          opacity: 0
        }}
        to={{
          x: '0px',
          rotate: '0deg',
          opacity: 1
        }}
        config={{
          duration: 300,
          easing: easings.easeInSine
        }}
        reset={
          prevSaveCount <
          scrapeSelectorList.length
        }
      >
        {(styles: any) => (
          <animated.div style={styles}>
            <Button
              classes="scraper-button"
              status={
                hasValidUid
                  ? 'save'
                  : currentSelector.totalCount
                  ? 'done'
                  : 'add'
              }
              clickAction={
                saveSelectorHandler
              }
            />
          </animated.div>
        )}
      </Spring>

      {Boolean(
        currentSelector.totalCount
      ) && (
        <Button
          classes={'scraper-button'}
          status={'clear'}
          clickAction={
            clearButtonHandler
          }
        />
      )}
    </div>
  );
};

export default SelectorButtons;
