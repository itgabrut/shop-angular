import {Directive, ElementRef, HostBinding, HostListener, Renderer2} from "@angular/core";
/**
 * Created by ilya on 08.04.2018.
 */
@Directive({
  selector: '[scrollCap]'
})
export class ScrollD {

  constructor(private el: ElementRef,private renderer:Renderer2) {
    // el.nativeElement.style.backgroundColor = 'yellow';
  }

  @HostListener('window:scroll',['$event']) onScroll($event) {
    console.log($event);
    if(document.documentElement.scrollTop > 250){
      // this.renderer.removeClass(this.el.nativeElement,'sideCard');
      // this.renderer.addClass(this.el.nativeElement,'sideCardFixed');
      this.sideCardFixed = true;
      this.sideCard = false;
    }
    else{
      this.sideCardFixed = false;
      this.sideCard = true;
    }

  }

  @HostBinding('class.sideCard') private sideCard: boolean;
  @HostBinding('class.sideCardFixed') private sideCardFixed: boolean;
}
