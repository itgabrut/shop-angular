import {Item} from "./item";
/**
 * Created by ilya on 08.04.2018.
 */
export class Bucket{

  map:Map<Item,number> = new Map();

  add(item:Item){
    if(this.map.has(item))this.map.set(item,this.map.get(item)+1);
    else this.map.set(item,1);
  }

  remove(item:Item){
    if(this.map.get(item)){
      let q = this.map.get(item);
      q > 1 ? this.map.set(item,this.map.get(item)-1) : this.map.delete(item);
    }
  }

  clearAll(){
    this.map.clear();
  }

}
