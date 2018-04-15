import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ItemsService} from "../../services/itemsService";
import {Bucket} from "../../objects/bucket";
import {Item} from "../../objects/item";
import {Subscription} from "rxjs/Subscription";
import {LoginComponent} from "../login/login.component";
import {LoginService} from "../../services/login-service";

@Component({
  selector: 'app-items-head',
  templateUrl: './items-head.component.html',
  styleUrls: ['./items-head.component.css']
})
export class ItemsHeadComponent implements OnInit,OnDestroy {

  bucket: Bucket;
  amount:number = 0;
  sum:number = 0;
  itemsSubscription:Subscription;
  loginSubscription:Subscription;

  @ViewChild(LoginComponent) loginEl:LoginComponent;


  constructor(private itemService: ItemsService,private loginService:LoginService) {
  }

  ngOnInit() {
   this.itemsSubscription= this.itemService.getBucketSubscription().subscribe(bucket => {
      this.bucket = bucket;
      this.amount=0;
      this.sum=0;
      this.bucket.map.forEach((quan,item:Item) => {
        this.amount += quan;
        this.sum += item.price * quan;
      })
    });
   this.loginSubscription = this.loginService.loginRequest.subscribe(res => {
     if(res=='login')this.openLogin();
   })

  }


  ngOnDestroy(): void {
    this.itemsSubscription.unsubscribe();
  }

  emptyBucket(){
    this.itemService.emptyBucket();
    return false;
  }

  openLogin(){
    this.loginEl.open();
    return false;
  }
}
