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
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { SingleComponent } from './pages/items/single/single.component';
import {AppRouterModule} from "./app.router.module";
import {CacheService} from "./services/cacheService";
import {RangePipe} from "./pipes/rangePipe";
import {RouteReuseStrategy} from "@angular/router";
import {CustomReuseStrategy} from "./services/reuseStrategy";
import {CheckoutComponent} from "./pages/checkout/checkout.component";
import {ScrollD} from "./directives/scroll-directive";
import {LoginComponent} from "./general-components/login/login.component";
import {MyOrderComponent} from "./pages/my-order/my-order.component";
import {LoginGuard} from "./guards/login-guard";
import {LoginService} from "./services/login-service";
import {FormsModule} from "@angular/forms";
import {AuthInterceptor} from "./services/interceptors/authInterceptor";
import {LocaleInterceptor} from "./services/interceptors/localeInterceptor";
import {MyDetailsComponent} from "./pages/my-details/my-details.component";
import {AgGridModule} from "ag-grid-angular";
import {TableComponent} from "./general-components/table/table.component";
import {OrderDetailsComponent} from "./pages/order-details/order-details.component";
import {AdminOrdersComponent} from "./pages/admin-orders/admin-orders.component";
import {AdminGuard} from "./guards/admin-guard";
import {AdminService} from "./services/adminService";
import {Dropdown} from "./general-components/bootstrap/dropdown-comp";
import {Button} from "./general-components/bootstrap/button";
import {AdminUsersComponent} from "./pages/admin-users/admin-users.component";


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
    ScrollD,
    LoginComponent,
    MyOrderComponent,
    MyDetailsComponent,
    TableComponent,
    OrderDetailsComponent,
    AdminOrdersComponent,
    AdminUsersComponent,
    Dropdown,
    Button
  ],
  entryComponents: [
    Button
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    TreeModule,
    HttpClientModule,
    AppRouterModule,
    FormsModule,
    AgGridModule.withComponents([Dropdown])
  ],
  providers: [ItemsService,
    CacheService,
    {
      provide: RouteReuseStrategy,
      useClass: CustomReuseStrategy
    },
    LoginGuard,
    AdminGuard,
    LoginService,
    AdminService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LocaleInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
