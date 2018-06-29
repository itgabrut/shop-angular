import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {AdminGuard} from "../guards/admin-guard";
import {ListItemsComponent} from "./admin-module/list-items/list-items.component";
import {ListItemHolderComponent} from "./admin-module/list-item-holder/list-item-holder.component";
import {ListItemDetailComponent} from "./admin-module/list-item-detail/list-item-detail.component";

const APP_ROUTES2: Routes = [
  {path: 'holder', component: ListItemHolderComponent ,children:[
    {path: 'listItems', component: ListItemsComponent, outlet: 'list' },
    {path: 'detailsLL/:id', component: ListItemDetailComponent, outlet: 'details' }
  ]},
  // {path: 'detailsLL', component: ListItemDetailComponent, outlet: 'details' }

];


@NgModule({
  imports : [RouterModule.forChild(APP_ROUTES2)],
  exports : [RouterModule]
})
export class AdminRouterModule {
}
