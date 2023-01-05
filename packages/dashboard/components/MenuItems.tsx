import { nanoid } from 'nanoid';
import { MenuItemType } from 'packages/dashboard/interfaces';
import { getIcon } from 'packages/dashboard/utils';

interface MenuItemsTypes {
  items: MenuItemType[];
}

const MenuItems = ({ items }: MenuItemsTypes) => (
  <>
    {items.map((item) => {
      return (
        item.hide || (
          <label
            className="hover:bg-gray-200 block"
            key={nanoid()}
            onClick={item.clickAction}
            htmlFor={item.htmlFor}
          >
            <span
              tabIndex={-1}
              className="dropdown-item flex w-full text-sm leading-5 text-content2"
              role="menuitem"
            >
              <i className="mr-2">{getIcon(item.icon)}</i>
              <span>{item.text}</span>
            </span>
          </label>
        )
      );
    })}
  </>
);

export default MenuItems;
