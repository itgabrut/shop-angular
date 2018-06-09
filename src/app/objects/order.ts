export class Order{



  id:number;
  payway:string = 'Card';
  delivery:string = 'Airmail';
  date:Date = new Date();
  deliveryStatus:string = 'In process';
  payStatus:string = 'Waiting';

}
