import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ItemsService} from "../../services/itemsService";
import {Subscription} from "rxjs/Subscription";
import {Bucket} from "../../objects/bucket";
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {Order} from "../../objects/order";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-my-order',
  templateUrl: './my-order.component.html',
  styleUrls: ['./my-order.component.css']
})
export class MyOrderComponent implements OnInit, OnDestroy {

  bucketSubscriptions:Subscription;
  modalRef:NgbModalRef;
  ordersSubscription:Subscription;
  @ViewChild('content') content:ElementRef;

  type:string;
  alertMessage;
  alertClosed = true;
  orders:Order[];

  constructor(private itemService:ItemsService,private modalService: NgbModal,private router:Router, private actRouter:ActivatedRoute) { }

  ngOnInit() {
    // this.bucketSubscriptions = this.itemService.getBucketSubscription().subscribe((bucket:Bucket) => {
    //   if(bucket.items.length > 0){
    //     this.openModal();
    //   }
    // });
    // this.itemService.notifyBucketSubscribers();
    this.actRouter.fragment.subscribe(res => {
      if(res == 'makeOrder')this.openModal();
    });
    this.ordersSubscription = this.itemService.getOrders().subscribe((res:Order[]) => {
      this.orders = res;
    })
  }

  placeOrder(){
    this.itemService.postOrder().subscribe(res => {
      console.log(res);
      this.itemService.emptyBucket();
      this.type = 'success';
      this.alertMessage = 'You have successfully posted order';
      this.alertClosed = false;
      this.modalRef.close();
      this.itemService.getOrders();
      setTimeout(()=>this.alertClosed = true,10000);
    },error2 => {
      console.error(error2);
      this.modalRef.close();
      this.type = 'danger';
      this.alertMessage = 'Error occurred! Maybe one of the items is out of stock! Please try again!';
      this.alertClosed = false;
    })
  }

  openModal() {
    this.modalRef =  this.modalService.open(this.content,{size:'lg'});

    this.modalRef.result.then((result) => {
      console.log(`Closed with: ${result}`);
    }, (reason) => {
    });
  }

  onRowChosen(orderId){
    if(orderId)this.router.navigate(['/orderDetails',orderId]);
  }


  ngOnDestroy(): void {
    // this.bucketSubscriptions.unsubscribe();
    this.ordersSubscription.unsubscribe();
  }
}
