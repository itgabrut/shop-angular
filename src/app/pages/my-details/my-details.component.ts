import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {User} from "../../objects/user";
import {LoginService} from "../../services/login-service";
import {NgForm} from "@angular/forms";
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-my-details',
  templateUrl: './my-details.component.html',
  styleUrls: ['./my-details.component.css']
})
export class MyDetailsComponent implements OnInit {

  user:User = new User();
  @ViewChild('passwordChange') passModal:ElementRef;
  modalRef:NgbModalRef;

  constructor(private loginService:LoginService, private modalService:NgbModal) { }

  ngOnInit() {
    this.loginService.getLoggedUser().subscribe((user:User) => {
      this.user = user;
    })
  }

  submitUpdateClient(form:NgForm){
    this.loginService.updateUserDetails(this.user).subscribe((user:User) => {
      alert('Successfully updated user details');
      this.user = user;
    })
  }

  openChangePass(){
   this.modalRef =  this.modalService.open(this.passModal,{
      size : "lg"
    });

    this.modalRef.result.then((result) => {
      console.log(`Closed with: ${result}`);
    }, (reason) => {
      console.log(`Dismissed with: ${reason}`);
    });
  }

  applyChangePass(form:NgForm){
      if(form.value.passwordNew == form.value.passwordNew2){
          this.loginService.changePass(form).subscribe(res => {
            console.log('Password changed: '+ res);
            if(!res)form.controls['password'].setErrors({wrong: true})
          })
      }
      else form.controls['passwordNew2'].setErrors({notEquals: true})
  }



}
