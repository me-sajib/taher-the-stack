import { useRef, useState } from 'react';
// @mui
import {
  Box,
  Divider,
  IconButton,
  MenuItem,
  Stack,
  Typography,
} from '@mui/material';
// components
import { User } from '@prisma/client';
import axios from 'axios';
import MenuPopover from 'components/MenuPopover';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { getProfile } from 'store/userSlice';

// redux

const MENU_OPTIONS = [
  {
    label: 'Home',
    icon: 'eva:home-fill',
    linkTo: '/proxy-list',
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
  const profile: User = useSelector(getProfile);
  const anchorRef = useRef(null);
  const [open, setOpen] = useState<HTMLButtonElement>(null);
  const router = useRouter();

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const logoutHandler = async () => {
    await axios.delete('/api/auth/sign-out');
    router.push('/auth/sign-in');
  };

  return (
    <>
      <IconButton
        ref={anchorRef}
        onClick={handleOpen}
        sx={{
          p: 2,
          borderRadius: 1.5,
        }}
      >
        {profile?.username}
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
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
            {profile?.fullname}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {profile?.email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack sx={{ p: 1 }}>
          {MENU_OPTIONS.map((option) => (
            <Link key={Math.random().toString(32)} href={option.linkTo}>
              <MenuItem
                key={option.label}
                component={null}
                onClick={handleClose}
              >
                {option.label}
              </MenuItem>
            </Link>
          ))}
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem onClick={logoutHandler} sx={{ m: 1 }}>
          Logout
        </MenuItem>
      </MenuPopover>
    </>
  );
};

export default AccountPopover;
