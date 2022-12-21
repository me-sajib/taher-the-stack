import { LoadingButton } from '@mui/lab';
import { Stack } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormProvider from 'packages/dashboard/components/hook-form/FormProvider';
import validator from 'packages/dashboard/validator';
import {
  SubmitHandler,
  useForm
} from 'react-hook-form';
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
  open: boolean;
  actionType: 'Add' | 'Update';
  formState?: ProxyModalData;
  onSubmit: SubmitHandler<ProxyModalData>;
  handleClose: () => void;
}

export default function ProxyModal({
  open,
  actionType,
  formState,
  handleClose,
  onSubmit
}: ProxyModalTypes) {
  const defaultFormState: ProxyModalData =
    formState ?? {
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
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="xs"
    >
      <DialogTitle>
        {actionType.trim()} proxy
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Input all valid fields for{' '}
          {actionType
            .trim()
            .toLowerCase()}{' '}
          proxy
        </DialogContentText>
        <FormProvider
          methods={methods}
          onSubmit={handleSubmit(
            onSubmit
          )}
        >
          <Stack
            spacing={3}
            sx={{ my: 3 }}
          >
            <RHFTextField
              autoFocus
              required
              margin="dense"
              id="host"
              name="host"
              label="Host address"
              type="text"
              fullWidth
              variant="standard"
              rules={validator.host}
            />
            <RHFTextField
              required
              margin="dense"
              id="port"
              name="port"
              label="Port"
              type="number"
              fullWidth
              variant="standard"
              rules={validator.port}
            />
            <RHFTextField
              margin="dense"
              id="username"
              name="username"
              label="Username"
              type="text"
              fullWidth
              variant="standard"
            />

            <RHFPasswordField
              margin="dense"
              id="password"
              name="password"
              label="Password"
              fullWidth
              variant="standard"
            />
            <RHFTextField
              margin="dense"
              id="country"
              name="country"
              label="Country"
              type="text"
              fullWidth
              variant="standard"
            />
          </Stack>

          <DialogActions>
            <Button
              onClick={handleClose}
            >
              Cancel
            </Button>
            <LoadingButton
              type="submit"
              variant="contained"
              loading={isSubmitting}
            >
              {actionType}
            </LoadingButton>
          </DialogActions>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
