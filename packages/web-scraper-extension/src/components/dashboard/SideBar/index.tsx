import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../../../app/hooks';
import { getRecipes } from '../../../features/dashboard/dashboardSlice';
import icons from '../../../icon';
import addClass from '../../../utils/addClass';
import generateUid from '../../../utils/generateUid';
import SavedRecipes from '../Recipes';
import classes from './index.module.css';

const menus = [
  {
    route: '/result',
    name: 'Result',
    icon: 'preview'
  },
  {
    route: '/save-recipe',
    name: 'Save recipe',
    icon: 'save'
  },
  {
    route: '/recipes-overview',
    name: 'Recipes overview',
    icon: 'collections'
  }
];

const SideBar = () => {
  const recipes = useAppSelector(getRecipes);

  const activeMenuHandler = ({ isActive }: { isActive: boolean }) =>
    addClass(isActive && classes.active, classes.menu);

  return (
    <aside className={classes.container}>
      <ul className={classes.menus}>
        {menus.map(({ route, name, icon }) => (
          <li key={generateUid()}>
            <NavLink to={route} className={activeMenuHandler}>
              <span className={classes.icon}>{icons[icon]}</span>
              <span className={classes.menuText}>{name}</span>
            </NavLink>
          </li>
        ))}
      </ul>

      {Object.keys(recipes).length !== 0 && (
        <SavedRecipes heading="My Recipes" recipes={recipes} />
      )}
    </aside>
  );
};

export default SideBar;
