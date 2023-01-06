import addClass from '../../../utils/addClass';
import styles from './index.module.css';

interface TinyButtonPropTypes {
  classes?: string;
  innerText: string;
  children?: JSX.Element | boolean;
  disable?: boolean;
  clickHandler: React.MouseEventHandler<HTMLButtonElement>;
}

const TinyButton = ({
  classes,
  innerText,
  children,
  disable,
  clickHandler
}: TinyButtonPropTypes) => (
  <button
    type="button"
    onClick={clickHandler}
    className={addClass(
      styles.button,
      classes,
      disable && styles.disableButton
    )}
    disabled={disable}
  >
    {children}
    {innerText}
  </button>
);

export default TinyButton;
