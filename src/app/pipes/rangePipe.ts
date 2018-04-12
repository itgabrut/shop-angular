/**
 * Created by ilya on 08.04.2018.
 */
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'range',
  pure: true
})

export class RangePipe implements PipeTransform {
  transform(items: any[], quantity: number): any {
    items.length = 0;
    if(quantity > 10)quantity = 10;
    for (let i = 0; i < quantity; i++) {
      items.push(i);
    }
    return items;
  }
}
