import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Item} from "../../../objects/item";
import {ItemsService} from "../../../services/itemsService";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-single',
  templateUrl: './single.component.html',
  styleUrls: ['./single.component.css']
})
export class SingleComponent implements OnInit {


  slideIndex = 1;
  slides=[];
  item:Item = new Item();
  @ViewChild('selected')selectRef:ElementRef;


  constructor(private rout:Router, private activeRoute:ActivatedRoute,private itemService:ItemsService) { }

  ngOnInit() {

    this.activeRoute.paramMap.switchMap(params => {
     return this.itemService.getSingleItem(params.get('id'));
    }).subscribe(item => {
      this.item = item;
      this.slides.push({src:environment.url+'/foto/'+this.item.id,hidden:false});
      this.initSlides();});

    // this.slides = [{src:'https://www.jssor.com/demos/img/gallery/980x380/032.jpg',hidden:false},
    //   {src:'https://images.pexels.com/photos/236047/pexels-photo-236047.jpeg?auto=compress&cs=tinysrgb&h=350',hidden:true},
    //   {src:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwDyYzbW1K4d79neRIvOsKI5VT88ogS1xxgOxDzS53HkbPYEI6',hidden:true}]
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
    this.itemService.putForPhotoList(this.item).subscribe(pathList => {
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

  addItemsToBucket(){
    let num = Number(this.selectRef.nativeElement.value);
    this.item.bucketQuant = num;
    this.itemService.addToBucket(this.item);

    return false;
  }

}
