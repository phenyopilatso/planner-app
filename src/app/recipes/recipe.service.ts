import { EventEmitter, Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable()
export class RecipeService {

    recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe('Test Recipe', 
              'Bread 1', 
              'https://www.seriouseats.com/2011/06/20200419-no-knead-bread-vicky-wasik2.jpg', 
              [
                new Ingredient('meat', 1),
                new Ingredient('loaf', 20)
              ]),
              
    new Recipe('Another Test Recipe', 
                'Bread 2', 
                'https://i1.wp.com/gatherforbread.com/wp-content/uploads/2015/08/Easiest-Yeast-Bread.jpg?resize=500%2C500&ssl=1', 
                [
                  new Ingredient('cheese', 3),
                  new Ingredient('Bread', 3)
                ])
  ];

  constructor(private slService: ShoppingListService){}

  getRecipes(){
     return this.recipes.slice();
  }

  getRecipe(id: number) {
    return this.recipes[id];
  }

  addIngredientsToSL(ingredient: Ingredient[]){
    this.slService.addingredint(ingredient);
  }

}