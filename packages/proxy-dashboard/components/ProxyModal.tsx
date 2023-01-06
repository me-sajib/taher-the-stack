import { SubmitHandler, useForm } from 'react-hook-form';
import { Button, Modal } from '.';
import validator from '../validator';
import FormProvider from './hook-form/FormProvider';
import RHFPasswordField from './hook-form/RHFPasswordField';
import RHFTextField from './hook-form/RHFTextFiled';

interface ProxyModalData {
  host: string;
  port: number;
  username: string;
  password: string;
  country: string;
}

interface ProxyModalTypes {
  actionType: 'Add' | 'Update';
  modalId: string;
  formState?: ProxyModalData;
  onSubmit: SubmitHandler<ProxyModalData>;
}

export default function ProxyModal({
  actionType,
  formState,
  modalId,
  onSubmit
}: ProxyModalTypes) {
  const defaultFormState: ProxyModalData = formState ?? {
    host: '',
    port: NaN,
    username: '',
    password: '',
    country: ''
  };

  const methods = useForm({
    defaultValues: defaultFormState
  });
  const {
    handleSubmit,
    formState: { isSubmitting }
  } = methods;

  return (
    <Modal
      title={`${actionType.trim()} proxy`}
      description={`Input all valid fields for ${actionType
        .trim()
        .toLowerCase()} proxy`}
      modalId={modalId}
    >
      {() => (
        <FormProvider
          methods={methods}
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col gap-3 py-5">
            <RHFTextField
              required
              id="host"
              name="host"
              placeholder="Host address"
              type="text"
              rules={validator.host}
            />

            <RHFTextField
              required
              id="port"
              name="port"
              placeholder="Port"
              type="number"
              rules={validator.port}
            />
            <RHFTextField
              id="username"
              name="username"
              placeholder="Username"
              type="text"
            />

            <RHFPasswordField
              id="password"
              name="password"
              placeholder="Password"
            />

            <RHFTextField
              id="country"
              name="country"
              placeholder="Country"
              type="text"
            />

            <Button
              type="submit"
              text={actionType}
              classes="mt-2"
              conditionClasses={{
                'btn-loading': isSubmitting
              }}
            />
          </div>
        </FormProvider>
      )}
    </Modal>
  );
}
