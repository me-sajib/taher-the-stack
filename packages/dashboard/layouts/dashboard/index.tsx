import {
  useEffect,
  useState
} from 'react';
// material
import { styled } from '@mui/material/styles';
//
import { LinearProgress } from '@mui/material';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import { AppThunkDispatch } from 'store';
import { getProxyListStatus } from 'store/proxyListSlice';
import { fetchUserProfile } from 'store/thunks';
import {
  getUser,
  getUserStatus
} from 'store/userSlice';
import DashboardNavbar from './DashboardNavBar';
import DashboardSidebar from './DashboardSideBar';
// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const RootStyle = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden'
});

const MainStyle = styled('div')(
  ({ theme }) => ({
    flexGrow: 1,
    overflow: 'auto',
    minHeight: '100%',
    paddingTop: APP_BAR_MOBILE + 24,
    paddingBottom: theme.spacing(10),
    [theme.breakpoints.up('lg')]: {
      paddingTop: APP_BAR_DESKTOP + 24,
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)
    }
  })
);

// ----------------------------------------------------------------------

export default function DashboardLayout({
  children
}) {
  const [open, setOpen] =
    useState(false);
  const profileStatus = useSelector(
    getUserStatus
  );
  const proxyListStatus = useSelector(
    getProxyListStatus
  );
  const profile = useSelector(getUser);
  const asyncDispatch =
    useDispatch<AppThunkDispatch>();

  useEffect(() => {
    asyncDispatch(fetchUserProfile());
  }, [asyncDispatch]);

  if (
    profileStatus === 'loading' &&
    !profile
  ) {
    return <LinearProgress />;
  }

  const isFetching =
    proxyListStatus === 'loading' ||
    profileStatus === 'loading';

  return (
    <RootStyle>
      {isFetching && <LinearProgress />}
      {profile && (
        <>
          <DashboardNavbar
            onOpenSidebar={() =>
              setOpen(true)
            }
          />
          <DashboardSidebar
            isOpenSidebar={open}
            onCloseSidebar={() =>
              setOpen(false)
            }
          />
          <MainStyle>
            {children}
          </MainStyle>
        </>
      )}
    </RootStyle>
  );
}
