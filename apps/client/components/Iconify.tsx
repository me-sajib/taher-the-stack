// icons
import { Icon, IconifyIcon } from '@iconify/react';
// @mui
import { Box } from '@mui/material';

interface IconifyTypes {
  icon: string | IconifyIcon;
  sx?: any;
}

const Iconify = ({ icon, sx, ...other }: IconifyTypes) => (
  <Box component={Icon} icon={icon} sx={{ ...sx }} {...other} />
);

export default Iconify;
