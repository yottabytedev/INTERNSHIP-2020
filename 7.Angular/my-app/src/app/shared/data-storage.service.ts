import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RecipeService } from '../recipes/recipe.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  private REST_API_SERVER = "http://localhost:3000/recipes";

  constructor(private http: HttpClient,
    private recipeService: RecipeService) { }

  storeRecipes(data: any): Observable<any> {
    return this.http.post<any>(this.REST_API_SERVER, data);
  }

  updateRecipe(data: any): Observable<any> {
    return this.http.put<any>(this.REST_API_SERVER + "/"+ data.id, data);
  }

  getRecipes(): Observable<any> {
    return this.http.get(this.REST_API_SERVER);
  }
}
