import { Component, OnInit } from '@angular/core';
import {Order} from "../../objects/order";
import {AdminService} from "../../services/adminService";
import {Router} from "@angular/router";

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {

  orders:Order[] = [];


  constructor(private service:AdminService,private router:Router) { }

  ngOnInit() {
    this.service.getOrders().subscribe((orders:Order[])=>{
      this.orders = orders;
    })
  }

  columnDef = [
    {headerName:"Client name", field: "client.name"},
    {headerName:"Client registered", field: "client.registered",type:"dateColumn"},
    {headerName:"Order Id", field: "id"},
    {headerName: "Delivery", field: "delivery"},
    {headerName: "Date", field: "date",type:"dateColumn"},
    {headerName: "Delivery Status", field: "deliveryStatus",width:340,cellRenderer:'drp',cellRendererParams:{refData:['WAITING_FOR_PAYMENT','PROCESSED',
    'DELIVERED','CANCELLED']}},
    {headerName: "Pay Status", field: "payStatus", cellRenderer:'drp',cellRendererParams:{refData:['WAITING','PAYED']}},
    {headerName:"Save",cellRenderer:'orderBtn'}
  ];


  grnId(data){
    return data.id;
  }
  // deliveryStatus(params):string{
  //   return '<div class="row">\
  //     <div class="col">\
  //     <div ngbDropdown class="d-inline-block">\
  //   <button class="btn btn-outline-primary" id="dropdownBasic1" ngbDropdownToggle>Toggle dropdown</button>\
  //   <div ngbDropdownMenu aria-labelledby="dropdownBasic1">\
  //   <button class="dropdown-item">Action - 1</button>\
  //   <button class="dropdown-item">Another Action</button>\
  //   <button class="dropdown-item">Something else is here</button>\
  //   </div>\
  //   </div>\
  //   </div>\
  //   </div>'
  //   // return '<button class="btn">Check</button>';
  // }

  rowChosen(orderId){
    if(orderId)this.router.navigate(['/orderDetails',orderId]);
  }

}
