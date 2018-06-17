import { Component, OnInit } from '@angular/core';
import {ItemsService} from "../../services/itemsService";
import {Subscription} from "rxjs/Subscription";
import {Order} from "../../objects/order";
import {ActivatedRoute} from "@angular/router";
import {Item} from "../../objects/item";

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

  helpArray;
  items:Item[];
  orderSubscription:Subscription;
  sum = 0;

  constructor(private itemService:ItemsService, private actRoute:ActivatedRoute) { }

  ngOnInit() {
    this.actRoute.params.switchMap(params => {
      let id = +params['id'];
      return this.itemService.getItemsByOrder(id);
    }).subscribe((items:Item[]) => {
      this.items = items;
      this.sum = 0;
      this.items.forEach(item => this.sum += item.price * item.bucketQuant)
    });
    // this.orderSubscription = this.itemService.getOrders().subscribe((orders:Order[]) => {
    //
    // })
  }

}
