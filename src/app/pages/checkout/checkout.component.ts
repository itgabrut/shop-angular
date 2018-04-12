import {Component, OnDestroy, OnInit} from '@angular/core';
import {ItemsService} from "../../services/itemsService";
import {Bucket} from "../../objects/bucket";
import {Subscription} from "rxjs/Subscription";
import {Item} from "../../objects/item";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit, OnDestroy {

  bucket: Bucket;
  helpArray=[];
  subscription:Subscription;

  constructor(private itemService : ItemsService) { }

  ngOnInit() {
   this.subscription = this.itemService.getBucketSubscription().subscribe(bucket => {
      this.bucket = bucket;
      this.helpArray = [];
      this.bucket.map.forEach((entryVal, entryKey) => {
        this.helpArray.push({
          item: entryKey,
          quan: entryVal
        });
      })
    });
    this.itemService.getBucketOnce();
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  minusItem(item:Item){
    this.itemService.minusItem(item);
  }
}
