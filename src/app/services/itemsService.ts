import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {environment} from "../../environments/environment";
import {log} from "util";
import {Subject} from "rxjs/Subject";
import {CacheService} from "./cacheService";
import {Item} from "../objects/item";
import {Bucket} from "../objects/bucket";


@Injectable()
export class ItemsService{


  private itemsSubject = new Subject<any>();
  private bucketSubject = new Subject<Bucket>();


  constructor(private http: HttpClient,private cache: CacheService) {
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
       bucket.add(item);
       this.bucketSubject.next(bucket)
     })
  }

  getBucketOnce(){
     this.cache.get('bucket',Observable.of(new Bucket())).subscribe(bucket => {
      this.bucketSubject.next(bucket);
    })
  }

  getBucketSubscription():Subject<Bucket>{
    return this.bucketSubject;
  }

  emptyBucket(){
    this.cache.get('bucket',Observable.of(new Bucket())).subscribe((bucket:Bucket) =>{
      bucket.clearAll();
      this.bucketSubject.next(bucket)
    })
  }
  minusItem(item:Item){
    this.cache.get('bucket',Observable.of(new Bucket())).subscribe((bucket:Bucket) => {
      bucket.remove(item);
      this.bucketSubject.next(bucket);
    })
  }
}
