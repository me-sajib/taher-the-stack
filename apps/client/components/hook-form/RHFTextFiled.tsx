// form
import { Controller, useFormContext } from 'react-hook-form';
// @mui
import { TextField } from '@mui/material';

interface RHFTextFieldTypes {
  name: string;
  [key: string]: any;
}

const RHFTextField = ({ name, ...other }: RHFTextFieldTypes) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          fullWidth
          value={
            typeof field.value === 'number' && field.value === 0
              ? ''
              : field.value
          }
          error={!!error}
          helperText={error?.message}
          {...other}
        />
      )}
    />
  );
};

export default RHFTextField;
