import { Component, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { DxValidatorComponent } from 'devextreme-angular';

@Component({
  selector: 'app-delivering-area',
  templateUrl: './delivering-area.component.html',
  styleUrls: ['./delivering-area.component.css'],
})
export class DeliveringAreaComponent implements OnInit {
  @ViewChildren(DxValidatorComponent) validatorViewChildren: QueryList<DxValidatorComponent>;
  @Output() showDeletePop:EventEmitter<any> = new EventEmitter <any>();
  @Output() addState:EventEmitter<any> = new EventEmitter <any>();
  @Output() addCity:EventEmitter<any> = new EventEmitter <any>();
  @Output() addVillage:EventEmitter<any> = new EventEmitter <any>();
  @Output() getStateById:EventEmitter<any> = new EventEmitter <any>();
  @Output() getCityById:EventEmitter<any> = new EventEmitter <any>();
  @Output() getVillage:EventEmitter<any> = new EventEmitter <any>();
  @Output() editState:EventEmitter<any> = new EventEmitter <any>();
  @Output() editCity:EventEmitter<any> = new EventEmitter <any>();
  @Output() editVillage:EventEmitter<any> = new EventEmitter <any>();
  @Output() filterCity:EventEmitter<any> = new EventEmitter <any>();
  @Output() filterVillage:EventEmitter<any> = new EventEmitter <any>();
  @Output() getVillageById:EventEmitter<any> = new EventEmitter <any>();

  
  @Input() States;
  @Input() Cities;
  @Input() Villages;
  StatusList = [];
  city_id;
  state_id;
  editCityStatus = false;
  editVillageStatus = false;
  editStateStatus = false;
  state_ar ='';
  state_en = '';
  village_ar = '';
  village_en = '';
  city_ar = '';
  city_en = '';
  stateId;

  constructor() {}

  ngOnInit(): void {}
  selectState = (e) => {

    this.filterCity.emit(e.value,);
  }
  selectCity = (e) => {
    this.filterVillage.emit(e.value)

  } 
  
  handleVillageData = () => {
    let villageObj = {village_ar:this.village_ar, village_en: this.village_en,city_id: this.city_id}
    if(!this.village_ar || !this.village_en || !this.city_id) {
      return;
    } else {
      if(this.editVillageStatus) {
        this.editVillage.emit(villageObj);
        this.editVillageStatus = false;
      } else {
        this.addVillage.emit(villageObj);
      }
    
    }
  }
  handleStateData = () => {
    let stateObj = {state_ar:this.state_ar, state_en: this.state_en}
    if(!this.state_ar || !this.state_en) {
      return;
    } else {
      if(this.editStateStatus) {
        this.editState.emit(stateObj);
        this.editStateStatus = false;
      } else {
        this.addState.emit(stateObj);
      }
      
    }
  }
  handleCityData = () => {
    let cityObj = {city_ar:this.city_ar, city_en: this.city_en,state_id: this.state_id}
    if(!this.city_ar || !this.city_en ||!this.state_id) {
      return;
    } else {
      if(this.editCityStatus) {
        this.editCity.emit(cityObj);
        this.editCityStatus = false;
      } else {
        this.addCity.emit(cityObj);
      }
      
    }
  }
  resetCityForm = () => {
    this.city_ar = '';
    this.city_en = '';
  }
  resetStateForm = () => {
    this.state_ar = '';
    this.state_en = '';
  }
  resetVillageForm = () => {
    this.village_ar = '';
    this.village_en = '';
  }
  patchCityForm = (data) => {
    this.city_ar =  data.city_ar;
    this.city_en =  data.city_en;
    this.state_id = data.state_id;
  }
  patchStateForm = (data) => {
    this.state_ar =data.state_ar;
    this.state_en =data.state_en;
  }
  patchVillageForm = (data) => {
    debugger
    this.village_ar = data.village_ar;
    this.village_en = data.village_en;
    this.city_id = data.city_id;
   // this.state_id = data.state_id;
  }
  clearDxValidators = () => {
    this.validatorViewChildren.toArray().map(ref => {
      ref.instance.reset();
    })
  }
}
