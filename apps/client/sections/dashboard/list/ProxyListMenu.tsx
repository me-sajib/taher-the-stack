import { useRef, useState } from 'react';
// material
import { IconButton, Menu } from '@mui/material';
// component
import Iconify from 'components/Iconify';
import ProxyListModal from 'components/ProxyListModal';
import { useDispatch, useSelector } from 'react-redux';
import { AppThunkDispatch } from 'store';
import { getProxyList } from 'store/proxyListSlice';

import MenuItems from 'components/MenuItems';
import { MenuItemType } from 'interfaces';
import { deleteProxyList, editProxyList, recheckProxyList } from 'store/thunks';

// ----------------------------------------------------------------------

interface ListMenuTypes {
  id: string;
}

export default function ProxyListMenu({ id }: ListMenuTypes) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenProxyListModal, setProxyListStatus] = useState(false);
  const proxyLists = useSelector(getProxyList);
  const { key, name, username, password, checking } = proxyLists.find(
    (list) => list.key === id
  );

  const proxyListModalHandler = () => setProxyListStatus(!isOpenProxyListModal);
  const asyncDispatch = useDispatch<AppThunkDispatch>();

  const recheckProxyListHandler = () => {
    asyncDispatch(recheckProxyList({ checkProxyListIds: [key] }));
  };

  const deleteProxyListHandler = () => {
    asyncDispatch(deleteProxyList({ listKeys: [id] }));
    setIsOpen(false);
  };

  const editProxyListHandler = (data) => {
    asyncDispatch(editProxyList([{ ...data, key: id }]));
    proxyListModalHandler();
    setIsOpen(false);
  };

  const menuItems: MenuItemType[] = [
    {
      hide: checking,
      icon: 'akar-icons:arrow-clockwise',
      text: 'Recheck',
      clickAction: recheckProxyListHandler,
    },
    {
      icon: 'eva:trash-2-outline',
      text: 'Delete',
      clickAction: deleteProxyListHandler,
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

      <ProxyListModal
        formState={{ name, username, password }}
        open={isOpenProxyListModal}
        actionType="Update"
        onSubmit={editProxyListHandler}
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
