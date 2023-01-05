// component
import ProxyListModal from 'packages/dashboard/components/ProxyListModal';
import { AppThunkDispatch } from 'packages/dashboard/store';
import { getProxyList } from 'packages/dashboard/store/proxyListSlice';
import { useDispatch, useSelector } from 'react-redux';

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

export default function ProxyListMenu({ id }: ListMenuTypes) {
  const proxyLists = useSelector(getProxyList);
  const { key, name, username, password, checking } = proxyLists.find(
    (list) => list.key === id
  );

  const asyncDispatch = useDispatch<AppThunkDispatch>();

  const recheckProxyListHandler = () => {
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
  };

  const editProxyListHandler = async (data) => {
    await asyncDispatch(editProxyList([{ ...data, key: id }]));
  };

  const menuItems: MenuItemType[] = [
    {
      hide: checking,
      icon: 'akar-icons:arrow-clockwise',
      text: 'Recheck',
      clickAction: recheckProxyListHandler
    },
    {
      icon: 'eva:trash-2-outline',
      text: 'Delete',
      clickAction: deleteProxyListHandler
    },
    {
      icon: 'eva:edit-fill',
      text: 'Edit',
      htmlFor: 'EditProxyList'
    }
  ];

  return (
    <>
      <ProxyListModal
        modalId="EditProxyList"
        formState={{
          name,
          username,
          password
        }}
        actionType="Update"
        onSubmit={editProxyListHandler}
      />

      <div className="dropdown">
        <label
          className="rounded hover:bg-gray-200 cursor-pointer"
          tabIndex={0}
        >
          {getIcon('eva:more-vertical-fill')}
        </label>
        <div className="dropdown-menu dropdown-menu-left bg-gray-100">
          <MenuItems items={menuItems} />
        </div>
      </div>
    </>
  );
}
