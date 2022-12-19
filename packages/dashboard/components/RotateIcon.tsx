import {
  createStyles,
  makeStyles
} from '@mui/styles';

import Iconify from './Iconify';

export const useStyles = makeStyles(
  () =>
    createStyles({
      rotateIcon: {
        animation:
          '$spin 1.5s linear infinite'
      },
      '@keyframes spin': {
        '0%': {
          transform: 'rotate(-360deg)'
        },
        '100%': {
          transform: 'rotate(0deg)'
        }
      }
    })
) as any;

export default function RotateIcon() {
  const classes = useStyles();

  return (
    <Iconify
      icon="emojione-v1:clockwise-left-right-arrows"
      className={classes.rotateIcon}
    />
  );
}
