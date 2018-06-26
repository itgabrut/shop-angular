
import {AfterViewInit, Component, ViewChild, ViewContainerRef} from "@angular/core";
import {ICellEditorAngularComp} from "ag-grid-angular";
import {ICellEditorParams} from "ag-grid";


@Component({
  selector  : 'ag-date',
  // template: `<div #container><ngb-datepicker #dp [(ngModel)]="model"></ngb-datepicker></div>`
  template: `
    <form class="form-inline">
      <div class="form-group">
        <div class="input-group">
          <input class="form-control" placeholder="yyyy-mm-dd"
                 name="dp" [(ngModel)]="model" ngbDatepicker #d="ngbDatepicker">
          <div class="input-group-append">
            <button class="btn btn-outline-secondary" (click)="d.toggle()" type="button">
              <img src="img/calendar-icon.svg" style="width: 1.2rem; height: 1rem; cursor: pointer;"/>
            </button>
          </div>
        </div>
      </div>
    </form>
  `
})
export class DatePicker implements ICellEditorAngularComp, AfterViewInit{


  model;
  now:Date;

  // @ViewChild('container', {read: ViewContainerRef}) public container;


  agInit(params: ICellEditorParams): void {
    this.now = params.value;
    this.model = {year: this.now.getFullYear(), month: this.now.getMonth() + 1, day: this.now.getDate()};
  }


  getValue(): any {
    return new Date(Date.UTC(this.model.year,this.model.month - 1,this.model.day));
  }

  isPopup(): boolean {
    return true;
  }


  ngAfterViewInit(): void {
    // setTimeout(() => {
    //   this.container.element.nativeElement.focus();
    // })
  }
}

/**
 * Created by ilya on 24.06.2018.
 */
