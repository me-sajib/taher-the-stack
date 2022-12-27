import {
  ListItemIcon,
  ListItemText,
  MenuItem
} from '@mui/material';
import { MenuItemType } from 'packages/dashboard/interfaces';
import { getIcon } from 'packages/dashboard/utils';

interface MenuItemsTypes {
  items: MenuItemType[];
}

const MenuItems = ({
  items
}: MenuItemsTypes) => (
  <>
    {items.map((item) =>
      item.hide ? null : (
        <MenuItem
          key={Math.random().toString(
            32
          )}
          sx={{
            color: 'text.secondary'
          }}
          onClick={item.clickAction}
        >
          <ListItemIcon>
            {getIcon(item.icon)}
          </ListItemIcon>
          <ListItemText
            primary={item.text}
            primaryTypographyProps={{
              variant: 'body2'
            }}
          />
        </MenuItem>
      )
    )}
  </>
);

export default MenuItems;
