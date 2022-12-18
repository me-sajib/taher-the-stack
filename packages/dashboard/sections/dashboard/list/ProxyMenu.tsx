import { useRef, useState } from 'react';
// material
import { IconButton, Menu } from '@mui/material';
// component
import { Proxy } from '@prisma/client';
import Iconify from 'components/Iconify';
import ProxyModal from 'components/ProxyModal';
import { useDispatch, useSelector } from 'react-redux';
import { AppThunkDispatch } from 'store';
import { getList, getProxies } from 'store/proxySlice';

import MenuItems from 'components/MenuItems';
import { MenuItemType } from 'interfaces';
import { deleteProxy, editProxy, recheckProxy } from 'store/thunks';

// ----------------------------------------------------------------------

interface ListMenuTypes {
  id: number;
}

export default function ProxyMenu({ id }: ListMenuTypes) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenProxyListModal, setProxyListStatus] = useState(false);
  const { key: proxyListKey } = useSelector(getList);
  const proxies: Proxy[] = useSelector(getProxies);
  const proxy = proxies.find((proxy) => proxy.id === id);
  const { host, port, country, username, password } = proxy;

  const proxyListModalHandler = () => setProxyListStatus(!isOpenProxyListModal);
  const dispatch = useDispatch<AppThunkDispatch>();

  const deleteProxyHandler = () => {
    dispatch(deleteProxy({ proxyListKey, proxyIds: [id] }));
    setIsOpen(false);
  };

  const editProxyHandler = (data) => {
    dispatch(editProxy([{ ...data, id }]));
    proxyListModalHandler();
    setIsOpen(false);
  };

  const recheckProxyHandler = () => {
    dispatch(recheckProxy([proxy.id]));
  };

  const menuItems: MenuItemType[] = [
    {
      hide: proxy.status === 'CHECKING',
      icon: 'akar-icons:arrow-clockwise',
      text: 'Recheck',
      clickAction: recheckProxyHandler,
    },
    {
      icon: 'eva:trash-2-outline',
      text: 'Delete',
      clickAction: deleteProxyHandler,
    },
    {
      icon: 'eva:edit-fill',
      text: 'Edit',
      clickAction: proxyListModalHandler,
    },
  ];

  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Iconify icon="eva:more-vertical-fill" width={20} height={20} />
      </IconButton>

      <ProxyModal
        formState={{ host, port, country, username, password }}
        open={isOpenProxyListModal}
        actionType="Update"
        onSubmit={editProxyHandler}
        handleClose={proxyListModalHandler}
      />

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' },
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItems items={menuItems} />
      </Menu>
    </>
  );
}
