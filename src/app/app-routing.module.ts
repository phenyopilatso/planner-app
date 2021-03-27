import { NgModule } from '@angular/core'; 
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';

import { AuthGuard } from './auth/auth.guard';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';


//edit
const appRoutes: Routes = [ 
    {path: '', redirectTo: '/recipes', pathMatch: 'full'},
    {path: 'auth', component: AuthComponent},
    {path: 'shopping-list', component: ShoppingListComponent},
]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}
