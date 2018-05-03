import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ItemsService} from "../../services/itemsService";
import {Bucket} from "../../objects/bucket";
import {Item} from "../../objects/item";
import {Subscription} from "rxjs/Subscription";
import {LoginComponent} from "../login/login.component";
import {LoginService} from "../../services/login-service";
import {User} from "../../objects/user";

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
  logunSuccessSubscrip:Subscription;
  loggedUser:User = new User();

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
   this.loginSubscription = this.loginService.loginModalOpenRequest.subscribe(res => {
     if(res=='login')this.openLogin();
   });
   this.logunSuccessSubscrip = this.loginService.loginSuccessSubj.subscribe((result:any) => {
     if(result && result.id)this.loggedUser = result;
   })

  }


  ngOnDestroy(): void {
    this.itemsSubscription.unsubscribe();
    this.loginSubscription.unsubscribe();
    this.logunSuccessSubscrip.unsubscribe();
  }

  emptyBucket(){
    this.itemService.emptyBucket();
    return false;
  }

  openLogin(){
    this.loginEl.open();
    return false;
  }

  openDetails(){

  }

  logOut(){
    this.loginService.logOut();
  }

  openLoginOrDetails(){
    if(this.loginService.isLogged){
      this.openDetails();
      return false;
    }
    else return this.openLogin();
  }

}
