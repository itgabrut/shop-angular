import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {Subscription} from "rxjs/Subscription";
import {AdminService} from "../../../services/adminService";

@Component({
  selector: 'app-list-item-holder',
  templateUrl: './list-item-holder.component.html',
  styleUrls: ['./list-item-holder.component.css']
})
export class ListItemHolderComponent implements OnInit ,OnDestroy {

  useClass = 'col-12';

  @ViewChild('deleteEnsure')passModal;

  modalRef:NgbModalRef;
  modalEnsureSubjectSubs:Subscription;

  itemIdToDelete;

  constructor(private activatedRoute:ActivatedRoute,private router:Router,private modalService:NgbModal,private adminService:AdminService) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(res =>{
      console.log(res.get('clientId'));
      if(res.get('clientId'))this.router.navigate(['adminMod/holder',{outlets:{details:['detailsLL',res.get('clientId')]}}])
    });
    this.modalEnsureSubjectSubs = this.adminService.modalEnsureSubject.subscribe(res => {
      if(res){
        this.itemIdToDelete = res;
        this.openEnsureModal();
      }
    })
  }

  detailsActivated(event){
    this.useClass = 'col-6';
  }

  detailsDeactivated(event){
    this.useClass = 'col-12'
  }

  openEnsureModal(){
    this.modalRef =  this.modalService.open(this.passModal,{
      size : "sm"
    });

    this.modalRef.result.then((result) => {
      console.log(`Closed with: ${result}`);
    }, (reason) => {
      console.log(`Dismissed with: ${reason}`);
    });
  }

  deleteItem(){
    if(this.itemIdToDelete){
      this.adminService.deleteItem(this.itemIdToDelete).subscribe(res => {
        console.log('Item With id : '+this.itemIdToDelete+' Result: '+res);
        if(res){
          this.modalRef.close();
          this.adminService.getAllItemsObserve();
        }
      })
    }
  }


  ngOnDestroy(): void {
    this.modalEnsureSubjectSubs.unsubscribe();
  }
}
