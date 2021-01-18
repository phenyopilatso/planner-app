import { EventEmitter } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";

export class ShoppingListService {


    ingredientsChanged = new EventEmitter<Ingredient[]>();

    private ingredients: Ingredient[]= [
        new Ingredient('Apples', 8),
        new Ingredient('Tomatoes', 12)
    ];

    getIngredients(){
        return this.ingredients.slice();
    }

    addIngredients(ingredient: Ingredient){
        this.ingredients.push(ingredient);
        this.ingredientsChanged.emit(this.ingredients.slice());
    }
    addingredint(ingre: Ingredient[]){
        this.ingredients.push(...ingre);
        this.ingredientsChanged.emit(this.ingredients.slice());
    }
}