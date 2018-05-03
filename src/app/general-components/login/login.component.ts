
import {AfterViewInit, Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {FormGroup, NgForm} from "@angular/forms";
import {LoginService} from "../../services/login-service";
import {User} from "../../objects/user";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy,AfterViewInit {
  closeResult: string;
  login:boolean = true;

  user:User = new User();
  emailForLogin;

  modalRef:NgbModalRef;
  loginSuccessSubscr:Subscription;

  @ViewChild('content') content:ElementRef;
  @ViewChild(NgForm) el:NgForm;


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
        this.el.controls['username'].setErrors({invalid:true})
      }
    });
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
   this.el = form;
    console.log(form);
    console.log(form.value);
    if(this.login) this.loginService.tryLogin(form.value.username,form.value.password);
    else {
      this.loginService.registerNewUser(this.user)
        .subscribe((res:User) => {
        console.log(res);
        if(res)this.toggleLogin();
        this.emailForLogin = res.email;
      });
    }
  }

  clearForm(){
    this.user = new User();
  }


  ngOnDestroy(): void {
    this.loginSuccessSubscr.unsubscribe();
  }
}
