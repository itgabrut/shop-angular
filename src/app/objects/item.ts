/**
 * Created by ilya on 18.03.2018.
 */
export class  Item {

  id:number;
  price:number;
  theme;
  theme2;
  quantity;
  description;
  bucketQuant:number = 1;
  active:boolean;

  equals(item:Item):boolean{
    return this.id === item.id;
  }


}
