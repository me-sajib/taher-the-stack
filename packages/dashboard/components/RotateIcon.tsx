import { createStyles, makeStyles } from '@mui/styles';
import { getIcon } from '../utils';

export const useStyles = makeStyles(() =>
  createStyles({
    rotateIcon: {
      animation: '$spin 1.5s linear infinite'
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
  // TODO: This animation should be handle with tailwind
  // const classes = useStyles();

  return getIcon('emojione-v1:clockwise-left-right-arrows');
}
