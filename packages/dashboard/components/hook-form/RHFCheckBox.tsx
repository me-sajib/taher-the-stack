// form
import {
  Controller,
  useFormContext
} from 'react-hook-form';

const HFCheckbox = ({
  name,
  label
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <>
          <input
            type="checkbox"
            className="checkbox checkbox-bordered-primary mr-1 bg-transparent"
            checked={field.value}
            {...field}
          />
          <span>{label}</span>
        </>
      )}
    />
  );
};

export default HFCheckbox;
