
import {ICellRendererAngularComp} from "ag-grid-angular";
import {ICellRendererParams} from "ag-grid";
import {AdminService} from "../../services/adminService";
import {Component, Injectable} from "@angular/core";
/**
 * Created by ilya on 24.06.2018.
 */
@Component({
  selector  : 'ag-button',
  template: `<br><button class="btn btn-primary" (click)="makeUpdate($event)">Update</button>`
})
export class ClientUpdateButton implements ICellRendererAngularComp{

  params;

  constructor(public service:AdminService) {
  }


  agInit(params: ICellRendererParams): void {
    this.params = params;
  }


  refresh(params: any): boolean {
    return null;
  }


  makeUpdate(event: any): void {
    event.stopPropagation();
    this.service.updateClient(this.params.node.data).subscribe(res => console.log('Updated client: '+ res))
  }
}
