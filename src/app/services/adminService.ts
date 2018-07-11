import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {Order} from "../objects/order";
import {environment} from "../../environments/environment";
import {User} from "../objects/user";
import moment = require("moment");
import {Item} from "../objects/item";
import {Subject} from "rxjs/Subject";
/**
 * Created by ilya on 17.06.2018.
 */
@Injectable()
export class AdminService{


  constructor(private http:HttpClient) {
    console.log('ADMINSERVICEEEEEEEEEEEEEEEEEEEEE')
  }

  modalEnsureSubject:Subject<any> = new Subject();
  itemsSubject:Subject<Item[]> = new Subject();
  sliderPhotoSubject:Subject<any> = new Subject();

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


  getAllItems():Observable<Item[]>{
    return <Observable<Item[]>>this.http.get(environment.url+environment.adminPrefix+environment.gates.allItems)
  }

  getAllItemsObserve():Observable<Item[]>{
    this.getAllItems().subscribe((res:Item[])=>{
      this.itemsSubject.next(res);
    });
    return this.itemsSubject;
  }

  postNewItem(formData):Observable<any>{
    return this.http.post(environment.url+environment.adminPrefix+'/postItem',formData)
  }

  putItem(dataObject:FormData):Observable<any>{
    return this.http.post(environment.url+environment.adminPrefix+'/putItem',dataObject)
  }

  deleteItem(id){

    return this.http.post(environment.url+environment.adminPrefix+environment.gates.removeItem,
      new HttpParams().set('id',id),
      {
      headers: new HttpHeaders().set("Content-type", 'application/x-www-form-urlencoded')
    })
  }

  activator(itemId,isActive){
    return this.http.get(environment.url+environment.adminPrefix+'/activateItem/'+itemId,{params : {active: isActive}})

  }


}
