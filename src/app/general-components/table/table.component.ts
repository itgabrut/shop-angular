import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Order} from "../../objects/order";
import {AgGridNg2} from "ag-grid-angular";
import moment = require("moment");
import {Dropdown} from "../bootstrap/dropdown-comp";
import {OrderUpdateButton} from "../bootstrap/order-update-button";
import {DatePicker} from "../bootstrap/datepicker";
import {ClientUpdateButton} from "../bootstrap/client-update-button";
import {ItemsEditButton} from "../bootstrap/item-edit-button";
import {ItemsRemoveButton} from "../bootstrap/item-remove-button";
import {CheckBoxComponent} from "../bootstrap/checkbox-component";

  @Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.css']
  })
export class TableComponent implements OnInit, AfterViewInit {

  @ViewChild('agGrid') aggr:AgGridNg2;
  @Input()content;
  @Input()columnDef;
  @Input()rowSelection = "none";
  @Output()rowChosen:EventEmitter<any> = new EventEmitter();
  @Output()onCellClickedEm:EventEmitter<any> = new EventEmitter();

  api;
  getRowHeight;
  @Input()grnId:Function;
  @Input()rowClass;


  // disable overflow scroll
  domLayout = "autoHeight";

  columnDefs = [
    {headerName: "Id", field: "id"},
    {headerName: "Paid by", field: "payway"},
    {headerName: "Delivery", field: "delivery"},
    {headerName: "Date", field: "date",type:"dateColumn"},
    {headerName: "Delivery Status", field: "deliveryStatus"},
    {headerName: "Pay Status", field: "payStatus"},
  ];

  defColumnDef = {
    cellStyle: { "white-space": "normal",'overflow': 'visible !important' },
    autoHeight:true
  };

  columnTypes = {
    dateColumn : {cellFormatter : function (date) {
      if (date.value instanceof Date)return moment(date.value.toISOString()).format('DD/MM/YYYY');
      else return moment(date.value,"YYYY-MM-DD").format('DD/MM/YYYY');

    }}
  };

  testData = Array.apply(null,Array(10)).map(el => {
    let order = new Order();
    order.date = this.randomDate(new Date(2015,0,1),new Date());
    order.id = Math.random() * 100;
    var latinText =
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit,\
      sed do eiusmod tempor incididunt\ ut labore et dolore magna aliqua Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum";
    order.delivery = latinText;
    return order;
  });

  constructor() {
    this.getRowHeight = function (par) {
      return 90;
    }
  }

  ngOnInit() {
  }


  ngAfterViewInit(): void {

  }

  getComponents(){
    return {
      'drp': Dropdown,
      'orderBtn': OrderUpdateButton,
      'clientBtn':ClientUpdateButton,
      'datepicker': DatePicker,
      'editButton': ItemsEditButton,
      'removeButton': ItemsRemoveButton,
      'checkBox': CheckBoxComponent
    }
  }

  onGridReady(apiEvent){
    this.api = apiEvent.api;
    this.api.sizeColumnsToFit();
    apiEvent.columnApi.autoSizeColumns();
  }
  onRowClicked(event){
    this.rowChosen.emit(event.node.data.id);
    // event.node.setRowHeight(120);
    // this.api.resetRowHeights();
  }
  onCellClicked(event){
    this.onCellClickedEm.emit(event);
    }

  private randomDate(date:Date,date2:Date):Date{
    return new Date(date.getTime() + Math.random() * (date2.getTime() - date.getTime()))
  }

}
