// form
import {
  Controller,
  RegisterOptions,
  useFormContext
} from 'react-hook-form';
// @mui
import clsx from 'clsx';
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
        <div className="mb-4">
          <input
            className={clsx(
              'input-block input text-black',
              {
                'input-ghost-primary':
                  !error,
                'input-ghost-error':
                  error
              }
            )}
            {...field}
            {...other}
          />
          {error?.message && (
            <span className="font-bold text-sm text-red-500 mt-1 ml-1 inline-block">
              {error.message}
            </span>
          )}
        </div>
      )}
      rules={rules}
    />
  );
};

export default RHFTextField;
