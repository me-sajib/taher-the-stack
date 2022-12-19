// material
import {
  Box,
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import {
  alpha,
  styled,
  useTheme
} from '@mui/material/styles';
//
import { useRouter } from 'next/router';
import Iconify from './Iconify';

// ----------------------------------------------------------------------

interface ListItemButtonType {
  [key: string]: any;
}

const button = ({
  children,
  ...props
}: ListItemButtonType) => (
  <ListItemButton
    disableGutters
    {...props}
  >
    {children}
  </ListItemButton>
);

const ListItemStyle = styled(button)(
  ({ theme }) => ({
    ...theme.typography.body2,
    height: 48,
    position: 'relative',
    textTransform: 'capitalize',
    color: theme.palette.text.secondary,
    borderRadius:
      theme.shape.borderRadius
  })
);

const ListItemIconStyle = styled(
  ListItemIcon
)({
  width: 22,
  height: 22,
  color: 'inherit',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
});

// ----------------------------------------------------------------------

function NavItem({
  item,
  isActiveRoot
}) {
  const theme = useTheme();
  const {
    title,
    icon,
    info,
    children
  } = item;
  const router = useRouter();

  const activeRootStyle = {
    color: 'primary.main',
    fontWeight: 'fontWeightMedium',
    bgcolor: alpha(
      theme.palette.primary.main,
      theme.palette.action
        .selectedOpacity
    )
  };

  if (children) {
    return (
      <>
        <ListItemStyle
          sx={{
            ...(isActiveRoot &&
              activeRootStyle)
          }}
        >
          <ListItemIconStyle>
            {icon && icon}
          </ListItemIconStyle>
          <ListItemText
            disableTypography
            primary={title}
          />
          {info && info}
          <Iconify
            icon={
              open
                ? 'eva:arrow-ios-downward-fill'
                : 'eva:arrow-ios-forward-fill'
            }
            sx={{
              width: 16,
              height: 16,
              ml: 1
            }}
          />
        </ListItemStyle>

        <Collapse
          timeout="auto"
          unmountOnExit
        >
          <List
            component="div"
            disablePadding
          >
            {children.map((item) => {
              const { title, path } =
                item;

              return (
                <ListItemStyle
                  key={title}
                  to={path}
                >
                  <ListItemIconStyle>
                    <Box
                      component="span"
                      sx={{
                        width: 4,
                        height: 4,
                        display: 'flex',
                        borderRadius:
                          '50%',
                        alignItems:
                          'center',
                        justifyContent:
                          'center',
                        bgcolor:
                          'text.disabled'
                      }}
                    />
                  </ListItemIconStyle>
                  <ListItemText
                    disableTypography
                    primary={title}
                  />
                </ListItemStyle>
              );
            })}
          </List>
        </Collapse>
      </>
    );
  }

  return (
    <ListItemStyle
      onClick={() =>
        router.push(item.path)
      }
      sx={{
        ...(isActiveRoot &&
          activeRootStyle)
      }}
    >
      <ListItemIconStyle>
        {icon && icon}
      </ListItemIconStyle>
      <ListItemText
        disableTypography
        primary={title}
      />
      {info && info}
    </ListItemStyle>
  );
}

export default function NavSection({
  navConfig,
  ...other
}) {
  const router = useRouter();

  return (
    <Box {...other}>
      <List
        disablePadding
        sx={{ p: 1 }}
      >
        {navConfig.map((item) => {
          const isActiveMenu =
            item.path
              .split('/')
              .at(1) ===
            router.pathname
              .split('/')
              .at(1);

          return (
            <NavItem
              key={item.title}
              item={item}
              isActiveRoot={
                isActiveMenu
              }
            />
          );
        })}
      </List>
    </Box>
  );
}
