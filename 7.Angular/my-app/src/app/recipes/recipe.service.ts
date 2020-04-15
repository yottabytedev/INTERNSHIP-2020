import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private recipes: Recipe[] = [
    new Recipe('Pasta','Italian dish','https://upload.wikimedia.org/wikipedia/commons/5/54/Pasta-2802156_1920.jpg'),
    new Recipe('Pizza','Italian dish','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTx6SrTcAdbzggSKn9Hu1dECjypFr9Kb3APBHgnvUZlKMBHU5rg8w&s')
  ];
  
  constructor() { }

  getRecipes() {
    return this.recipes.slice();
  }

}
