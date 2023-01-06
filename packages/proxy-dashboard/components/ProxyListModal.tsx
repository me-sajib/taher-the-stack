import { Button, Modal } from 'packages/proxy-dashboard/components';
import { getProxyListError } from 'packages/proxy-dashboard/store/proxyListSlice';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import validator from '../validator';
import FormProvider from './hook-form/FormProvider';
import RHFPasswordField from './hook-form/RHFPasswordField';
import RHFTextField from './hook-form/RHFTextFiled';
// import RHFPasswordField from './hook-form/RHFPasswordField';

interface ProxyModalData {
  name: string;
  username: string;
  password: string;
  userId?: string;
}

interface ProxyListModalTypes {
  actionType: 'Add' | 'Update';
  modalId: string;
  formState?: ProxyModalData;
  onSubmit: SubmitHandler<ProxyModalData>;
}

export default function ProxyListModal({
  actionType,
  formState,
  modalId,
  onSubmit
}: ProxyListModalTypes) {
  const proxyListError = useSelector(getProxyListError);
  const defaultFormState = formState ?? {
    name: '',
    username: '',
    password: ''
  };

  const methods = useForm({
    defaultValues: defaultFormState
  });
  const {
    handleSubmit,
    setError,
    formState: { isSubmitting }
  } = methods;

  useEffect(() => {
    proxyListError.forEach((error) => {
      const [propName] = error.message.split(/\s/);

      setError(propName as keyof ProxyModalData, {
        message: error.message
      });
    });
  }, [proxyListError]);

  return (
    <Modal
      title={`${actionType.trim()} proxy list`}
      description={`Input all valid fields for ${actionType
        .trim()
        .toLowerCase()} proxy list`}
      modalId={modalId}
    >
      {() => {
        // TODO: After successful submission the modal should automatically close. process -> create another component which will take ref isSuccessfulSubmission status & handle it through useEffect

        return (
          <FormProvider
            methods={methods}
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col gap-3 py-5">
              <RHFTextField
                id="name"
                name="name"
                placeholder="List name"
                type="text"
                rules={validator.name}
              />
              <RHFTextField
                id="username"
                name="username"
                placeholder="username"
                type="text"
                rules={{
                  ...validator.username,
                  required: false
                }}
              />
              <RHFPasswordField
                id="password"
                name="password"
                placeholder="password"
                rules={{
                  ...validator.password,
                  required: false
                }}
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
        );
      }}
    </Modal>
  );
}
