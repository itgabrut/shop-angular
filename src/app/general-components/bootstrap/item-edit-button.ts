import {Component} from "@angular/core";
import {ICellRendererAngularComp} from "ag-grid-angular";
import {AdminService} from "../../services/adminService";
import {ICellRendererParams} from "ag-grid";
import {Router} from "@angular/router";

@Component({
  selector  : 'ag-button',
  template: `<br><button class="btn btn-primary" (click)="makeUpdate($event)">Edit</button>`
})
export class ItemsEditButton implements ICellRendererAngularComp{

  params;

  constructor(public service:AdminService,private router:Router) {
  }


  agInit(params: ICellRendererParams): void {
    this.params = params;
  }


  refresh(params: any): boolean {
    return null;
  }


  makeUpdate(event: any): void {
    event.stopPropagation();
  }
}
