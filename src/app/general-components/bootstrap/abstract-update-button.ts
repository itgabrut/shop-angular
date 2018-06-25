
import {Component} from "@angular/core";
import {AdminService} from "../../services/adminService";
@Component({
  selector  : 'ag-button',
  template: `<br><button class="btn btn-primary" (click)="makeUpdate($event)">Update</button>`
})
export abstract class UpdateButton{


  constructor( public service:AdminService) {
  }

  abstract makeUpdate(event:any):void;

}
/**
 * Created by ilya on 24.06.2018.
 */
