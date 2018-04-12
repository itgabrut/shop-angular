import {Component, OnDestroy, OnInit} from '@angular/core';
import {Item} from "../../objects/item";
import {ItemsService} from "../../services/itemsService";
import {Subject} from "rxjs/Subject";
import {Router} from "@angular/router";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit,OnDestroy {

  page = 1;
  offset = 0;
  showOnPage = 9;

  subscription: Subscription;


  items:Item[] = [];
  helper:Item[];

  constructor(private itemsService: ItemsService, private router:Router) {
    // this.items = Array.apply(null,Array(30)).map(function (x,ind) {
    //   return new Item(ind);
    // });
  }

  ngOnInit() {
    this.itemsService.getDefaultItems().subscribe(defItems => this.items = defItems);
   this.subscription = this.itemsService.getItems().subscribe(data => {
     this.items = data;});
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  displayItems(i:number){

    if(i >= this.offset && i < (this.offset + this.showOnPage)){
      return 'inline-block';
    }
    return 'none';
  }

  test(){
    return this.items.filter( (el,i) => {
      return i >= this.offset && i < (this.offset + this.showOnPage);
    });

  }

  changePage(ev){
    if(ev === 1){
      this.offset = 0;
      return;
    }
    this.offset = this.showOnPage*(ev-1) + 1;
  }

  goToItem(item:Item){
    this.router.navigate(['/single',{id:item.id}]);
  }

  addToBacket(item:Item,event){
    event.stopPropagation();
    this.itemsService.addToBucket(item);
  }

  // getCatalog(){
  //   this.itemsService.getCatalog();
  // }

}
