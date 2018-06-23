import {Component} from "@angular/core";
import {ICellRendererAngularComp} from "ag-grid-angular";
import {GridApi, ICellRendererParams} from "ag-grid";
import {AdminService} from "../../services/adminService";

@Component({
  selector  : 'ag-button',
  template: `<br><button class="btn btn-primary" (click)="makeUpdate()">Update</button>`
})
export class Button implements ICellRendererAngularComp{


  constructor(private adminService :AdminService) {
  }

  api:GridApi;
  params:ICellRendererParams;
  agInit(params: ICellRendererParams): void {
    this.params = params;
  }


  refresh(params: any): boolean {
    return null;
  }

  makeUpdate(){
    this.adminService.updateOrder(this.params.node.data);
  }
}
