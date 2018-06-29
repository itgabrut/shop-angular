import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Item} from "../../../objects/item";
import {environment} from "../../../../environments/environment";
import {ItemsService} from "../../../services/itemsService";

@Component({
  selector: 'app-list-item-detail',
  templateUrl: './list-item-detail.component.html',
  styleUrls: ['./list-item-detail.component.css']
})
export class ListItemDetailComponent implements OnInit, OnDestroy {

  slides=[];
  item:Item = new Item();

  constructor(private router:Router,private activatedRoute:ActivatedRoute,private itemsService:ItemsService) { }

  ngOnInit() {

    this.activatedRoute.paramMap.switchMap(params => {
      return this.itemsService.getSingleItem(params.get('id'));
    }).subscribe(item => {
      this.item = item;
      this.slides.push({src:environment.url+'/foto/'+this.item.id,hidden:false});
      this.initSlides();});
  }


  ngOnDestroy(): void {
  }

  closeDetails(){
    this.router.navigate(['adminMod/holder']);
  }


  currentSlide(num){
    this.slides.forEach(slide => {
      if(!slide.hidden){
        slide.hidden = true;
        this.slides[num].hidden=false;
        return;
      }
    });
  }

  initSlides(){
    this.itemsService.putForPhotoList(this.item).subscribe(pathList => {
      console.log(pathList);
      pathList.forEach(path => this.slides.push({src:encodeURI(path),hidden:true}))
    });
  }

  plusSlides(dir){
    for(let i = 0;i < this.slides.length;i++){
      if(!this.slides[i].hidden){
        this.slides[i].hidden = true;
        let f = i+dir;
        if(i==0 && dir ==-1)f = 2;
        this.slides[Math.abs(f)%this.slides.length].hidden=false;
        break;
      }
    }
  }
}
