import {Component, OnDestroy, OnInit} from '@angular/core';
import {ItemsService} from "../../services/itemsService";
import {Bucket} from "../../objects/bucket";
import {Subscription} from "rxjs/Subscription";
import {Item} from "../../objects/item";
import {Router} from "@angular/router";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit, OnDestroy {

  bucket: Bucket;
  helpArray=[];
  subscription:Subscription;
  sum = 0;

  constructor(private itemService : ItemsService,private router:Router) { }

  ngOnInit() {
   this.subscription = this.itemService.getBucketSubscription().subscribe(bucket => {
      this.bucket = bucket;
      this.helpArray = [];
      this.sum = 0;
      this.bucket.items.forEach((item, index) => {
        this.helpArray.push({
          item: item,
          quan: item.bucketQuant
        });
        this.sum += item.price * item.bucketQuant;
      })
    });
    this.itemService.notifyBucketSubscribers();
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  minusItem(item:Item){
    this.itemService.minusItem(item);
  }

  doCheckout(){
    this.router.navigate(['/myOrders'],{fragment : 'makeOrder'});
    return false;
  }
}
