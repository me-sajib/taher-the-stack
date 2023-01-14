import { Grid, Skeleton, Stack } from '@mui/material';

const LoadingListFallback = () => (
  <Grid
    container
    alignItems="center"
    justifyContent="center"
    sx={{ opacity: 0.6 }}
  >
    <Stack spacing={1}>
      <Skeleton
        animation="wave"
        variant="rounded"
        sx={{
          width: '65vw',
          height: '8vh'
        }}
      />
      <Skeleton
        animation="wave"
        variant="rounded"
        sx={{
          width: '65vw',
          height: '60vh'
        }}
      />
    </Stack>
  </Grid>
);

export default LoadingListFallback;
