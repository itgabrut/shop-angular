
import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  closeResult: string;
  login:boolean = true;

  @ViewChild('content') content:ElementRef;

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
  }

  open() {
    this.modalService.open(this.content,{size:'lg'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      console.log(`Closed with: ${result}`);
    }, (reason) => {
      this.closeResult = `Dismissed ${reason}`;
    });
  }

  toggleLogin(){
    this.login = !this.login;
    return false;
  }

}
