import { EventEmitter } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular';
import { SubSink } from 'subsink';
import { NavigationHeaderService } from '../../../../shared/navigation-header.service';
import { DataService } from '../../../../shared/services/data-service/data.service';
import { ErrorHandlerService } from '../../../../shared/services/error-handler/error-handler.service';
import { LoadingService } from '../../../../shared/services/loading-service/loading.service';
import { ToasterService } from '../../../../shared/services/toaster/toaster.service';
import { DeliveringAreaComponent } from '../delivering-area/delivering-area.component';
import { DeliveringTabShellComponent } from '../delivering-tab-shell/delivering-tab-shell.component';
import { DeliveryListComponent } from '../delivery-list/delivery-list.component';
import { DeliveryMainDataFormComponent } from '../delivery-main-data-form/delivery-main-data-form.component';

@Component({
  selector: 'app-deliveringselect-tab-shell',
  templateUrl: './deliveringselect-tab-shell.component.html',
  styleUrls: ['./deliveringselect-tab-shell.component.css']
})
export class DeliveringselectTabShellComponent implements OnInit {

  @Output() AddDeliveryChoice: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('form') form: DeliveryMainDataFormComponent;
  @ViewChild('deliveryArea') deliveryArea: DeliveringAreaComponent;
  selectAll: any;
  States;
  Cities;
  Villages;
  isConfirmDeletePopupVisible;
  dataSource: any;
  deletedId;
  deletedState;
  editCityId;
  editVillageId;
  editStateId;
  state_en: any
  state_id: any
  state_ar: any
  shipping: any
  shippingedit = true
  village_en: any
  village_ar: any
  city_id: any
  city_en: any
  city_ar: any
  selectAllCities = false
  selectAllVillages = false
  setData(data) {
    this.shippingedit = false
    console.log("data", data)
    console.log(this.shipping = data)


  }


  selectState(event) { }
  saveArea() {

    let states_Id = []
    this.States.forEach(item => {
      if (item.status == true) {
        states_Id.push(item.id)
      }
    })
    let city_Id = []
    this.Cities.forEach(item => {
      if (item.status == true) {
        city_Id.push(item.id)
      }
    })
    let vall_Id = []
    this.Villages.forEach(item => {
      if (item.status == true) {
        vall_Id.push(item.id)
      }
    })
    let body = {
      shipping_id: this.shipping.id, governrates: states_Id, cities: city_Id, villages: vall_Id
    }
    this.dataService.saveAreas(body).subscribe
      (res => {
        this.toaster.showSuccessToast("تم بنجاح")
      })
  }
  selectCity(event) { }
  selectCitybyState() {
    let states_Id = []
    this.States.forEach(item => {
      if (item.status == true) {
        states_Id.push(item.id)
      }
    })
    const body = { governrates: states_Id }
    this.dataService.getcitiesbelongstate(body).subscribe(res => {
      res.cities.forEach(item => { item.status = false })


      this.Cities = res.cities
      if (this.selectAllCities == true)
        this.selectAllfunCities();
      this.selectVallgebyState()

    })



  }
  selectVallgebyState() {
    let city_Id = []
    this.Cities.forEach(item => {
      if (item.status == true) {
        city_Id.push(item.id)
      }
    })
    const body = { cities: city_Id }
    this.dataService.getvillagesbelongCity(body).subscribe(res => {
      res.villages.forEach(item => { item.status = false })


      this.Villages = res.villages


      if (this.selectAllVillages == true)
        this.selectAllfunVillages();
    })

  }
  handleCityData() { }
  handleStateData() { }
  handleVillageData() { }
  private subs = new SubSink();

  ngOnInit(): void {

    this.renderAllTabs();

    //this.getVillages();
    //this.getStates();
    //this.getCities();
  }
  renderAllTabs = (): void => {
    this.dataSource = [
      {
        id: 0,
        text: 'البيانات الأساسية'
      },
      {
        id: 1,
        text: 'مناطق التوصيل'
      },

    ]
  }
  resetMainForm = () => {
    this.form.resetForm();
    this.form.clearDxValidators();
  }
  addState = (body) => {
    this.showLoading();
    this.subs.sink = this.dataService.addState(body).subscribe(res => {
      this.getStates();
      this.toaster.showSuccessToast(res['message']);
      this.deliveryArea.resetStateForm();
      this.deliveryArea.clearDxValidators();
      this.hideLoading();
    }, err => {
      this.hideLoading();
      this.handleError(err);
    });
  }
  addVillage = (body) => {
    this.showLoading();
    this.subs.sink = this.dataService.addVillage(body).subscribe(res => {
      this.toaster.showSuccessToast(res['message']);
      this.deliveryArea.resetVillageForm();
      this.deliveryArea.clearDxValidators();
      this.getVillages();
      this.getCities();
      this.hideLoading();
    }, err => {
      this.hideLoading();
      this.handleError(err);
    });
  }
  addCity = (body) => {
    this.showLoading();
    this.subs.sink = this.dataService.addCity(body).subscribe(res => {

      this.toaster.showSuccessToast(res['message']);
      this.deliveryArea.resetCityForm();
      this.deliveryArea.clearDxValidators();
      this.getCities();
      this.getVillages();
      this.hideLoading();
    }, err => {
      this.hideLoading();
      this.handleError(err);
    });
  }

  editCity = (body) => {

    this.showLoading();
    this.subs.sink = this.dataService.editCity(body, this.editCityId).subscribe(res => {
      this.getCities();
      this.deliveryArea.resetCityForm();
      this.deliveryArea.clearDxValidators();
      this.toaster.showSuccessToast(res['message']);

      this.hideLoading();
    }, err => {
      this.hideLoading();
      this.handleError(err);
    });
  }
  editState = (body) => {

    this.showLoading();
    this.subs.sink = this.dataService.editState(body, this.editStateId).subscribe(res => {
      this.getStates();
      this.deliveryArea.resetStateForm();
      this.deliveryArea.clearDxValidators();
      this.toaster.showSuccessToast(res['message']);


      this.hideLoading();
    }, err => {
      this.hideLoading();
      this.handleError(err);
    });
  }
  editVillage = (body) => {

    this.showLoading();
    this.subs.sink = this.dataService.editVillage(body, this.editVillageId).subscribe(res => {
      this.getVillages();
      this.deliveryArea.resetStateForm();
      this.deliveryArea.clearDxValidators();
      this.toaster.showSuccessToast(res['message'])

      this.hideLoading();
    }, err => {
      this.hideLoading();
      this.handleError(err);
    });
  }

  getStateById = (id) => {
    this.editStateId = id;
    this.showLoading();
    this.subs.sink = this.dataService.getStateById(id).subscribe(res => {
      this.deliveryArea.patchStateForm(res.state)
      this.hideLoading();


    }, err => {
      this.hideLoading();
      this.handleError(err);
    });
  }
  getCityById = (id) => {
    this.editCityId = id;
    this.showLoading();
    this.subs.sink = this.dataService.getCityById(id).subscribe(res => {
      this.deliveryArea.patchCityForm(res.city)
      this.hideLoading();
    }, err => {
      this.hideLoading();
      this.handleError(err);
    });
  }
  filterCity = (id) => {
    this.editCityId = id;
    this.showLoading();
    this.subs.sink = this.dataService.filterCity(id).subscribe(res => {
      this.Cities = res.cities
      this.hideLoading();
    }, err => {
      this.hideLoading();
      this.handleError(err);
    });
  }
  getVillageById = (id) => {
    this.editVillageId = id;
    this.showLoading();
    this.subs.sink = this.dataService.getVillageById(id).subscribe(res => {
      this.deliveryArea.patchVillageForm(res.village);

      this.hideLoading();
    }, err => {
      this.hideLoading();
      this.handleError(err);
    });
  }
  filterVillage = (id) => {
    this.editVillageId = id;
    this.showLoading();
    this.subs.sink = this.dataService.filterVillage(id).subscribe(res => {
      this.Villages = res.villages
      this.hideLoading();
    }, err => {
      this.hideLoading();
      this.handleError(err);
    });
  }

  getVillages = (): void => {
    this.showLoading();
    this.subs.sink = this.dataService.getVillages().subscribe(res => {
      res.villages.data.forEach(item => { item.status = false })
      this.Villages = res.villages.data;
      this.shipping.villages.forEach(item => {
        this.Villages.forEach(element => {
          if (element.id == item.id) { element.status = true }
        })


      })


      this.hideLoading();
    }, err => {
      this.hideLoading();
      this.handleError(err);
    });
  }
  getStates = (): void => {
    this.showLoading();
    this.subs.sink = this.dataService.getStates().subscribe(res => {
      res.states.data.forEach(item => { item.status = false })
      this.States = res.states.data;

      this.shipping.governrates.forEach(item => {
        this.States.forEach(element => {
          if (element.id == item.id) { element.status = true }
        })


      })
      console.log(this.States)
      this.hideLoading();
    }, err => {
      this.hideLoading();
      this.handleError(err);
    });
  }
  getCities = (): void => {
    this.showLoading();
    this.subs.sink = this.dataService.getCities().subscribe(res => {
      res.cities.data.forEach(item => { item.status = false })
      this.Cities = res.cities.data;
      this.shipping.cities.forEach(item => {
        this.Cities.forEach(element => {
          if (element.id == item.id) { element.status = true }
        })


      })
      this.hideLoading();
    }, err => {
      this.hideLoading();
      this.handleError(err);
    });
  }
  deleteState = (id) => {
    this.showLoading();
    this.subs.sink = this.dataService.deleteState(id).subscribe(res => {
      this.getStates();
      this.toaster.showSuccessToast(res['message'])
      this.deliveryArea.resetStateForm();
      this.hideLoading();
    }, err => {
      this.hideLoading();
      this.handleError(err);
    });
  }
  whenDeletePopupConfirm = (e) => {
    if (e) {
      if (this.deletedState == 'city') {
        this.deleteCity(this.deletedId);
      } else if (this.deletedState == 'village') {
        this.deleteVillage(this.deletedId);
      } else {
        this.deleteState(this.deletedId)
      }

      this.hideDeletePopup();
    }
    else {
      this.hideDeletePopup();
    }
  }
  deleteVillage = (id) => {
    this.showLoading();
    this.subs.sink = this.dataService.deleteVillage(id).subscribe(res => {

      this.getVillages();
      this.deliveryArea.resetVillageForm();
      this.toaster.showSuccessToast(res['message'])


      this.hideLoading();
    }, err => {
      this.hideLoading();
      this.handleError(err);
    });
  }
  deleteCity = (id) => {
    this.showLoading();
    this.subs.sink = this.dataService.deleteCity(id).subscribe(res => {
      this.deliveryArea.resetCityForm();
      this.getCities();
      this.toaster.showSuccessToast(res['message'])

      this.hideLoading();
    }, err => {
      this.hideLoading();
      this.handleError(err);
    });
  }
  showLoading = () => this.loading.showLoading();
  hideLoading = () => this.loading.hideLoading();
  handleError = (error: any) => this.errorService.handleError(error);
  showDeletePop = (obj) => {
    this.isConfirmDeletePopupVisible = true;
    this.deletedState = obj.name; this.deletedId = obj.id
  }
  selectAllfun() {
    if (this.selectAll == true) {
      this.States.forEach(element => {
        element.status = true;

      });
      // this.Cities.forEach(element => {
      //   element.status=true;

      // });
      // this.Villages.forEach(element => {
      //   element.status=true;

      // });
    }
    else {

      this.States.forEach(element => {
        element.status = false;

      });
      // this.Cities.forEach(element => {
      //   element.status=false;

      // });
      // this.Villages.forEach(element => {
      //   element.status=false;

      // });
    }
  }
  selectAllfunCities() {
    if (this.selectAllCities == true) {

      this.Cities.forEach(element => {
        element.status = true;

      });
    }
    else {


      this.Cities.forEach(element => {
        element.status = false;

      });

    }

  }
  selectAllfunVillages() {

    if (this.selectAllVillages == true) {

      this.Villages.forEach(element => {
        element.status = true;

      });
    }
    else {


      this.Villages.forEach(element => {
        element.status = false;

      });
    }

  }

  hideDeletePopup = (): boolean => this.isConfirmDeletePopupVisible = false;
  constructor(
    private dataService: DataService,
    private loading: LoadingService, private errorService: ErrorHandlerService,
    private toaster: ToasterService) { }

}
