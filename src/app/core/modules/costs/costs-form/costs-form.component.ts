import { Component, ElementRef, EventEmitter, OnInit, Output, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { DxValidatorComponent } from 'devextreme-angular';
import * as moment from 'moment';

@Component({
  selector: 'app-costs-form',
  templateUrl: './costs-form.component.html',
  styleUrls: ['./costs-form.component.css']
})
export class CostsFormComponent implements OnInit {
  @ViewChildren(DxValidatorComponent) validatorViewChildren: QueryList<DxValidatorComponent>;
 @ViewChild('costfile')  costfile : ElementRef;
  @Output() AddCost:EventEmitter<any> = new EventEmitter <any>();
  
  
  costsType = [
    "أخرى", "الأجور", "الشحن", "الايجار", "كهرباء",'التسويق'
  ]
  imgSrc = "../../../../../assets/images/upload-cloud.png";
  cost ="";
  type = "";
  notes = "";
  attatch = null;
  date = Date.now();

  showPreview(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.imgSrc = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.attatch = event.target.files[0];
      
    }
    else {      
      this.attatch = null;
    }
  }
   formatDate = (date) => {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}
  handleData = () => {
const formData = new FormData();
formData.append("date",this.formatDate(this.date));
formData.append("cost",this.cost);
formData.append("attatch",this.attatch);
formData.append("notes",this.notes);
formData.append("type",this.type);
  let  body = {cost: this.cost, attatch: this.attatch, date:this.formatDate(this.date)
    , notes: this.notes, type: this.type}
    if (!this.cost  || !this.date  || !this.notes || !this.type) {
  return;
    }  else {
     
      this.AddCost.emit(formData);
    }
  }
  patchForm = (data) => {
    this.cost =data.cost;
    this.type = data.type;
    this.notes = data.notes;
    this.attatch = data.attatch;
    this.date = data.date;
  }
  constructor() { }

  ngOnInit(): void {
  }

  clearDxValidators = () => {
    this.validatorViewChildren.toArray().map(ref => {
      ref.instance.reset();
    })
  }
  resetForm = () => {
    this.imgSrc = "../../../../../assets/images/upload-cloud.png";
    this.cost ="";
    this.type = "";
    this.notes = "";
    this.attatch = null;
    this.date = Date.now();
  }

}
