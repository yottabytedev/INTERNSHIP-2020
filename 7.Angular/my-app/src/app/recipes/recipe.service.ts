import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { ShoppingListService } from './../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipeChanged = new Subject();

  private recipes: Recipe[] = [
    new Recipe('Pasta',
    'Italian dish',
    'https://upload.wikimedia.org/wikipedia/commons/5/54/Pasta-2802156_1920.jpg',
    [
      new Ingredient('pasta',1),
      new Ingredient('sauce',1)
    ]
    ),
    new Recipe('Pizza',
    'Italian dish',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTx6SrTcAdbzggSKn9Hu1dECjypFr9Kb3APBHgnvUZlKMBHU5rg8w&s',
    [
      new Ingredient('pizza base',1),
      new Ingredient('capsicum',1)
    ]
    )
  ];
  
  constructor(private slService: ShoppingListService) { }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, recipe: Recipe) {
    this.recipes[index] = recipe;
    this.recipeChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index,1);
    this.recipeChanged.next(this.recipes.slice());
  }
}
