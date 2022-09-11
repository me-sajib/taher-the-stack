// ----------------------------------------------------------------------

export default function Tooltip(theme) {
  return {
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: theme.palette.grey[600],
        },
        arrow: {
          color: theme.palette.grey[600],
        },
      },
    },
  };
}
