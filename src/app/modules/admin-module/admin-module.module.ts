import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListItemsComponent } from './list-items/list-items.component';
import {AdminRouterModule} from "../admin.router.module";
import {SharedModule} from "../shared-module/shared-module.module";
import {ItemsEditButton} from "../../general-components/bootstrap/item-edit-button";
import {ItemsRemoveButton} from "../../general-components/bootstrap/item-remove-button";
import { ListItemDetailComponent } from './list-item-detail/list-item-detail.component';
import { ListItemHolderComponent } from './list-item-holder/list-item-holder.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AdminAddItemComponent} from "../../pages/admin-add-item/admin-add-item.component";

@NgModule({
  imports: [
    SharedModule,
    AdminRouterModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [
    ListItemsComponent,
    ListItemDetailComponent,
    ListItemHolderComponent,
    AdminAddItemComponent
  ]
})
export class AdminModule { }
