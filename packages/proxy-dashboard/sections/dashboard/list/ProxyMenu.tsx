import { Proxy } from '@prisma/client';
import ProxyModal from 'packages/proxy-dashboard/components/ProxyModal';
import { AppThunkDispatch } from 'packages/proxy-dashboard/store';
import {
  getList,
  getProxies
} from 'packages/proxy-dashboard/store/proxySlice';
import { useDispatch, useSelector } from 'react-redux';

import MenuItems from 'packages/proxy-dashboard/components/MenuItems';
import { MenuItemType } from 'packages/proxy-dashboard/interfaces';
import {
  deleteProxy,
  editProxy,
  recheckProxy
} from 'packages/proxy-dashboard/store/thunks';
import { getIcon } from 'packages/proxy-dashboard/utils';

interface ListMenuTypes {
  id: number;
}

export default function ProxyMenu({ id }: ListMenuTypes) {
  const { key: proxyListKey } = useSelector(getList);
  const proxies: Proxy[] = useSelector(getProxies);
  const proxy = proxies.find((proxy) => proxy.id === id);
  const { host, port, country, username, password } = proxy;

  const dispatch = useDispatch<AppThunkDispatch>();

  const deleteProxyHandler = () => {
    dispatch(
      deleteProxy({
        proxyListKey,
        proxyIds: [id]
      })
    );
  };

  const editProxyHandler = (data) => {
    dispatch(editProxy([{ ...data, id }]));
  };

  const recheckProxyHandler = () => {
    dispatch(recheckProxy([proxy.id]));
  };

  const menuItems: MenuItemType[] = [
    {
      hide: proxy.status === 'CHECKING',
      icon: 'akar-icons:arrow-clockwise',
      text: 'Recheck',
      clickAction: recheckProxyHandler
    },
    {
      icon: 'eva:trash-2-outline',
      text: 'Delete',
      clickAction: deleteProxyHandler
    },
    {
      icon: 'eva:edit-fill',
      text: 'Edit',
      htmlFor: 'EditProxy'
    }
  ];

  return (
    <>
      <ProxyModal
        modalId="EditProxy"
        formState={{
          host,
          port,
          country,
          username,
          password
        }}
        actionType="Update"
        onSubmit={editProxyHandler}
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
