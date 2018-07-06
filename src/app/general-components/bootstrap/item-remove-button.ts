import {Component} from "@angular/core";
import {ICellRendererAngularComp} from "ag-grid-angular";
import {AdminService} from "../../services/adminService";
import {ICellRendererParams} from "ag-grid";
import {Subject} from "rxjs/Subject";

@Component({
  selector  : 'ag-button',
  template: `<br><button class="btn btn-primary" (click)="makeUpdate($event)">Remove</button>`
})
export class ItemsRemoveButton implements ICellRendererAngularComp{

  params;

  itemId;

  modalEnsureSubject:Subject<any>;

  constructor(public service:AdminService) {
    this.modalEnsureSubject = this.service.modalEnsureSubject;
  }


  agInit(params: ICellRendererParams): void {
    this.params = params;
    this.itemId = params.data.id;
  }


  refresh(params: any): boolean {
    return null;
  }


  makeUpdate(event: any): void {
    event.stopPropagation();
    this.modalEnsureSubject.next(this.itemId);
  }
}
