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
    {headerName: 'Birthday', field:'birth',type:"dateColumn", editable: true},
    {headerName: 'Mail', field:'email', editable: true, onCellValueChanged: this.checkEmail},
    {headerName: 'Country', field:'address.country', editable: true},
    {headerName: 'City', field:'address.city', editable: true},
    {headerName: 'Zip', field:'address.zip', editable: true, onCellValueChanged: this.checkZip},
    {headerName: 'House/app', field:'address.house', editable: true},
    {headerName: 'Save', cellRendered: 'btn'}
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

  checkZip(ev){

  }

  static validateEmail(email):boolean {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

}
