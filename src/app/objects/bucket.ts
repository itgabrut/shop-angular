import {Item} from "./item";
/**
 * Created by ilya on 08.04.2018.
 */
export class Bucket{

  private _items:Item[] = [];


  addItems(item:Item){
    let index = this._items.findIndex(it => it.id === item.id);
    if(index != -1)this._items[index].bucketQuant +=item.bucketQuant;
    else {
      this._items.push(Object.assign({},item));
    }
  }
  //should be different objects (items)
  // addMany(item:Item){
  //   let index = this._items.findIndex(it => it.id === item.id);
  //   if(index != -1)this._items[index].bucketQuant += item.bucketQuant;
  //   else {
  //     this._items.push(item);
  //   }
  // }


  remove(item:Item){
    let ind  = this._items.findIndex(it => it.id === item.id);
    if(ind != -1){
      let q = this._items[ind].bucketQuant;
      if(q > 1){
        this._items[ind].bucketQuant--
      }
      else{
        this._items[ind].bucketQuant = 0;
        this._items.splice(ind,1);
      }
    }
  }

  clearAll(){
    this._items.forEach(item => item.bucketQuant = 0);
    this._items = [];
  }

  mergeItems( item:Item){
    let index = this._items.findIndex(it => it.id === item.id);
    if(index!= -1){
      let diff = item.bucketQuant - this._items[index].bucketQuant;
      this._items[index].bucketQuant = diff > 0 ? item.bucketQuant : this._items[index].bucketQuant;
    }
    else this._items.push(item);
  }

  findItem(item:Item):Item{
    let index = this._items.findIndex(it => it.id === item.id);
    return index == -1 ? null : this._items[index];
  }

  // addAll(item:Item,quan){
  //   this._map.set(item,quan);
  // }


  get items(): Item[] {
    return this._items;
  }


  set items(value: Item[]) {
    this._items = value;
  }
}
