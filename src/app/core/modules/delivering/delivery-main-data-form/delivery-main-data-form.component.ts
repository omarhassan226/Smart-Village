import { Component, EventEmitter, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { DxValidatorComponent } from 'devextreme-angular';

@Component({
  selector: 'app-delivery-main-data-form',
  templateUrl: './delivery-main-data-form.component.html',
  styleUrls: ['./delivery-main-data-form.component.css']
})
export class DeliveryMainDataFormComponent implements OnInit {
  @ViewChildren(DxValidatorComponent) validatorViewChildren: QueryList<DxValidatorComponent>;
  @Output() AddDeliveryChoice:EventEmitter<any> = new EventEmitter <any>();
  name_ar = '';
  name_en= '';
  duration = '';
  support_pay_in_home = '';
  min_cost_order = '';
  price_shipping = '';
  f_qunatity = '';
  f_price = '';
  s_qunatity = '';
  s_price = '';
  notes = '';
  notes_en='';
  fixedPrice = false;
 
  recevingSupport = [{ key:'yes',value:'نعم'}, {key: 'no',value: 'لا'}];
  priceShippings = [{key: 'weight', value: 'الوزن'},{key: 'fixed', value: 'ثابت'}]
  rtlEnabled = true;

  checkFixedPrice = (e) => {
    if(e.value == 'fixed') {
      this.fixedPrice = true;
    
    } else {
      this.fixedPrice= false;
    }
  }
  constructor() { }

  ngOnInit(): void {
  }
  handleData = () => {
    if(this.fixedPrice) {
      if(!this.name_en || 
        !this.name_ar ||
         !this.duration || 
         !this.support_pay_in_home 
         || !this.min_cost_order 
         || !this.price_shipping ||
         
         !this.f_price || 
         !this.notes) {
           return;
         } else {
           let obj = {
           name_ar :this.name_ar,
           name_en:this.name_en,
           duration :this.duration,
           support_pay_in_home :this.support_pay_in_home,
           min_cost_order :this.min_cost_order,
           price_shipping :this.price_shipping,
           f_price :this.f_price,
           notes :this.notes,
           notes_en:this.notes_en
           }
           this.AddDeliveryChoice.emit(obj);
    }

   
         
       }
       else  {
        if(!this.name_en || 
          !this.name_ar ||
           !this.duration || 
           !this.support_pay_in_home 
           || !this.min_cost_order 
           || !this.price_shipping ||
           !this.f_qunatity ||
           !this.f_price || 
           !this.s_price || !this.s_qunatity || !this.notes) {
             return;
           } else {
             let obj = {
             name_ar :this.name_ar,
             name_en:this.name_en,
             duration :this.duration,
             support_pay_in_home :this.support_pay_in_home,
             min_cost_order :this.min_cost_order,
             price_shipping :this.price_shipping,
             f_qunatity :this.f_qunatity,
             f_price :this.f_price,
             s_qunatity :this.s_qunatity,
             s_price :this.s_price,
             notes :this.notes,
             notes_en:this.notes_en
             }
             this.AddDeliveryChoice.emit(obj);
      }
  
     
           
         }
  }

  resetForm = () => {
    this.name_ar = '';
    this.name_en= '';
    this.duration = '';
    this.support_pay_in_home = '';
    this.min_cost_order = '';
    this.price_shipping = '';
    this.f_qunatity = '';
    this.f_price = '';
    this.s_qunatity = '';
    this.s_price = '';
    this.notes = '';
  }
  patchForm = (data) => {
    this.name_ar = data.name_ar;
    this.name_en= data.name_en;
    this.duration = data.duration;
    this.support_pay_in_home = data.support_pay_in_home;
    this.min_cost_order = data.min_cost_order;
    this.price_shipping = data.price_shipping;
    this.f_qunatity = data.f_qunatity;
    this.f_price = data.f_price;
    this.s_qunatity = data.s_qunatity;
    this.s_price = data.s_price;
    this.notes = data.notes;
    this.notes_en=data.notes_en;
  }
  clearDxValidators = () => {
    this.validatorViewChildren.toArray().map(ref => {
      ref.instance.reset();
    })
  }
}
