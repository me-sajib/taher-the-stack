import { getIcon } from 'packages/dashboard/utils';

const navConfig = [
  {
    title: 'proxy list',
    path: '/proxy-list',
    icon: getIcon(
      'fluent:server-multiple-20-filled'
    )
  },
  {
    title: 'profile',
    path: '/profile',
    icon: getIcon(
      'carbon:user-avatar-filled'
    )
  }
];

export default navConfig;
