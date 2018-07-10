import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Item} from "../../../objects/item";
import {environment} from "../../../../environments/environment";
import {ItemsService} from "../../../services/itemsService";

@Component({
  selector: 'app-list-item-detail',
  templateUrl: './list-item-detail.component.html',
  styleUrls: ['./list-item-detail.component.css']
})
export class ListItemDetailComponent implements OnInit, OnDestroy {

  slides=[];
  item:Item = new Item();

  constructor(private router:Router,private activatedRoute:ActivatedRoute,private itemsService:ItemsService) { }

  ngOnInit() {

    this.activatedRoute.paramMap.switchMap(params => {
      return this.itemsService.getSingleItem(params.get('id'));
    }).subscribe(item => {
      this.item = item;
    });

  }


  ngOnDestroy(): void {
  }

  closeDetails(){
    this.router.navigate(['adminMod/holder']);
  }


}
