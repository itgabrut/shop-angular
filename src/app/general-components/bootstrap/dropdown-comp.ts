
import {Component} from "@angular/core";
import {ICellEditorAngularComp, ICellRendererAngularComp} from "ag-grid-angular";
import {ICellRendererParams, RowNode} from "ag-grid";
@Component({
  selector  : 'drop',
  template: `<br>
  <div ngbDropdown class="d-inline-block">
    <button (click)="$event.stopPropagation()" class="btn btn-outline-primary" id="dropdownBasic1" ngbDropdownToggle >{{selectedTheme}}</button>
    <div ngbDropdownMenu aria-labelledby="dropdownBasic1">
      <button class="dropdown-item"  *ngFor="let item of states" (click)="changeState($event,item)">{{item}}</button>
    </div>
  </div>`
})
export class Dropdown implements  ICellRendererAngularComp{


  selectedTheme;
  states:any[]=[];
  api;
  rowId;
  nodeRow:RowNode;
  columnName;


  agInit(params): void {
    this.selectedTheme = params.value;
    this.states = params.refData;
    this.api = params.api;
    this.rowId = params.data.id;
    this.nodeRow = params.node;
    this.columnName = params.column.colDef.field;
  }

  refresh(params: any): boolean {
    return null;
  }

  changeState(event,item){
    event.stopPropagation();
    console.log(item);
    this.selectedTheme = item;
    let data = this.nodeRow.data;
    data[this.columnName] = this.selectedTheme;
    this.nodeRow.updateData(data);
  }
}
