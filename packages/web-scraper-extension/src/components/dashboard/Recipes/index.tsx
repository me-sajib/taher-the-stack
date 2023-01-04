import { Recipes } from '../../../interfaces/dashboard';
import generateUid from '../../../utils/generateUid';
import BoolStateWrapper from '../../BoolStateWrapper';
import RecipeList from '../RecipeList';
import classes from './index.module.css';

interface SavePagePropTypes {
  heading: string;
  recipes: Recipes;
}

const SavedRecipes = ({
  heading,
  recipes
}: SavePagePropTypes) => (
  <div>
    <h4 className={classes.heading}>
      {heading}
    </h4>
    <ul>
      {Object.entries(recipes).map(
        ([hostname, recipeList]) => (
          <BoolStateWrapper>
            {(open, toggleRecipes) => (
              <RecipeList
                key={generateUid()}
                hostname={hostname}
                recipeList={recipeList}
                open={open}
                toggleRecipes={
                  toggleRecipes
                }
              />
            )}
          </BoolStateWrapper>
        )
      )}
    </ul>
  </div>
);

export default SavedRecipes;
