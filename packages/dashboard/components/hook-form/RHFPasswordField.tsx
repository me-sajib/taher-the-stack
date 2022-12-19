import {
  IconButton,
  InputAdornment
} from '@mui/material';
import { useState } from 'react';
import RHFTextField from './RHFTextFiled';
import Iconify from '../Iconify';

interface RHFPasswordFieldTypes {
  [key: string]: unknown;
}

const RHFPasswordField = ({
  ...others
}: RHFPasswordFieldTypes) => {
  const [
    showPassword,
    setShowPassword
  ] = useState<boolean>(false);
  const toggleShowPassword = () =>
    setShowPassword(!showPassword);

  return (
    <RHFTextField
      name="password"
      label="Password"
      type={
        showPassword
          ? 'text'
          : 'password'
      }
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              onClick={
                toggleShowPassword
              }
              edge="end"
            >
              <Iconify
                icon={
                  showPassword
                    ? 'eva:eye-fill'
                    : 'eva:eye-off-fill'
                }
              />
            </IconButton>
          </InputAdornment>
        )
      }}
      {...others}
    />
  );
};

export default RHFPasswordField;
