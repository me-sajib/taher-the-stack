import React, {
  ChangeEvent,
  forwardRef,
  useEffect,
  useId,
  useState
} from 'react';
import styles from './index.module.css';

interface InputTextPropTypes {
  name?: string;
  label?: string;
  placeholder?: string;
  passedValue?: string;
  style?: React.CSSProperties;
  changeModifier?: (
    value: string
  ) => string;
  liftValueOnChange?: React.ChangeEventHandler<HTMLInputElement>;
  liftValueOnBlur?: React.FocusEventHandler<HTMLInputElement>;
  liftValueOnKeyDown?: (
    value: string
  ) => React.KeyboardEventHandler<HTMLInputElement>;
}

const InputText = (
  {
    name,
    label,
    placeholder,
    passedValue,
    style,
    changeModifier,
    liftValueOnChange,
    liftValueOnBlur,
    liftValueOnKeyDown
  }: InputTextPropTypes,
  ref: React.ForwardedRef<any>
) => {
  const [value, setValue] =
    useState<string>(passedValue ?? '');
  const id: string = useId();

  useEffect(() => {
    setValue(passedValue as string);
  }, [passedValue]);

  const changeHandler =
    (cb?: (value: string) => string) =>
    (
      e: ChangeEvent<HTMLInputElement>
    ) => {
      const { value } = e.target;
      setValue(
        typeof cb === 'function'
          ? cb(value)
          : value
      );
      liftValueOnChange &&
        liftValueOnChange(e);
    };

  const blurHandler = (
    e: React.FocusEvent<HTMLInputElement>
  ) =>
    liftValueOnBlur &&
    liftValueOnBlur(e);

  return (
    <div
      ref={ref}
      className={styles.container}
    >
      <label
        htmlFor={id}
        className={styles.label}
      >
        {label}
      </label>
      <input
        style={style}
        name={name}
        className={styles.input}
        type="text"
        {...{ id, placeholder, value }}
        onChange={changeHandler(
          changeModifier
        )}
        onBlur={blurHandler}
        onKeyDown={
          liftValueOnKeyDown
            ? liftValueOnKeyDown(value)
            : () => null
        }
      />
    </div>
  );
};

export default forwardRef(InputText);
