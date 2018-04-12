import {Component, OnDestroy, OnInit} from '@angular/core';
import {ItemsService} from "../../services/itemsService";
import {Bucket} from "../../objects/bucket";
import {Item} from "../../objects/item";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-items-head',
  templateUrl: './items-head.component.html',
  styleUrls: ['./items-head.component.css']
})
export class ItemsHeadComponent implements OnInit,OnDestroy {

  bucket: Bucket;
  amount:number = 0;
  sum:number = 0;
  subscription:Subscription;


  constructor(private itemService: ItemsService) {
  }

  ngOnInit() {
   this.subscription= this.itemService.getBucketSubscription().subscribe(bucket => {
      this.bucket = bucket;
      this.amount=0;
      this.sum=0;
      this.bucket.map.forEach((quan,item:Item) => {
        this.amount += quan;
        this.sum += item.price * quan;
      })
    });

  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  emptyBucket(){
    this.itemService.emptyBucket();
    return false;
  }
}
