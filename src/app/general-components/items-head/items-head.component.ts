import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ItemsService} from "../../services/itemsService";
import {Bucket} from "../../objects/bucket";
import {Item} from "../../objects/item";
import {Subscription} from "rxjs/Subscription";
import {LoginComponent} from "../login/login.component";
import {LoginService} from "../../services/login-service";
import {User} from "../../objects/user";
import {Router} from "@angular/router";

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
  loginSuccessSubscrip:Subscription;
  loggedUser:User = new User();

  @ViewChild(LoginComponent) loginEl:LoginComponent;


  constructor(private itemService: ItemsService,private loginService:LoginService,private route:Router) {
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
   this.loginSuccessSubscrip = this.loginService.loginSuccessSubj.subscribe((result:any) => {
     if(result && result.id)this.loggedUser = result;
   });
    this.loginService.getLoggedUser().subscribe((user:User) => {
     this.loggedUser = user;
    });

  }


  ngOnDestroy(): void {
    this.itemsSubscription.unsubscribe();
    this.loginSubscription.unsubscribe();
    this.loginSuccessSubscrip.unsubscribe();
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
    this.route.navigate(['/myDetails']);
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

  engLocale(){
    sessionStorage.setItem('locale','en');
    return false;
  }

  rusLocale(){
    sessionStorage.setItem('locale','ru_RU');
    return false;
  }

}
