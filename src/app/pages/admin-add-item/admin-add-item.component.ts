import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AdminService} from "../../services/adminService";

@Component({
  selector: 'app-admin-add-item',
  templateUrl: './admin-add-item.component.html',
  styleUrls: ['./admin-add-item.component.css']
})
export class AdminAddItemComponent implements OnInit {

  // @ViewChild('fileInpt')fileInput;


  form:FormGroup;

  constructor(private fb:FormBuilder, private service:AdminService,private cd: ChangeDetectorRef) {
    this.form = this.fb.group({
      name : ['',[Validators.required]],
      theme : ['',[Validators.required]],
      theme2 : '',
      price : ['',[Validators.required,Validators.pattern(/\d*/)]],
      description: '',
      foto : ['',[Validators.required]]
    })
  }

  ngOnInit() {
  }

  onFile(ev){
      if(ev.target.files){
        const fileInput = ev.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(fileInput);
        reader.onload = () => {
          this.form.patchValue({
            foto : reader.result
          })
        };
        this.cd.markForCheck();
      }
  }


  onSubmitAddItem(){
    if(this.form.valid){
      // FOR MULTIPART FORMS
      // const control = new FormData();
      // control.append('file',this.fileInput.nativeElement.files[0]);
      // for (let prop in this.form.value){
      //   control.append(prop,this.form.value[prop]);
      // }
      console.log(this.form.value);

      this.service.postNewItem(this.form.value).subscribe(res => {
        console.log(res);
      })

    }
    else{
      Object.keys(this.form.controls)
        .forEach(controlName => this.form.controls[controlName].markAsDirty());
    }
  }

  get name() {
    return this.form.controls['name'];
  }

  get theme() {
    return this.form.controls['theme'];
  }

  get price(){
    return this.form.controls['price'];
  }

  get foto(){
    return this.form.controls['foto'];
  }

}
