// form
import { Controller, useFormContext } from 'react-hook-form';
// @mui
import { Checkbox, FormControlLabel } from '@mui/material';
import { useId } from 'react';

const HFCheckbox = ({ name, ...other }) => {
  const { control } = useFormContext();
  const id = useId();

  return (
    <FormControlLabel
      label={name}
      id={id}
      control={
        <Controller
          name={id}
          control={control}
          render={({ field }) => <Checkbox {...field} checked={field.value} />}
        />
      }
      {...other}
    />
  );
};

export default HFCheckbox;
