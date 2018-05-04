

import {HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {isUndefined} from "util";

export class LocaleInterceptor implements HttpInterceptor{


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if( isUndefined(sessionStorage.getItem('locale')) || req.method != 'GET' || sessionStorage.getItem('locale') == null){
      req =  req.clone({
        withCredentials : true
      });

      return next.handle(req);
    }
    else{
      let locale = sessionStorage.getItem('locale');

     req =  req.clone({
        params : new HttpParams().append('lang',locale),
       withCredentials : true
      });

      // let req2:HttpRequest<any> = req.clone({
      //   setParams : {
      //     'lang' : sessionStorage.getItem('locale')
      //   }
      // });
      sessionStorage.removeItem('locale');
      return next.handle(req);
    }
  }
}
