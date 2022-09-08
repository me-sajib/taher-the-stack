import { useRef, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import {
  Box,
  Divider,
  IconButton,
  MenuItem,
  Stack,
  Typography,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
// components
import MenuPopover from '@components/MenuPopover';

// redux

const MENU_OPTIONS = [
  {
    label: 'Home',
    icon: 'eva:home-fill',
    linkTo: '/',
  },
  {
    label: 'Profile',
    icon: 'eva:person-fill',
    linkTo: '#',
  },
  {
    label: 'Settings',
    icon: 'eva:settings-2-fill',
    linkTo: '#',
  },
];

const AccountPopover = () => {
  // const profile: User = useSelector(getProfile);
  const anchorRef = useRef(null);

  const [open, setOpen] = useState<HTMLButtonElement>(null);

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  return (
    <>
      <IconButton
        ref={anchorRef}
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        {/* <Avatar src={profile.photoURL} alt="photoURL" /> */}
      </IconButton>

      <MenuPopover
        isOpen={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        sx={{
          p: 0,
          mt: 1.5,
          ml: 0.75,
          '& .MuiMenuItem-root': {
            typography: 'body2',
            borderRadius: 0.75,
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
            {/* {profile.fullname} */}
            fahim faisal
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {/* {profile.email} */}
            fahimfaisaal@gmail.com
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack sx={{ p: 1 }}>
          {MENU_OPTIONS.map((option) => (
            <MenuItem
              key={option.label}
              to={option.linkTo}
              component={RouterLink}
              onClick={handleClose}
            >
              {option.label}
            </MenuItem>
          ))}
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem onClick={handleClose} sx={{ m: 1 }}>
          Logout
        </MenuItem>
      </MenuPopover>
    </>
  );
};

export default AccountPopover;
