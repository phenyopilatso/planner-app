import { EventEmitter } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";

export class ShoppingListService {

    ingredientsChanged = new Subject<Ingredient[]>();

    private ingredients: Ingredient[]= [
        new Ingredient('Apples', 8),
        new Ingredient('Tomatoes', 12)
    ];

    getIngredients(){
        return this.ingredients.slice();
    }

    addIngredients(ingredient: Ingredient){
        this.ingredients.push(ingredient);
        this.ingredientsChanged.next(this.ingredients.slice());
    }
    addingredint(ingre: Ingredient[]){
        this.ingredients.push(...ingre);
        this.ingredientsChanged.next(this.ingredients.slice());
    }
}