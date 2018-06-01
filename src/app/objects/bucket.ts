import {Item} from "./item";
/**
 * Created by ilya on 08.04.2018.
 */
export class Bucket{

  private _map:Map<Item,number> = new Map();


  set map(value: Map<Item, number>) {
    this._map = value;
  }


  get map(): Map<Item, number> {
    return this._map;
  }

  addOne(item:Item){
    if(this._map.has(item))this._map.set(item,this._map.get(item)+1);
    else this._map.set(item,1);
  }

  remove(item:Item){
    if(this._map.get(item)){
      let q = this._map.get(item);
      q > 1 ? this._map.set(item,this._map.get(item)-1) : this._map.delete(item);
    }
  }

  clearAll(){
    this._map.clear();
  }

  mergeItems(it:Item, item:Item){
    this._map.set(it,this._map.get(it) + item.quantity)
  }

  addAll(item:Item,quan){
    this._map.set(item,quan);
  }

}
