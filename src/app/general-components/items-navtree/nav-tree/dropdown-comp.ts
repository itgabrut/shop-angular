import {NgbDropdownConfig} from "@ng-bootstrap/ng-bootstrap";
import {Component} from "@angular/core";


@Component({
  selector: 'ngbd-dropdown-config',
  template:`<div ngbDropdown>
    <button class="dropdown-item nav-link" id="dropdownMenuButton1" ngbDropdownToggle>Feautures</button>
    <div ngbDropdownMenu  class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
      <div ngbDropdown>
      <button class="dropdown-item" ngbDropdownToggle id="dropdownMenuButton2">Action</button>
        <div ngbDropdownMenu  class="dropdown-menu" aria-labelledby="dropdownMenuButton2">
          <button class="dropdown-item" >Another action</button>
        </div>
      </div>
      <button class="dropdown-item" >Another action</button>
      <a class="dropdown-item" href="#">Something else here</a>
    </div>
  </div>`,
  providers: [NgbDropdownConfig] // add NgbDropdownConfig to the component providers
})
export class NgbdDropdownConfig {
  constructor(config: NgbDropdownConfig) {
    // customize default values of dropdowns used by this component tree
    config.placement = 'bottom-right';
    config.autoClose = false;
  }
}
