/**
 * Created by ilya on 18.03.2018.
 */
export class  Item {

  id:number;
  version;
  price:number;
  theme;
  theme2;
  quantity;
  description;
  bucketQuant:number = 1;

  equals(item:Item):boolean{
    return this.id === item.id;
  }


}
