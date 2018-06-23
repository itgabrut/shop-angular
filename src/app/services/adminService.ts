import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {Order} from "../objects/order";
import {environment} from "../../environments/environment";
import {HttpParamsOptions} from "@angular/common/http/src/params";
import {User} from "../objects/user";
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

  getAllClients():Observable<User[]>{
   return <Observable<User[]>>this.http.get(environment.url+environment.adminPrefix+environment.gates.clients);
  }

  updateOrder(node){
    console.log('Update node: '+ node.id);

      let fromObject = {
        orderId : node.id,
        deliveryStatus : node.deliveryStatus,
        payStatus : node.payStatus
      };

    this.http.put(environment.url+environment.adminPrefix+environment.gates.order,fromObject).subscribe(resp => console.log(resp))
  }


}
