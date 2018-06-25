import { Component, OnInit } from '@angular/core';
import {User} from "../../objects/user";
import {AdminService} from "../../services/adminService";

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {

  clients:User[];

  columnDef = [
    {headerName: 'Client Id', field:'id'},
    {headerName: 'Name', field:'name', editable: true},
    {headerName: 'Surname', field:'surname', editable: true},
    {headerName: 'Birthday', field:'birth',type:"dateColumn", editable: true, cellEditor: "datepicker"},
    {headerName: 'Mail', field:'email', editable: true, onCellValueChanged: this.checkEmail},
    {headerName: 'Country', field:'address.country', editable: true},
    {headerName: 'City', field:'address.city', editable: true},
    {headerName: 'Zip', field:'address.zip', editable: true, onCellValueChanged: this.checkZip},
    {headerName: 'House/app', field:'address.house', editable: true},
    {headerName: 'Save', cellRenderer: 'clientBtn'}
  ];

  constructor(private service:AdminService) { }

  ngOnInit() {
    this.service.getAllClients().subscribe((clients:User[]) => {
      this.clients = clients;
    })
  }

  checkEmail(event){
    console.log(event);
    let user:User = event.node.data;
    if(!AdminUsersComponent.validateEmail(user.email)){
      user.email = event.oldValue;
      event.node.setData(user);
    }
  }

  checkZip(event){
    let user:User = event.node.data;
    if(!AdminUsersComponent.validateZip(user.address.zip)){
      user.address.zip = event.oldValue;
      event.node.setData(user);
    }
  }

  static validateEmail(email):boolean {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  static validateZip(zip){
    let patt = /^[0-9]{6}$/;
    return patt.test(String(zip));
  }

}
