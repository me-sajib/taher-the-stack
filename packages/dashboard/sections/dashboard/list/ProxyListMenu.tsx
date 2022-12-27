import {
  useRef,
  useState
} from 'react';
// material
import {
  IconButton,
  Menu
} from '@mui/material';
// component
import ProxyListModal from 'packages/dashboard/components/ProxyListModal';
import { AppThunkDispatch } from 'packages/dashboard/store';
import { getProxyList } from 'packages/dashboard/store/proxyListSlice';
import {
  useDispatch,
  useSelector
} from 'react-redux';

import MenuItems from 'packages/dashboard/components/MenuItems';
import { MenuItemType } from 'packages/dashboard/interfaces';
import {
  deleteProxyList,
  editProxyList,
  recheckProxyList
} from 'packages/dashboard/store/thunks';
import { getIcon } from 'packages/dashboard/utils';

// ----------------------------------------------------------------------

interface ListMenuTypes {
  id: string;
}

export default function ProxyListMenu({
  id
}: ListMenuTypes) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] =
    useState(false);
  const [
    isOpenProxyListModal,
    setProxyListStatus
  ] = useState(false);
  const proxyLists = useSelector(
    getProxyList
  );
  const {
    key,
    name,
    username,
    password,
    checking
  } = proxyLists.find(
    (list) => list.key === id
  );

  const proxyListModalHandler = () =>
    setProxyListStatus(
      !isOpenProxyListModal
    );
  const asyncDispatch =
    useDispatch<AppThunkDispatch>();

  const recheckProxyListHandler =
    () => {
      asyncDispatch(
        recheckProxyList({
          checkProxyListIds: [key]
        })
      );
    };

  const deleteProxyListHandler = () => {
    asyncDispatch(
      deleteProxyList({
        listKeys: [id]
      })
    );
    setIsOpen(false);
  };

  const editProxyListHandler = async (
    data
  ) => {
    const res = (await asyncDispatch(
      editProxyList([
        { ...data, key: id }
      ])
    )) as any;

    if (!res.payload.error) {
      proxyListModalHandler();
      setIsOpen(false);
    }
  };

  const menuItems: MenuItemType[] = [
    {
      hide: checking,
      icon: 'akar-icons:arrow-clockwise',
      text: 'Recheck',
      clickAction:
        recheckProxyListHandler
    },
    {
      icon: 'eva:trash-2-outline',
      text: 'Delete',
      clickAction:
        deleteProxyListHandler
    },
    {
      icon: 'eva:edit-fill',
      text: 'Edit',
      clickAction: proxyListModalHandler
    }
  ];

  return (
    <>
      <IconButton
        ref={ref}
        onClick={() => setIsOpen(true)}
      >
        {getIcon(
          'eva:more-vertical-fill'
        )}
      </IconButton>

      <ProxyListModal
        formState={{
          name,
          username,
          password
        }}
        open={isOpenProxyListModal}
        actionType="Update"
        onSubmit={editProxyListHandler}
        handleClose={
          proxyListModalHandler
        }
      />

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: {
            width: 200,
            maxWidth: '100%'
          }
        }}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
      >
        <MenuItems items={menuItems} />
      </Menu>
    </>
  );
}
