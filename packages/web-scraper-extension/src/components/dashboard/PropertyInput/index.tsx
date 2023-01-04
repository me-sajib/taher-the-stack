import { useState } from 'react';
import Button from '../../Button';
import InputText from '../InputText';
import classes from './index.module.css';

interface PropertyInputPropTypes {
  id: string;
  isSelectorEdit: boolean;
  updateResultSchema: (
    id: string
  ) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
  deleteButtonHandler: (
    id: string
  ) => () => void;
  inputProps: any;
}

const PropertyInput = ({
  id,
  isSelectorEdit,
  updateResultSchema,
  deleteButtonHandler,
  inputProps
}: PropertyInputPropTypes) => {
  const [hover, setHover] =
    useState<boolean>(false);

  const enterHandler = () =>
    setHover(true);
  const leaveHandler = () =>
    setHover(false);

  return (
    <div
      key={id}
      className={classes.inputBox}
      onMouseEnter={enterHandler}
      onMouseLeave={leaveHandler}
    >
      <InputText
        liftValueOnBlur={updateResultSchema(
          id
        )}
        {...inputProps}
      />
      {!isSelectorEdit && hover && (
        <Button
          classes={classes.deleteButton}
          status="close"
          clickAction={deleteButtonHandler(
            id
          )}
        />
      )}
    </div>
  );
};

export default PropertyInput;
