import { Component, OnInit } from '@angular/core';
import {Item} from "../../../objects/item";
import {ActivatedRoute} from "@angular/router";
import {ItemsService} from "../../../services/itemsService";

@Component({
  selector: 'app-admin-edit-item',
  templateUrl: './admin-edit-item.component.html',
  styleUrls: ['./admin-edit-item.component.css']
})
export class AdminEditItemComponent implements OnInit {

  item:Item = new Item();

  customNarrowClasses = ['custom_prev','custom_next','custom_numbertext'];

  constructor(private activatedRoute:ActivatedRoute, private itemService:ItemsService) {

  }

  ngOnInit() {
    this.activatedRoute.paramMap.switchMap(par => {
      return this.itemService.getSingleItem(par.get('id'))
    }).subscribe((item:Item) => {
      this.item = item;
    })
  }

}
