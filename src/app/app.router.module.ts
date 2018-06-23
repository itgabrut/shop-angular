
import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {SingleComponent} from "./pages/items/single/single.component";
import {ItemsComponent} from "./pages/items/items.component";
import {CheckoutComponent} from "./pages/checkout/checkout.component";
import {MyOrderComponent} from "./pages/my-order/my-order.component";
import {LoginGuard} from "./guards/login-guard";
import {MyDetailsComponent} from "./pages/my-details/my-details.component";
import {OrderDetailsComponent} from "./pages/order-details/order-details.component";
import {AdminOrdersComponent} from "./pages/admin-orders/admin-orders.component";
import {AdminGuard} from "./guards/admin-guard";
import {AdminUsersComponent} from "./pages/admin-users/admin-users.component";


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
  {path:'myOrders',component: MyOrderComponent,canActivate: [LoginGuard]},
  {path:'myDetails', component:MyDetailsComponent, canActivate:[LoginGuard]},
  {path:'orderDetails/:id',component: OrderDetailsComponent, canActivate:[LoginGuard]},
  {path:'adminOrders', component: AdminOrdersComponent, canActivate:[LoginGuard,AdminGuard]},
  {path:'adminUsers',component: AdminUsersComponent, canActivate:[AdminGuard]},
  { path: '', redirectTo:'items', pathMatch:'full'}
];


@NgModule({
  imports : [RouterModule.forRoot(APP_ROUTES)],
  exports : [RouterModule]
})
export class AppRouterModule {
}


