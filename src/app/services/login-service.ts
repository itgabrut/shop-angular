import {Subject} from "rxjs/Subject";
import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
/**
 * Created by ilya on 15.04.2018.
 */
@Injectable()
export class LoginService {

  userId:number;
  isLogged:boolean = false;


  constructor(private http:HttpClient) {
  }

  private _loginRequest:Subject<string> = new Subject();


  get loginRequest(): Subject<any> {
    return this._loginRequest;
  }

  tryLogin(username, password){
    this.http.post("http://localhost:8080/login",new HttpParams().set("username",username).set("password",password),
      {headers : new HttpHeaders().set("Content-type",'application/x-www-form-urlencoded')}).subscribe(answ => {
        console.log(answ);
    })
  }


}
