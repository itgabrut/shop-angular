import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {environment} from "../../environments/environment";
import {log} from "util";
import {Subject} from "rxjs/Subject";
import {CacheService} from "./cacheService";
import {Item} from "../objects/item";
import {Bucket} from "../objects/bucket";
import {Subscription} from "rxjs/Subscription";
import {Order} from "../objects/order";


@Injectable()
export class ItemsService{


  private itemsSubject = new Subject<any>();
  private bucketSubject = new Subject<Bucket>();
  private ordersSubscription = new Subject<Order[]>();


  constructor(private http: HttpClient, private cache: CacheService) {
  }

  getItems():Subject<any>{
   return this.itemsSubject;
  }


  // getCatalog(){
  //   return this.http.get('http://localhost:8080/catalog').subscribe(res => console.log(res));
  // }

  getCatalogCors():Observable<any>{
    // return this.http.get(environment.url+environment.gates.catalog);
    return this.cache.get('catalog',this.http.get(environment.url+environment.gates.catalog));
  }

  getItemsByTheme(theme){
     // this.http.get(environment.url+environment.gates.items, { params: new HttpParams().set('theme', theme) })
     //   .subscribe(resp =>{
     //    this.itemsSubject.next(resp);
     // })
    this.cache.get('items'+theme,this.http.get(environment.url+environment.gates.items, { params: new HttpParams().set('theme', theme) }))
      .subscribe(resp => {
        this.itemsSubject.next(resp);
      })
  }

  private getItemsByThemeInternal(theme):Observable<any>{
    return this.cache.get('items'+theme,this.http.get(environment.url+environment.gates.items, { params: new HttpParams().set('theme', theme) }));
  }

  getDefaultItems(){
    let defItemPath;
   return this.getCatalogCors().switchMap(themes => {
      defItemPath = themes[0];
      return this.getItemsByThemeInternal(defItemPath);
    });
  }

  putForPhotoList(item: Item):Observable<any> {
   return this.http.put(environment.url+environment.gates.photo,JSON.stringify(item),{ headers: new HttpHeaders({
      'Content-Type':  'application/json',})})
  }

  getSingleItem(id):Observable<any> {
   return this.http.get(environment.url+environment.gates.item, {params : new HttpParams().set('id',id)})
  }

  addToBucket(item:Item){
     this.cache.get('bucket',Observable.of(new Bucket())).subscribe((bucket:Bucket) =>{
       bucket.addItems(item);
       this.bucketSubject.next(bucket);
       this.updateServerItems([bucket.findItem(item)])
     })
  }

  // addToBucketMany(item:Item){
  //   this.cache.get('bucket',Observable.of(new Bucket())).subscribe((bucket:Bucket) =>{
  //     bucket.addMany(item);
  //     this.bucketSubject.next(bucket);
  //     this.updateServerItems([bucket.findItem(item)])
  //   })
  // }

  notifyBucketSubscribers(){
     this.cache.get('bucket',Observable.of(this.getMapFromSessionStorage())).subscribe(bucket => {
      this.bucketSubject.next(bucket);
    })
  }

  getBucket():Observable<Bucket>{
    return this.cache.get('bucket',Observable.of(this.getMapFromSessionStorage()));
  }


  getBucketSubscription():Subject<Bucket>{
    return this.bucketSubject;
  }

  emptyBucket(){
    this.cache.get('bucket',Observable.of(new Bucket())).subscribe((bucket:Bucket) =>{
      bucket.clearAll();
      this.bucketSubject.next(bucket);
      this.http.delete(environment.url + '/secure' + environment.gates.bucket).catch(err => {
        console.log(err);
        return Observable.throw(err);
      }).subscribe(answ => console.log(answ))
    })
  }

  minusItem(item:Item){
    this.cache.get('bucket',Observable.of(new Bucket())).subscribe((bucket:Bucket) => {
      bucket.remove(item);
      this.bucketSubject.next(bucket);
      this.updateServerItems([item])
    })
  }

  synchronizeBucket(){
    this.http.get(environment.url + '/secure' + environment.gates.bucket).subscribe((answ:Item[]) => {
      let serverBucket = new Bucket();
      serverBucket.items.push.apply(serverBucket.items,answ);

      this.cache.get('bucket',Observable.of(this.getMapFromSessionStorage())).subscribe((frontBucket:Bucket) => {
        this.mergeBuckets(frontBucket, serverBucket);
        this.updateServerItems(frontBucket.items);
        this.bucketSubject.next(frontBucket);
      })
    })
  }

  postOrder():Observable<Object>{
   return this.getBucket().switchMap((bucket:Bucket) => {
      if(bucket.items.length > 0){
        return this.http.post(environment.url + '/secure' + environment.gates.order,bucket.items).catch(err => {
          console.log(err);
          return Observable.throw(err);
        })
      }
      else return Observable.of('empty bucket');
    });

  }

  getOrders():Observable<Object>{
     this.http.get(environment.url+ '/secure' + environment.gates.order).subscribe((res:Order[]) => {
       this.ordersSubscription.next(res);
     });
    return this.ordersSubscription;
  }

  private updateServerItems(items:Item[]){
    this.http.put(environment.url + '/secure' + environment.gates.bucket,items).catch(err => {
      console.log(err);
      return Observable.throw(err);
    }).subscribe(answ => {
      console.log(answ);
    }, err => {
      console.error(err);
    })
  }



  private getMapFromSessionStorage():Bucket{
   let bucket:Bucket = new Bucket();
     if(sessionStorage.getItem("bucket")){

       bucket.items = JSON.parse(sessionStorage.getItem("bucket"));
     }
     return bucket;
  }

  private mergeBuckets(frontBucket:Bucket,serverBucket:Bucket):Bucket{
    serverBucket.items.forEach(item => {
      frontBucket.mergeItems(item);
    });
    return frontBucket;
  }
}
