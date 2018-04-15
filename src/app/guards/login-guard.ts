import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {Injectable} from "@angular/core";
import {LoginService} from "../services/login-service";
/**
 * Created by ilya on 15.04.2018.
 */
@Injectable()
export class LoginGuard implements CanActivate{


  constructor(private loginService:LoginService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    console.log('Gyard works');
    if(!this.loginService.isLogged)this.loginService.loginRequest.next('login');
    return this.loginService.isLogged;
  }
}
