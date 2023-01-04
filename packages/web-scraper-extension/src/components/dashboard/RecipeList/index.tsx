import { MdOutlineArrowForwardIos } from 'react-icons/md';
import {
  NavLink,
  useLocation
} from 'react-router-dom';
import { Recipe } from '../../../interfaces/dashboard';
import addClass from '../../../utils/addClass';
import generateUid from '../../../utils/generateUid';
import classes from './index.module.css';

interface RecipeListPropTypes {
  hostname: string;
  recipeList: Recipe[];
  open: boolean;
  toggleRecipes: () => void;
}

const RecipeList = ({
  hostname,
  recipeList,
  open,
  toggleRecipes
}: RecipeListPropTypes) => {
  const location = useLocation();

  return (
    <li className={classes.container}>
      <div className={classes.host}>
        <MdOutlineArrowForwardIos
          className={addClass(
            classes.icon,
            open && classes.open
          )}
          onClick={toggleRecipes}
        />
        <span
          className={classes.hostname}
        >
          {hostname}
        </span>
      </div>
      {open && (
        <ul className={classes.recipes}>
          {recipeList.map(
            ({ name }, index) => (
              <li key={generateUid()}>
                <NavLink
                  className={() => {
                    const path =
                      location.pathname.replace(
                        /(\/\w+)$/,
                        ''
                      );

                    const isActive =
                      path ===
                      `/my-recipe/${hostname}/${
                        index + 1
                      }`;
                    return addClass(
                      classes.recipe,
                      isActive &&
                        classes.active
                    );
                  }}
                  to={`/my-recipe/${hostname}/${
                    index + 1
                  }/edit`}
                >
                  {name}
                </NavLink>
              </li>
            )
          )}
        </ul>
      )}
    </li>
  );
};

export default RecipeList;
