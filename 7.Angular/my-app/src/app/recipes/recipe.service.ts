import { ShoppingListService } from './../shopping-list/shopping-list.service';
import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
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
}
