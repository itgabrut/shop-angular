import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {Order} from "../objects/order";
import {environment} from "../../environments/environment";
/**
 * Created by ilya on 17.06.2018.
 */
@Injectable()
export class AdminService{


  constructor(private http:HttpClient) {
  }

  getOrders():Observable<Order[]>{
    return <Observable<Order[]>>this.http.get(environment.url+environment.adminPrefix+environment.gates.order);
  }


}
