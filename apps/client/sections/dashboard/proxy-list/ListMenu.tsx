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

// ----------------------------------------------------------------------

interface ListMenuTypes {
  id: string;
}

export default function ListMenu({ id }: ListMenuTypes) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenProxyListModal, setProxyListStatus] = useState(false);

  const proxyListModalHandler = () => setProxyListStatus(!isOpenProxyListModal);

  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Iconify icon="eva:more-vertical-fill" width={20} height={20} />
      </IconButton>

      <ProxyListModal
        open={isOpenProxyListModal}
        actionType="Update"
        onSubmit={(data) => null} // TODO: Add proxyList update action
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
        <MenuItem sx={{ color: 'text.secondary' }}>
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
