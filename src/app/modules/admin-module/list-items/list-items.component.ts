import { Component, OnInit } from '@angular/core';
import {AdminService} from "../../../services/adminService";

@Component({
  selector: 'app-list-items',
  templateUrl: './list-items.component.html',
  styleUrls: ['./list-items.component.css']
})
export class ListItemsComponent implements OnInit {

  constructor(private service:AdminService) { }

  ngOnInit() {
  }

}
