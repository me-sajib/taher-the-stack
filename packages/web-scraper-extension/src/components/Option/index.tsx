import addClass from '../../utils/addClass';
import styles from './index.module.css';

interface OptionPropTypes {
  index: number;
  isFocused: boolean;
  selected: boolean;
  innerValue: string;
  clickHandler: () => void;
  setFocusIndex: (index: number) => void;
}

const Option = ({
  index,
  isFocused,
  selected,
  innerValue,
  clickHandler,
  setFocusIndex
}: OptionPropTypes) => {
  const mouseEnterHandler = () => setFocusIndex(index);
  const mouseLeaveHandler = () => setFocusIndex(index);

  const conditionalStyles = [
    selected && styles.active,
    isFocused &&
      (selected ? styles.hoverSelected : styles.hoverNotSelected),
    !isFocused && selected && styles.active
  ];

  return (
    <li
      className={addClass(styles.container, ...conditionalStyles)}
      onMouseEnter={mouseEnterHandler}
      onMouseLeave={mouseLeaveHandler}
      onClick={clickHandler}
    >
      <span className={styles.option}>{innerValue}</span>

      {isFocused &&
        (selected ? (
          <span className={styles.hoverSelectedText}>
            Press Enter for remove
          </span>
        ) : (
          <span className={styles.hoverSelectedText}>
            Press Enter for select
          </span>
        ))}

      {!isFocused && selected && (
        <span className={styles.selectedText}>Selected</span>
      )}
    </li>
  );
};

export default Option;
