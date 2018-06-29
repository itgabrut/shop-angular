import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-list-item-holder',
  templateUrl: './list-item-holder.component.html',
  styleUrls: ['./list-item-holder.component.css']
})
export class ListItemHolderComponent implements OnInit {

  useClass = 'col-12';

  constructor(private activatedRoute:ActivatedRoute,private router:Router) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(res =>{
      console.log(res.get('clientId'));
      if(res.get('clientId'))this.router.navigate(['adminMod/holder',{outlets:{details:['detailsLL',res.get('clientId')]}}])
    });

  }

  detailsActivated(event){
    this.useClass = 'col-6';
  }

  detailsDeactivated(event){
    this.useClass = 'col-12'
  }

}
