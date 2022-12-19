// form
import {
  Controller,
  useFormContext
} from 'react-hook-form';
// @mui
import {
  Checkbox,
  FormControlLabel
} from '@mui/material';

const HFCheckbox = ({
  name,
  ...other
}) => {
  const { control } = useFormContext();

  return (
    <FormControlLabel
      label={name}
      id={name}
      control={
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <Checkbox
              {...field}
              checked={field.value}
            />
          )}
        />
      }
      {...other}
    />
  );
};

export default HFCheckbox;
