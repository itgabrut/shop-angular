
import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {SingleComponent} from "./pages/items/single/single.component";
import {ItemsComponent} from "./pages/items/items.component";
import {CheckoutComponent} from "./pages/checkout/checkout.component";


const APP_ROUTES: Routes = [
  // {
  //   path: 'recipe', component: RecipesComponent, children :
  //   [
  //     { path : '', component: RecipeStartComponent},
  //     { path : 'new', component: RecipeEditComponent},
  //     { path : ':id', component: RecipeDetailComponent},
  //     { path : ':id/edit', component : RecipeEditComponent}
  //   ]},
  // { path: '', redirectTo : '/recipe', pathMatch : 'full'},
  { path: 'single' , component : SingleComponent},
  { path: 'items' , component : ItemsComponent},
  {path:'checkout',component: CheckoutComponent},
  { path: '', redirectTo:'items', pathMatch:'full'}
];


@NgModule({
  imports : [RouterModule.forRoot(APP_ROUTES)],
  exports : [RouterModule]
})
export class AppRouterModule {
}


