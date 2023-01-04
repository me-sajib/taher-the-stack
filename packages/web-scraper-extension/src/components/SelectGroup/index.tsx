import { KeyboardEvent, useEffect, useRef, useState } from 'react';
import icon from '../../icon';
import addClass from '../../utils/addClass';
import generateUid from '../../utils/generateUid';
import Option from '../Option';
import styles from './index.module.css';

interface SelectGroupPropTypes {
  options: string[];
  placeholder?: string;
  name?: string;
  id?: string;
  liftValue: (value: string) => void;
}

const SelectGroup = ({
  options,
  id,
  placeholder = 'Select an option',
  liftValue
}: SelectGroupPropTypes) => {
  const [selectValue, setSelectValue] = useState<string>(placeholder);
  const [open, setOpen] = useState<boolean>(false);
  const [focusIndex, setFocusIndex] = useState<number>(0);
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      ref.current!.focus();
    }
  }, [open]);

  const selectedChangeHandler = () => {
    const focusValue: string = options.at(focusIndex)!;

    if (focusValue === selectValue) {
      return setSelectValue(placeholder);
    }

    setSelectValue(focusValue);
    setOpen(false);

    liftValue(focusValue);
  };

  const focusHandler = () => setOpen(true);
  const clickOpenHandler = () => setOpen(!open);

  const keyboardHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    const { length } = options;

    switch (e.key) {
      case 'ArrowUp':
        return setFocusIndex((length + (focusIndex - 1)) % length);
      case 'ArrowDown':
        return setFocusIndex((focusIndex + 1) % length);
      case 'Enter':
        return selectedChangeHandler();
      case 'Escape':
        return setOpen(false);
    }
  };

  return (
    <div className={styles.container} id={id}>
      <div
        className={styles.labelContainer}
        onClick={clickOpenHandler}
      >
        <input
          ref={ref}
          type="text"
          className={styles.label}
          value={open ? placeholder : selectValue}
          onFocus={focusHandler}
          onKeyDown={keyboardHandler}
          onChange={() => null}
        />

        <button
          type="button"
          className={addClass(
            styles.expandButton,
            open && styles.rotateButton
          )}
        >
          {icon.triangle}
        </button>
      </div>
      {open && (
        <ul className={styles.optionContainer}>
          {options.map((optionValue, index) => (
            <Option
              key={generateUid()}
              index={index}
              isFocused={index === focusIndex}
              selected={optionValue === selectValue}
              innerValue={optionValue}
              clickHandler={selectedChangeHandler}
              setFocusIndex={setFocusIndex}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default SelectGroup;
