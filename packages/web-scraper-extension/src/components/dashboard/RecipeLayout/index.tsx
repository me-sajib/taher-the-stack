import addClass from '../../../utils/addClass';
import classes from './index.module.css';

interface RecipeLayoutPropTypes {
  heading: string;
  headingClasses?: string;
  children: any;
}

const RecipeLayout = ({
  heading,
  headingClasses,
  children
}: RecipeLayoutPropTypes) => (
  <div className={classes.container}>
    <h2 className={addClass(classes.heading, headingClasses)}>
      {heading}
    </h2>
    {children}
  </div>
);

export default RecipeLayout;
