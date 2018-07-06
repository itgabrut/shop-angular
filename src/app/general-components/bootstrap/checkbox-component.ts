
import {Component} from "@angular/core";
import {ICellRendererAngularComp} from "ag-grid-angular";
import {ICellRendererParams} from "ag-grid";

@Component({
  selector: 'ag-checkbox',
  template : `<div class="form-check row ag-checkbox"> <label class="form-check-label col-5">{{isActive()}}</label><input class="form-check-input col-7" [checked]="checked" (click)="$event.stopPropagation()" id="cbx" name="cbx" type="checkbox" (change)="onChange($event)"></div>`
})
export class CheckBoxComponent implements ICellRendererAngularComp{

  checked:boolean = true;
  rowId;


  refresh(params: any): boolean {
    return null;
  }


  agInit(params: ICellRendererParams): void {
    this.checked = params.value;
    this.rowId = params.data.id;
  }

  onChange(event){
    event.stopPropagation();
    this.checked = event.target.checked;
  }

  isActive(){
    return this.checked ? 'Active' : 'Not active'
  }

}
