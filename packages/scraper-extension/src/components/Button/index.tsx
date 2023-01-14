import icon from '../../icon';
import addClass from '../../utils/addClass';

type ActionStatus =
  | 'add'
  | 'exit'
  | 'done'
  | 'edit'
  | 'undo'
  | 'save'
  | 'delete'
  | 'clear'
  | 'close'
  | 'next'
  | 'infinite';

interface ButtonPropTypes {
  innerText?: string;
  classes?: string;
  status?: ActionStatus;
  clickAction: React.MouseEventHandler<HTMLButtonElement>;
  children?: JSX.Element | boolean;
}

const Button = ({
  innerText = '',
  classes,
  status,
  children,
  clickAction
}: ButtonPropTypes) => (
  <button
    type="button"
    className={addClass(classes!, 'scrape-button')}
    onClick={clickAction}
  >
    {children}
    {status ? icon[status] : innerText}
  </button>
);

export default Button;
