import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListItemsComponent } from './list-items/list-items.component';
import {AdminRouterModule} from "../admin.router.module";
import {SharedModuleModule} from "../shared-module/shared-module.module";

@NgModule({
  imports: [
    SharedModuleModule,
    AdminRouterModule
  ],
  declarations: [ListItemsComponent]
})
export class AdminModuleModule { }
