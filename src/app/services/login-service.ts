import {Subject} from "rxjs/Subject";
import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {User} from "../objects/user";
import {Observable} from "rxjs/Observable";
import {CacheService} from "./cacheService";
import {NgbDateParserFormatter} from "@ng-bootstrap/ng-bootstrap";
import {NgForm} from "@angular/forms";
import {ItemsService} from "./itemsService";
/**
 * Created by ilya on 15.04.2018.
 */
@Injectable()
export class LoginService {

  isLogged:boolean = false;
  private _token:string = '';


  constructor(private http:HttpClient, private cashe:CacheService, private itemService:ItemsService) {
    if(sessionStorage.getItem('token')){
      this._token = sessionStorage.getItem('token');
      this.isLogged = true;
    }
  }

  private _loginSuccessSubj:Subject<any> = new Subject();
  private _loginModalOpenRequest:Subject<string> = new Subject();
  private _logoutSuccessSubj:Subject<any> = new Subject();


  get loginSuccessSubj(): Subject<boolean> {
    return this._loginSuccessSubj;
  }

  get loginModalOpenRequest(): Subject<any> {
    return this._loginModalOpenRequest;
  }


  get token(): string {
    return this._token;
  }

  tryLogin(username, password){
    try {
      this.http.post("http://localhost:8080/login", new HttpParams().set("username", username).set("password", password),
        {
          headers: new HttpHeaders().set("Content-type", 'application/x-www-form-urlencoded'),
          observe: 'response'
          // withCredentials: true
        }
      ).switchMap(answ => {
        console.log(answ.headers);
        let auth = answ.headers.get('Authorization');
        this._token = auth;
        sessionStorage.setItem('token',auth);
        return this.http.get("http://localhost:8080/secure/users/getClient",
          {
            // headers: new HttpHeaders().set('Authorization', auth)
            //this allows to send any cookie through cors request
            // withCredentials: true
          })
      }).catch(err => {
        if(err.status == 401)this._loginSuccessSubj.next(false);
        return Observable.throw(err);
      }).subscribe((user: User) => {
        console.log(user);
        this.isLogged = true;
        let userObject = Object.assign(new User(),user);
        this.cashe.set('user',userObject);
        this._loginSuccessSubj.next(userObject);
        this.itemService.synchronizeBucket();
      })
    }
    catch (err) {
      this._loginSuccessSubj.next(false);
    }

  }

  registerNewUser(user:User):Observable<any>{
    console.log(JSON.stringify(user));
   return this.http.post("http://localhost:8080/users/register",JSON.stringify(user),
      {
        headers: new HttpHeaders().set("Content-type",'application/json')
      })
     .catch((err:any) => {
       console.log(err);
       return Observable.throw(err);
     });
  }

  updateUserDetails(user:User){
    return this.http.post("http://localhost:8080/secure/users/updateClient",JSON.stringify(user),
      {
        headers : new HttpHeaders().set("Content-type",'application/json')
      })
  }

  getLoggedUser():Observable<any>{
    if(this.isLogged){
      return this.cashe.get('user',this.http.get("http://localhost:8080/secure/users/getClient")).switchMap((user:User)=>{
        return Observable.of(Object.assign(new User(),user))
      })
    }
    else return Observable.of(new User());
  }

  logOut(){
    this._token = '';
    this.isLogged = false;
    this.cashe.remove('user');
    sessionStorage.removeItem('token');
    this._logoutSuccessSubj.next('logout');
  }

  changePass(form:NgForm){
    return this.http.put("http://localhost:8080/secure/users/passChange",form.value);
  }


}
