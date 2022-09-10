import FormProvider from '@components/hook-form/FormProvider';
import { LoadingButton } from '@mui/lab';
import { Stack } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { SubmitHandler, useForm } from 'react-hook-form';
import RHFTextField from './hook-form/RHFTextFiled';

interface ProxyModalData {
  host: string;
  port: number;
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
  onSubmit,
}: ProxyModalTypes) {
  const defaultFormState = formState ?? {
    host: '',
    port: '',
    country: '',
  };

  const methods = useForm({
    defaultValues: defaultFormState,
  });
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{actionType.trim()} proxy</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Input all valid fields for {actionType.trim().toLowerCase()} proxy
        </DialogContentText>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={3} sx={{ my: 3 }}>
            <RHFTextField
              autoFocus
              margin="dense"
              id="host"
              name="host"
              label="Host address"
              type="text"
              fullWidth
              variant="standard"
            />
            <RHFTextField
              margin="dense"
              id="port"
              name="port"
              label="Port"
              type="number"
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
            <Button onClick={handleClose}>Cancel</Button>
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
