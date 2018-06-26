import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {AdminGuard} from "../guards/admin-guard";
import {ListItemsComponent} from "./admin-module/list-items/list-items.component";

const APP_ROUTES2: Routes = [
  {path: '', component: ListItemsComponent },
  {path: 'listItems', component: ListItemsComponent }
];


@NgModule({
  imports : [RouterModule.forChild(APP_ROUTES2)],
  exports : [RouterModule]
})
export class AdminRouterModule {
}
