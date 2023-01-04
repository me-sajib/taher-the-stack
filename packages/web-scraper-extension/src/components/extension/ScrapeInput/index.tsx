import {
  ChangeEvent,
  forwardRef,
  LegacyRef,
  useEffect,
  useState
} from 'react';

interface ScrapeInputPropTypes {
  placeholder: string;
  value: string;
  liftValue: (value: string) => void;
}

const ScrapeInput = (
  {
    placeholder,
    value,
    liftValue
  }: ScrapeInputPropTypes,
  ref: LegacyRef<HTMLInputElement>
) => {
  const [currentValue, setValue] =
    useState(value);

  useEffect(() => {
    setValue(value);
  }, [value]);

  const blurHandler = () => {
    liftValue(currentValue);
  };

  const changeHandler = (
    e: ChangeEvent<HTMLInputElement>
  ) => setValue(e.target.value);

  return (
    <input
      ref={ref}
      type="text"
      className="prop-name-input"
      value={currentValue}
      placeholder={placeholder}
      onChange={changeHandler}
      onBlur={blurHandler}
    />
  );
};

export default forwardRef(ScrapeInput);
