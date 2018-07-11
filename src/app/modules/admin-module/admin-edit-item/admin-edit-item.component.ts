import {ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Item} from "../../../objects/item";
import {ActivatedRoute} from "@angular/router";
import {ItemsService} from "../../../services/itemsService";
import {AdminService} from "../../../services/adminService";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-admin-edit-item',
  templateUrl: './admin-edit-item.component.html',
  styleUrls: ['./admin-edit-item.component.css']
})
export class AdminEditItemComponent implements OnInit, OnDestroy {

  item:Item = new Item();

  customNarrowClasses = ['custom_prev','custom_next','custom_numbertext'];

  photos:any[] = [];
  photoToDelete:any[] = [];
  mainImage;
  @ViewChild('fileInpt')fileInpt;
  @ViewChild('fileInpt2')fileInpt2;

  sliderSubscription:Subscription;

  constructor(private activatedRoute:ActivatedRoute,
              private itemService:ItemsService,
              private cd: ChangeDetectorRef,
              private adminService:AdminService) {

  }

  ngOnInit() {
    this.activatedRoute.paramMap.switchMap(par => {
      return this.itemService.getSingleItemAdmin(par.get('id'))
    }).subscribe((item:Item) => {
      this.item = item;
    });
    this.sliderSubscription = this.adminService.sliderPhotoSubject.subscribe(res => {
      if(res && res.removeImage){
        this.photoToDelete.push(res.removeImage['src'])
      }
      this.photos = res.photos;
    })
  }


  ngOnDestroy(): void {
    this.sliderSubscription.unsubscribe();
  }

  onFile(ev){
    if(ev.target.files){
      if(ev.target.files.length == 0){
        this.mainImage = null;
        return;
      }
      const fileInput = ev.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(fileInput);
      reader.onload = () => {
        this.mainImage = reader.result;
        this.adminService.sliderPhotoSubject.next({mainImage: this.mainImage})
      };
      this.cd.markForCheck();
    }
  }
  onFile2(ev){
    if(ev.target.files.length == 0){
      this.adminService.sliderPhotoSubject.next({removeAll:true});
      return;
    }
    const reader = new FileReader();
    let ind = 0;
    reader.onload = () => {
      // this.photos.push({src: reader.result, hidden:true});
      this.adminService.sliderPhotoSubject.next({addImage:reader.result});
      readFile()
    };
    const length = ev.target.files.length;
    if(ev.target.files){
      readFile();
    }
    else return;
    function readFile(){
      if(ind >= length)return;
      let file = ev.target.files[ind];
      reader.readAsDataURL(file);
      ind++;
    }
    this.cd.markForCheck();
  }

  submitChanges(form){
    if(form.valid){
      const control = new FormData();
      control.append('mainImage',this.fileInpt.nativeElement.files[0]);

      for(let i = 0;i<this.fileInpt2.nativeElement.files.length;i++){
        control.append('images', this.fileInpt2.nativeElement.files[i],this.fileInpt2.nativeElement.files[i]['name']);
      }
      this.photoToDelete.forEach(path => control.append('photoToDelete',path));
      for (let prop in this.item){
        control.append(prop,this.item[prop]);
      }
      this.adminService.putItem(control).subscribe(res => {
        console.log(res);
      })
    }
  }


  activator(){
    this.adminService.activator(this.item.id, !this.item.active).subscribe(res => {
      if(res){
        this.item.active = !this.item.active;
        this.cd.markForCheck();
      }
    })
  }


}
