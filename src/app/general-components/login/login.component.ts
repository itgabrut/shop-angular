
import {
  AfterContentInit, AfterViewInit, Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output,
  ViewChild
} from '@angular/core';
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {FormGroup, NgForm, NgModel} from "@angular/forms";
import {LoginService} from "../../services/login-service";
import {User} from "../../objects/user";
import {Subscription} from "rxjs/Subscription";
import {isUndefined} from "util";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy,AfterViewInit,AfterContentInit {

  closeResult: string;
  login:boolean = true;

  user:User = new User();
  emailForLogin;

  modalRef:NgbModalRef;
  loginSuccessSubscr:Subscription;



  @ViewChild('content') content:ElementRef;
  //doesnt see
  @ViewChild('form') form:any;
  changeSubscr:Subscription;


  constructor(private modalService: NgbModal, private loginService:LoginService) { }

  ngOnInit() {

  }


  ngAfterViewInit(): void {

    this.loginSuccessSubscr = this.loginService.loginSuccessSubj.subscribe(res => {
      if(res){
        this.modalRef.close("login successful");
        this.user = new User();
        this.emailForLogin = '';
      }
      else {
        this.form.controls['username'].setErrors({invalid:true})
      }
    });
  }

  ngAfterContentInit(): void {
  }

  open() {
   this.modalRef =  this.modalService.open(this.content,{size:'lg'});

   this.modalRef.result.then((result) => {
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

  onSubmit(form:NgForm){
   this.form = form;
    console.log(form.value);
    if(form.status == 'INVALID')return;
    if(form.status == 'PENDING'){
      if(this.changeSubscr)return;
      else {
        this.changeSubscr = this.form.statusChanges.subscribe(res =>{
          console.log(res);
          if(res == 'VALID' && form.submitted){
            this.makeSubmit();
          }
        });
      }
    }
    else this.makeSubmit();
  }

  makeSubmit(){
    if(this.login) this.loginService.tryLogin(this.form.value.username,this.form.value.password);
    else {
      this.loginService.registerNewUser(this.user)
        .subscribe((res:User) => {
          console.log(res);
          if(res){
            this.toggleLogin();
            if(this.changeSubscr)this.changeSubscr.unsubscribe();
          }
          this.emailForLogin = res.email;
        });
    }
  }

  clearForm(){
    this.user = new User();
  }

  setForm(form){
    this.form = form;
  }


  ngOnDestroy(): void {
    this.loginSuccessSubscr.unsubscribe();
  }
}
