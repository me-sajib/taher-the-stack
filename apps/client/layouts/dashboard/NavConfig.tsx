import Iconify from 'components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name: string) => (
  <Iconify icon={name} width={22} height={22} />
);

const navConfig = [
  {
    title: 'proxy list',
    path: '/proxy-list',
    icon: getIcon('fluent:server-multiple-20-filled'),
  },
];

export default navConfig;
