import {Component, OnDestroy, OnInit} from '@angular/core';
import {AdminService} from "../../../services/adminService";
import {Router} from "@angular/router";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-list-items',
  templateUrl: './list-items.component.html',
  styleUrls: ['./list-items.component.css']
})
export class ListItemsComponent implements OnInit, OnDestroy {

  content;

  itemsSubscription:Subscription;

  columnDef = [
    {headerName: 'Id', field:'id'},
    {headerName: 'Name', field:'name'},
    {headerName: 'Price', field:'price'},
    {headerName: 'Topic', field:'theme'},
    {headerName: 'Eng.Topic', field:'theme2'},
    {headerName: 'In Stock', field:'quantity'},
    {headerName: 'Description', field:'description',cellStyle: { "white-space": "nowrap" }},
    {headerName: 'Edit',cellRenderer: 'editButton'},
    {headerName: 'Remove', cellRenderer: 'removeButton'},
    {headerName: 'Active',field :'active',cellRenderer: 'checkBox'},
  ];

  constructor(private service:AdminService,private router:Router) { }

  ngOnInit() {
    this.itemsSubscription = this.service.getAllItemsObserve().subscribe(res => this.content = res);
    // this.service.getAllItems().subscribe(res => {
    //   this.content = res;
    // })

  }

  onClicked(event){
    this.router.navigate(['adminMod/holder',{clientId:event.node.data.id},{outlets:{details:null}}]);
    // this.router.navigate(['adminMod/holder',{outlets:{details:['detailsLL',event.node.data.id]}}])
  }


  ngOnDestroy(): void {
    this.itemsSubscription.unsubscribe();
  }
}
