import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DatePicker} from "../../general-components/bootstrap/datepicker";
import {ClientUpdateButton} from "../../general-components/bootstrap/client-update-button";
import {OrderUpdateButton} from "../../general-components/bootstrap/order-update-button";
import {Dropdown} from "../../general-components/bootstrap/dropdown-comp";
import {TableComponent} from "../../general-components/table/table.component";
import {AgGridModule} from "ag-grid-angular";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {ItemsEditButton} from "../../general-components/bootstrap/item-edit-button";
import {ItemsRemoveButton} from "../../general-components/bootstrap/item-remove-button";

@NgModule({
  imports: [
    AgGridModule.withComponents([Dropdown, DatePicker,ClientUpdateButton,OrderUpdateButton, ItemsRemoveButton,
      ItemsEditButton]),
    NgbModule.forRoot(),
    FormsModule,
    CommonModule
  ],
  declarations: [
    Dropdown,
    OrderUpdateButton,
    ClientUpdateButton,
    DatePicker,
    TableComponent,
    ItemsRemoveButton,
    ItemsEditButton
  ],
  exports: [
    Dropdown,
    OrderUpdateButton,
    ClientUpdateButton,
    DatePicker,
    TableComponent,
    ItemsRemoveButton,
    ItemsEditButton
  ]
})
export class SharedModule { }
