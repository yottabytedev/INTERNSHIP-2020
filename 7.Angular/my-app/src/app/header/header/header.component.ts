import { RecipeService } from './../../recipes/recipe.service';
import { DataStorageService } from '../../shared/data-storage.service';
import { Component, OnInit } from '@angular/core';
//import { Response} from '@angular/common/http';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(private dataStorageService: DataStorageService,
    private recipeService: RecipeService) { }

  ngOnInit() {
  }

  onSaveData() {
    // this.dataStorageService.storeRecipes().subscribe(
    //   (response: Response) => {
    //     console.log(response);
    //   }
    // )
    // let recipes = this.recipeService.getRecipes();
    // for (const recipe of recipes) {
    //   console.log(recipe);
    //   if (recipe.id == null)
    //   {
    //     this.dataStorageService.storeRecipes(recipe)
    //     .subscribe((response: Response) => {
    //       console.log(response);
    //     });
    //   } else {
    //     this.dataStorageService.updateRecipe(recipe)
    //       .subscribe((response: Response) => {
    //         console.log(response);
    //       });
    //   }
    // }
  }

  onFetchData() {
    this.recipeService.setRecipes();
  }
}
