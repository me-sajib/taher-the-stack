import { Recipe, Recipes } from '../interfaces/dashboard';

const removeRecipeProp = (recipes: Recipes) => {
  const clonedRecipes: Recipes = structuredClone(recipes);
  const ignoreKeys: Set<string> = new Set([
    'results',
    'totalScraped',
    'duration'
  ]);

  for (const hostname in clonedRecipes) {
    clonedRecipes[hostname] = clonedRecipes[hostname].map(
      (recipe) => {
        ignoreKeys.forEach((ignoreKey) => {
          delete recipe[ignoreKey as keyof Recipe];
        });

        return recipe;
      }
    );
  }

  return clonedRecipes;
};

export default removeRecipeProp;
