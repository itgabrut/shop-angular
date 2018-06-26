import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {Order} from "../objects/order";
import {environment} from "../../environments/environment";
import {HttpParamsOptions} from "@angular/common/http/src/params";
import {User} from "../objects/user";
import moment = require("moment");
/**
 * Created by ilya on 17.06.2018.
 */
@Injectable()
export class AdminService{


  constructor(private http:HttpClient) {
    console.log('ADMINSERVICEEEEEEEEEEEEEEEEEEEEE')
  }

  getOrders():Observable<Order[]>{
    return <Observable<Order[]>>this.http.get(environment.url+environment.adminPrefix+environment.gates.order);
  }

  getOrdersByClientId(id:number){
    return <Observable<Order[]>>this.http.get(environment.url+environment.adminPrefix+environment.gates.order+'/'+id);
  }

  getAllClients():Observable<User[]>{
   return <Observable<User[]>>this.http.get(environment.url+environment.adminPrefix+environment.gates.clients).switchMap((res:User[]) =>{
     res.forEach(user => {
       user.birth = moment(user.birth,"YYYY-MM-DD").toDate();
     });
     return Observable.of(res);
   });
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

  updateClient(client:User){
    console.log(client);
   return this.http.post(environment.url +'/secure'+environment.gates.updateClients, client);
  }


}
