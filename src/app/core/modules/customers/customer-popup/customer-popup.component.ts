import { Component, EventEmitter, Input, OnInit,Output, QueryList, ViewChildren } from '@angular/core';
import { DxValidatorComponent } from 'devextreme-angular';
import { DataService } from '../../../../shared/services/data-service/data.service';
@Component({
  selector: 'app-customer-popup',
  templateUrl: './customer-popup.component.html',
  styleUrls: ['./customer-popup.component.css']
})
export class CustomerPopupComponent implements OnInit {
  @ViewChildren(DxValidatorComponent) validatorViewChildren: QueryList<DxValidatorComponent>;
  @Input() isCustomerPopupVisible: boolean;
  @Output() OnHiding: EventEmitter<any> = new EventEmitter<any>();
  @Output() AddCustomer: EventEmitter<any> = new EventEmitter<any>();
  @Output() EditCustomer: EventEmitter<any> = new EventEmitter<any>();
  @Input()Villages;
  @Input()States;
  @Input()Cities;
  @Input() popTitle;
  @Input() addCase = true;
  rules: any;
  Fname = '';
  Lname = '';
  phone = '';
  city_id='';
  country_id = '';
  village_id = '';
  password = '';
  email = '';
  filterVillage ()  {
   
    this.dataService.filterVillage(this.city_id).subscribe(res => {
      this.Villages = res.villages
     
    }, err => {
      
    });
  }
  getCitesbystates() {
   
    
     
      this.dataService.filterCity(this.country_id).subscribe(res => {
        this.Cities = res.cities
       
      }, err => {
        
      });
    

  }
  ngOnInit(): void {
  }
  resetForm = () => {
    this.Fname = '';
  this.Lname = '';
  this.phone = '';
  this.city_id='';
  this.country_id = '';
  this.village_id = '';
  this.password = '';
  this.email = '';
  }
  patchform = (data) => {
    this.clearDxValidators()
    this.Fname = data.Fname;
    this.Lname = data.Lname;
    debugger
    this.phone = data.phone;
    this.city_id=data.city_id;
    this.country_id = data.country_id;
    this.village_id = data.village_id;
   
    this.email = data.email;
  }
  handleData = () => {
    if (this.popTitle == 'أضافة عميل جديد') {
      if (!this.Fname || !this.Lname || !this.phone ||
        !this.city_id || !this.country_id
        || !this.village_id || !this.password) {
        return
      }
      else {
        let CustomerObj = {
          Fname: this.Fname,
          Lname: this.Lname,
          phone: this.phone,
          city_id: this.city_id,
          country_id: this.country_id,
          village_id: this.village_id,
          password: this.password,
          email: this.email
        }


        if (this.popTitle == 'أضافة عميل جديد') {
          console.log('true')
          this.clearDxValidators()
          this.AddCustomer.emit(CustomerObj);

        } else {
          this.clearDxValidators()
          this.EditCustomer.emit(CustomerObj);

          console.log('false')
        }

      }
    }
    else {
      if (!this.Fname || !this.Lname || !this.phone ||
        !this.city_id || !this.country_id
        || !this.village_id) {
        return
      }
      else {
        let CustomerObj = {
          Fname: this.Fname,
          Lname: this.Lname,
          phone: this.phone,
          city_id: this.city_id,
          country_id: this.country_id,
          village_id: this.village_id,
          password: this.password,
          email: this.email
        }


       
        this.clearDxValidators()
        this.EditCustomer.emit(CustomerObj);

        console.log('false')

       

      }
    }
   
  }
  clearDxValidators = () => {
    this.validatorViewChildren.toArray().map(ref => {
      ref.instance.reset();
    })
  }

  constructor(private dataService: DataService) { 
    this.rules = { "X": /[02-9]/ };
  }
  
  

}
