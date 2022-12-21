import {
  ListItemIcon,
  ListItemText,
  MenuItem
} from '@mui/material';
import { MenuItemType } from 'packages/dashboard/interfaces';
import Iconify from './Iconify';

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
            <Iconify
              icon={item.icon}
              width={24}
              height={24}
            />
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
