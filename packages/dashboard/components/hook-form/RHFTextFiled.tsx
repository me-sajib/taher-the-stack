// form
import {
  Controller,
  RegisterOptions,
  useFormContext
} from 'react-hook-form';
// @mui
import { TextField } from '@mui/material';

interface RHFTextFieldTypes {
  name: string;
  rules?: RegisterOptions;
  [key: string]: any;
}

const RHFTextField = ({
  name,
  rules,
  ...other
}: RHFTextFieldTypes) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({
        field,
        fieldState: { error }
      }) => (
        <TextField
          {...field}
          fullWidth
          value={
            typeof field.value ===
              'number' &&
            field.value === 0
              ? ''
              : field.value
          }
          error={!!error}
          helperText={error?.message}
          {...other}
        />
      )}
      rules={rules}
    />
  );
};

export default RHFTextField;
