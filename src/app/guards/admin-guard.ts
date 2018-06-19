/**
 * Created by ilya on 17.06.2018.
 */
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from "@angular/router";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {LoginService} from "../services/login-service";
import {User} from "../objects/user";

@Injectable()
export class AdminGuard implements CanActivate{


  constructor(private login:LoginService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.login.getLoggedUser().switchMap((user:User) => {
      return Observable.of(user.isAdmin());
    })
  }
}
