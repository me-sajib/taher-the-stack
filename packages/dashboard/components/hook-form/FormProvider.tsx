// form
import { FormProvider as Form } from 'react-hook-form';

interface FormProviderTypes {
  children: JSX.Element | JSX.Element[];
  methods: any;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
}

const FormProvider = ({
  children,
  onSubmit,
  methods
}: FormProviderTypes) => (
  <Form {...methods}>
    <form onSubmit={onSubmit}>
      {children}
    </form>
  </Form>
);

export default FormProvider;
