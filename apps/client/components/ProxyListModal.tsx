import FormProvider from '@components/hook-form/FormProvider';
import { LoadingButton } from '@mui/lab';
import { Stack, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { SubmitHandler, useForm } from 'react-hook-form';

interface ProxyModalDefaultData {
  name: string;
  username: string;
  password: string;
}

interface ProxyListModalTypes {
  open: boolean;
  actionType: 'Add' | 'Update';
  formState?: ProxyModalDefaultData;
  onSubmit: SubmitHandler<ProxyModalDefaultData>;
  handleClose: () => void;
}

export default function ProxyListModal({
  open,
  actionType,
  formState,
  handleClose,
  onSubmit,
}: ProxyListModalTypes) {
  const defaultFormState = formState ?? {
    name: '',
    username: '',
    password: '',
  };

  const methods = useForm({ defaultValues: defaultFormState });
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{actionType.trim()} proxy list</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Input all valid fields for {actionType.trim().toLowerCase()} proxy
          list
        </DialogContentText>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={3} sx={{ my: 3 }}>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="List name"
              type="text"
              fullWidth
              variant="standard"
            />
            <TextField
              margin="dense"
              id="name"
              label="username"
              type="text"
              fullWidth
              variant="standard"
            />
            <TextField
              margin="dense"
              id="name"
              label="password"
              type="password"
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
