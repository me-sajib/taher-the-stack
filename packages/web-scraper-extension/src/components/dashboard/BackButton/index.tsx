import restoreElements from '../../../helpers/restoreElements';
import icon from '../../../icon';
import addClass from '../../../utils/addClass';
import styles from './index.module.css';

interface BackButtonPropTypes {
  classes?: string;
  clickAction?: () => void;
}
const BackButton = ({
  classes,
  clickAction
}: BackButtonPropTypes) => (
  <span
    className={addClass(styles.backButton, classes)}
    onClick={clickAction ?? restoreElements}
  >
    {icon['back']}
  </span>
);

export default BackButton;
