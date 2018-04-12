import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { ItemsComponent } from './pages/items/items.component';
import { ItemsHeadComponent } from './general-components/items-head/items-head.component';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import { NavTreeComponent } from './general-components/items-navtree/nav-tree/nav-tree.component';
import {NgbdDropdownConfig} from "./general-components/items-navtree/nav-tree/dropdown-comp";
import { TreeElComponent } from './general-components/items-navtree/tree-el/tree-el.component';
import {TreeModule} from "angular-tree-component";
import {ItemsService} from "./services/itemsService";
import {HttpClientModule} from "@angular/common/http";
import { SingleComponent } from './pages/items/single/single.component';
import {AppRouterModule} from "./app.router.module";
import {CacheService} from "./services/cacheService";
import {RangePipe} from "./pipes/rangePipe";
import {RouteReuseStrategy} from "@angular/router";
import {CustomReuseStrategy} from "./services/reuseStrategy";
import {CheckoutComponent} from "./pages/checkout/checkout.component";
import {ScrollD} from "./directives/scroll-directive";



@NgModule({
  declarations: [
    AppComponent,
    ItemsComponent,
    ItemsHeadComponent,
    NavTreeComponent,
    NgbdDropdownConfig,
    CheckoutComponent,
    TreeElComponent,
    SingleComponent,
    RangePipe,
    ScrollD
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    TreeModule,
    HttpClientModule,
    AppRouterModule
  ],
  providers: [ItemsService,CacheService,{provide:RouteReuseStrategy, useClass: CustomReuseStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
