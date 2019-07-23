import { Injectable } from '@angular/core';
import { Recipe } from './recipes.model';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {

  private recipes: Recipe[] = [
    {
      id: 'r11',
      title: 'masala dosa',
      imageUrl:
        'https://i.ytimg.com/vi/CCab5oh0ZOc/maxresdefault.jpg',
      ingredients: ['French Fries', 'Pork Meat', 'Salad']
    },
    {
      id: 'r2',
      title: 'idli',
      imageUrl:
        'http://www.ndtv.com/cooks/images/idli.2.jpg',
      ingredients: ['Spaghetti', 'Meat', 'Tomatoes']
    },
    {
      id: 'r3',
      title: 'noodles',
      imageUrl:
        'https://thewoksoflife.com/wp-content/uploads/2019/04/soy-sauce-pan-fried-noodles-11.jpg',
      ingredients: ['Spaghetti', 'Meat', 'Tomatoes']
    },
    {
      id: 'r4',
      title: 'fries',
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/commons/6/67/Fries_2.jpg',
      ingredients: ['Spaghetti', 'Meat', 'Tomatoes']
    },
    
  ];

  constructor() {}

  getAllRecipes() {
    return [...this.recipes];
  }

  getRecipe(recipeId: string) {
    return {
      ...this.recipes.find(recipe => {
        return recipe.id === recipeId;
      })
    };
  }

  deleteRecipe(recipeId: string) {
    this.recipes = this.recipes.filter(recipe => {
      return recipe.id !== recipeId;
    });
  }
}
