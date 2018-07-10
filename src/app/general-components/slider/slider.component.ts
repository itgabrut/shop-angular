import {
  AfterContentInit, AfterViewInit, Component, Input, OnChanges, OnDestroy, OnInit,
  SimpleChanges
} from '@angular/core';
import {Item} from "../../objects/item";
import {ItemsService} from "../../services/itemsService";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit, OnChanges, OnDestroy {

  slides:any[] = [];
  private _item:Item;
  @Input()slideMargin:boolean;
  @Input()imageSize = 'fixed_narrow';
  @Input()narrowClasses = ['prev','next','numbertext'];


 get item(): Item {
    return this._item;
  }


  @Input() set item(value: Item) {
    this._item = value;
  }

  constructor(private itemService:ItemsService) { }

  ngOnInit() {
    console.log('Slider init')
  }


  ngOnDestroy(): void {
    console.log('Slider destroyed')
  }

  ngOnChanges(changes: SimpleChanges): void {
   if(changes.item.previousValue != undefined ){
     this.slides.push({src:environment.url+'/foto/'+this.item.id,hidden:false});
     this.initSlides();
   }

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

}
