import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Order} from "../../objects/order";
import {AgGridNg2} from "ag-grid-angular";
import moment = require("moment");
import {Dropdown} from "../bootstrap/dropdown-comp";
import {Button} from "../bootstrap/button";

  @Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.css']
  })
export class TableComponent implements OnInit, AfterViewInit {

  @ViewChild('agGrid') aggr:AgGridNg2;
  @Input()content;
  @Input()columnDef;
  @Output()rowChosen:EventEmitter<any> = new EventEmitter();

  api;
  getRowHeight;
  @Input()grnId:Function;


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
    cellStyle: { "white-space": "normal" },
    autoHeight:true
  };

  columnTypes = {
    dateColumn : {cellFormatter : function (date) {
      if (date.value instanceof Date)return moment(date.value.toISOString()).format('DD/MM/YYYY');
      else return moment(date.value,"DD-MM-YYYY").format('DD/MM/YYYY');

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
      'btn': Button
    }
  }

  onGridReady(apiEvent){
    this.api = apiEvent.api;
    this.api.sizeColumnsToFit();
    apiEvent.columnApi.autoSizeColumns();
  }
  onRowSelected(event){
    this.rowChosen.emit(event.node.data.id);
    // event.node.setRowHeight(120);
    // this.api.resetRowHeights();
  }

  private randomDate(date:Date,date2:Date):Date{
    return new Date(date.getTime() + Math.random() * (date2.getTime() - date.getTime()))
  }

}
