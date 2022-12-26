import {
  useEffect,
  useState
} from 'react';
// material
import { styled } from '@mui/material/styles';
//
import { LinearProgress } from '@mui/material';
import { NavMenus } from 'packages/dashboard/components';
import { AppThunkDispatch } from 'packages/dashboard/store';
import { getProxyListStatus } from 'packages/dashboard/store/proxyListSlice';
import { fetchUserProfile } from 'packages/dashboard/store/thunks';
import {
  getUser,
  getUserStatus
} from 'packages/dashboard/store/userSlice';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import DashboardNavbar from './DashboardNavBar';
// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

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

export default function DashboardLayout({
  children
}) {
  const profileStatus = useSelector(
    getUserStatus
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

  return (
    profile && (
      <>
        <DashboardNavbar />
        <div className="flex w-full">
          {/* Sidebar */}
          <div className="bg-gray-100 min-w-[20%] h-screen hidden md:block">
            <div className="pt-20">
              <NavMenus classes="block p-3 py-3 rounded hover:bg-blue-100" />
            </div>
          </div>
          {children}
        </div>
      </>
    )
  );
}
