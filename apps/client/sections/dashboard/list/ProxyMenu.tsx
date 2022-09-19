import { useRef, useState } from 'react';
// material
import {
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from '@mui/material';
// component
import { Proxy } from '@prisma/client';
import Iconify from 'components/Iconify';
import ProxyModal from 'components/ProxyModal';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { AppThunkDispatch } from 'store';
import { getProxies } from 'store/proxySlice';

import { deleteProxy, editProxy, recheckProxy } from 'store/thunks';

// ----------------------------------------------------------------------

interface ListMenuTypes {
  id: number;
}

export default function ProxyMenu({ id }: ListMenuTypes) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenProxyListModal, setProxyListStatus] = useState(false);
  const router = useRouter();
  const proxyListKey = router.query.id as string;
  const proxiesMap = useSelector(getProxies);
  const proxies: Proxy[] = proxiesMap[proxyListKey as string];
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
    dispatch(
      recheckProxy([
        {
          listKey: proxy.proxyListKey,
          ids: [proxy.id],
        },
      ])
    );
    setIsOpen(false);
  };

  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Iconify icon="eva:more-vertical-fill" width={20} height={20} />
      </IconButton>

      <ProxyModal
        formState={{ host, port, country, username, password }}
        open={isOpenProxyListModal}
        actionType="Update"
        onSubmit={editProxyHandler} // TODO: Add proxyList update action
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
        <MenuItem
          sx={{ color: 'text.secondary' }}
          onClick={recheckProxyHandler}
        >
          <ListItemIcon>
            <Iconify icon="akar-icons:arrow-clockwise" width={24} height={24} />
          </ListItemIcon>
          <ListItemText
            primary="Recheck"
            primaryTypographyProps={{ variant: 'body2' }}
          />
        </MenuItem>

        <MenuItem sx={{ color: 'text.secondary' }} onClick={deleteProxyHandler}>
          <ListItemIcon>
            <Iconify icon="eva:trash-2-outline" width={24} height={24} />
          </ListItemIcon>
          <ListItemText
            primary="Delete"
            primaryTypographyProps={{ variant: 'body2' }}
          />
        </MenuItem>

        <MenuItem
          sx={{ color: 'text.secondary' }}
          onClick={proxyListModalHandler}
        >
          <ListItemIcon>
            <Iconify icon="eva:edit-fill" width={24} height={24} />
          </ListItemIcon>
          <ListItemText
            primary="Edit"
            primaryTypographyProps={{ variant: 'body2' }}
          />
        </MenuItem>
      </Menu>
    </>
  );
}
