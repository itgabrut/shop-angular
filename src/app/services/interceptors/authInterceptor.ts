import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {Injectable} from "@angular/core";
import {LoginService} from "../login-service";
import {environment} from "../../../environments/environment";

/**
 * Created by ilya on 02.05.2018.
 */
@Injectable()
 export class AuthInterceptor implements HttpInterceptor{


  constructor(private loginService:LoginService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
   let urlToCheck = req.url.replace(environment.url,'');
    if(urlToCheck.startsWith('/secure')){
      req =  req.clone({
        setHeaders:{
          Authorization : this.loginService.token
        }
      });
    }
    return next.handle(req);
  }
}
