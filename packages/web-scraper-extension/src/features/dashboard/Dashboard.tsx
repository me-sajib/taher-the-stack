import {
  useEffect,
  useRef
} from 'react';
import {
  Navigate,
  Route,
  Routes
} from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { store } from '../../app/store';
import BackButton from '../../components/dashboard/BackButton';
import CurrentPageResult from '../../components/dashboard/CurrentPageResult';
import MyRecipeEditor from '../../components/dashboard/MyRecipeEditor';
import NotFoundRecipe from '../../components/dashboard/NotFoundRecipe';
import RecipeResult from '../../components/dashboard/RecipeResult';
import SavePage from '../../components/dashboard/SaveRecipe';
import SideBar from '../../components/dashboard/SideBar';
import {
  BODY_HOLDER,
  EXTENSION_TAG_NAME
} from '../../global';
import getChromeStore from '../../utils/getChromeStore';
import {
  getCurrentPage,
  updateRecipes
} from './dashboardSlice';
import styles from './index.module.css';

async function loadRecipeFromStorage(
  storageName: string
) {
  const storedRecipe =
    await getChromeStore(storageName);
  store.dispatch(
    updateRecipes(storedRecipe)
  );
}

const Dashboard = () => {
  const currentPage = useAppSelector(
    getCurrentPage
  );
  const date = useRef<Date>(new Date());

  useEffect(() => {
    if (chrome.storage) {
      loadRecipeFromStorage(
        EXTENSION_TAG_NAME
      );
    }
  }, []);

  return (
    <div className={styles.dashboard}>
      <SideBar />

      <div className={styles.board}>
        <Routes>
          <Route
            path="/index.html"
            element={
              <Navigate to="/result" />
            }
          />

          <Route path="/">
            <Route
              index
              element={
                <Navigate to="result" />
              }
            />

            <Route
              path="result"
              element={
                <CurrentPageResult
                  page={currentPage}
                  date={date.current}
                />
              }
            />
            <Route
              path="save-recipe"
              element={
                <SavePage
                  page={currentPage}
                />
              }
            />
            <Route
              path="not-found"
              element={
                <NotFoundRecipe />
              }
            />

            <Route path="my-recipe/">
              <Route
                path=":hostname/:id/edit"
                element={
                  <MyRecipeEditor />
                }
              />
              <Route
                path=":hostname/:id/result"
                element={
                  <RecipeResult />
                }
              />
            </Route>
          </Route>
        </Routes>
      </div>

      {/* this is button will render only on development mode */}
      {Boolean(
        BODY_HOLDER.children.length
      ) && <BackButton />}
    </div>
  );
};

export default Dashboard;
