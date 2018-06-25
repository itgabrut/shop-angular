import {UpdateButton} from "./abstract-update-button";
import {ICellRendererAngularComp} from "ag-grid-angular";
import {ICellRendererParams} from "ag-grid";
import {AdminService} from "../../services/adminService";
import {Injectable} from "@angular/core";
/**
 * Created by ilya on 24.06.2018.
 */
@Injectable()
export class ClientUpdateButton extends UpdateButton implements ICellRendererAngularComp{

  params;

  constructor(public service:AdminService) {
    super();
  }


  agInit(params: ICellRendererParams): void {
    this.params = params;
  }


  refresh(params: any): boolean {
    return null;
  }


  makeUpdate(event: any): void {
    this.service.updateClient(this.params.node.data);
  }
}
