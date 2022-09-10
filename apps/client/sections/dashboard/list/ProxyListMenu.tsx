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
import Iconify from '@components/Iconify';
import ProxyListModal from '@components/ProxyListModal';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteProxyList,
  editProxyList,
  getProxyList,
} from 'store/proxyListSlice';
import { AppThunkDispatch } from '../../../store';

// ----------------------------------------------------------------------

interface ListMenuTypes {
  id: string;
}

export default function ProxyListMenu({ id }: ListMenuTypes) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenProxyListModal, setProxyListStatus] = useState(false);
  const proxyLists = useSelector(getProxyList);
  const { name, username, password } = proxyLists.find(
    (list) => list.key === id
  );

  const proxyListModalHandler = () => setProxyListStatus(!isOpenProxyListModal);
  const dispatch = useDispatch<AppThunkDispatch>();

  const deleteProxyListHandler = () => {
    dispatch(deleteProxyList({ listKeys: [id] }));
  };

  const editProxyListHandler = (data) => {
    dispatch(editProxyList({ ...data, key: id }));
    proxyListModalHandler();
  };

  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Iconify icon="eva:more-vertical-fill" width={20} height={20} />
      </IconButton>

      <ProxyListModal
        formState={{ name, username, password }}
        open={isOpenProxyListModal}
        actionType="Update"
        onSubmit={editProxyListHandler} // TODO: Add proxyList update action
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
          onClick={deleteProxyListHandler}
        >
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
