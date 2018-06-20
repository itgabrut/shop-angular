
import {Component} from "@angular/core";
import {ICellEditorAngularComp, ICellRendererAngularComp} from "ag-grid-angular";
import {ICellRendererParams} from "ag-grid";
@Component({
  selector  : 'drop',
  template: `<br>
  <div ngbDropdown class="d-inline-block">
    <button class="btn btn-outline-primary" id="dropdownBasic1" ngbDropdownToggle >{{selectedTheme}}</button>
    <div ngbDropdownMenu aria-labelledby="dropdownBasic1">
      <button class="dropdown-item"  *ngFor="let item of states" (click)="changeState(item)">{{item}}</button>
    </div>
  </div>`
})
export class Dropdown implements  ICellRendererAngularComp{

  selectedTheme;
  states:[];


  agInit(params: ICellRendererParams): void {
    this.selectedTheme = params.value;
    this.states = params.refData;
  }

  changeState(item){
    console.log(item);
    this.selectedTheme = item;
  }
}
