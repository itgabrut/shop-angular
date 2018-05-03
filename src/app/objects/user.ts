/**
 * Created by ilya on 22.04.2018.
 */
export class User{

  id:number;
  name:string;
  surname:string;
  email:string;
  birth:Date;

  address:Address = new Address();

  password:string;

}

class Address{
  country:string;
  city:string;
  street:string;
  zip:number;
  house:string;
  app:string
}
