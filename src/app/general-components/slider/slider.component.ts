import {
  AfterContentInit, AfterViewInit, ChangeDetectorRef, Component, Input, OnChanges, OnDestroy, OnInit,
  SimpleChanges
} from '@angular/core';
import {Item} from "../../objects/item";
import {ItemsService} from "../../services/itemsService";
import {environment} from "../../../environments/environment";
import {AdminService} from "../../services/adminService";
import {Subscription} from "rxjs/Subscription";

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
  @Input()enableCloseSign:boolean = false;

  sliderSubscription:Subscription;

  private _deletableSlide:boolean;


  get deletableSlide() {
    return this._deletableSlide && this.enableCloseSign;
  }

  get item(): Item {
    return this._item;
  }


  @Input() set item(value: Item) {
    this._item = value;
  }

  constructor(private itemService:ItemsService, private adminService:AdminService, private cd: ChangeDetectorRef) { }

  ngOnInit() {
    console.log('Slider init');
    this.sliderSubscription = this.adminService.sliderPhotoSubject.subscribe(res => {
      if(res.mainImage){
        this.slides[0]['src'] = res.mainImage;
        // this.slides.forEach(slide => slide.hidden = true);
        for(let i = 0;i< this.slides.length;i++){
          this.slides[i]['hidden'] = true;
        }
        this.slides[0]['hidden'] = false;
      }
      else if(res.addImage){
        // this.slides.forEach(slide => slide.hidden = true);
        for(let i = 0;i< this.slides.length;i++){
          this.slides[i]['hidden'] = true;
        }
        this.slides.push({src:res.addImage, hidden:false});
      }
      else if(res.removeAll){
        this.slides = this.slides.filter((image,index) => {
          return image['src'].startsWith('http') || index == 0;
        });
        this.slides[0]['hidden'] = false;
      }
    })
  }


  ngOnDestroy(): void {
    console.log('Slider destroyed');
    this.sliderSubscription.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
   if(changes.item.previousValue != undefined ){
     this.slides.push({src:environment.url+'/foto/'+this.item.id,hidden:false});
     this._deletableSlide = false;
     this.initSlides();
   }

  }

  currentSlide(num){
    this.slides.forEach(slide => {
      if(!slide.hidden){
        slide.hidden = true;
        this.slides[num].hidden=false;
        this._deletableSlide = this.isRemovable(this.slides[num]);
        return;
      }
    });
  }

  initSlides(){
    this.itemService.putForPhotoList(this.item).subscribe(pathList => {
      console.log(pathList);
      pathList.forEach(path => this.slides.push({src:'http://localhost:8080/fotos?path='+ encodeURI(path),hidden:true}));
      this.adminService.sliderPhotoSubject.next({photos : this.slides})
    });
  }

  plusSlides(dir){
    for(let i = 0;i < this.slides.length;i++){
      if(!this.slides[i].hidden){
        this.slides[i].hidden = true;
        let f = i+dir;
        let currentSlide;
        if(i==0 && dir ==-1){
          currentSlide = this.slides[this.slides.length-1];
          this.slides[this.slides.length-1].hidden=false;
        }
        else {
          currentSlide = this.slides[Math.abs(f)%this.slides.length];
          this.slides[Math.abs(f)%this.slides.length].hidden=false;
        }

        this._deletableSlide = this.isRemovable(currentSlide);
        break;
      }
    }
    this.cd.markForCheck();
  }

  checkSlideIsNativeOrAdded():{native:boolean}{
    let image = this.slides.filter(im => im['hidden'] = false);
    return {native: !image[0]['src'].startsWith('http')};
  }

  isRemovable(image):boolean{
    return image['src'].startsWith('http') && image['src'].includes('path=');
  }

  removeImage(){
   let deleted =  this.slides.splice(this.slides.findIndex((res, slide) => res['hidden'] == false),1);
   if(deleted && deleted.length > 0){
     this.slides[0]['hidden'] = false;
     this._deletableSlide = this.isRemovable(this.slides[0]);
     this.adminService.sliderPhotoSubject.next({removeImage:deleted[0]})
     }
  }

}
