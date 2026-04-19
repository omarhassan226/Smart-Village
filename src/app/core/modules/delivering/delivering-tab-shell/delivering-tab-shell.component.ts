import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { DataService } from 'src/app/shared/services/data-service/data.service';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler/error-handler.service';
import { LoadingService } from 'src/app/shared/services/loading-service/loading.service';
import { ToasterService } from 'src/app/shared/services/toaster/toaster.service';
import { SubSink } from 'subsink';
import { DeliveringAreaComponent } from '../delivering-area/delivering-area.component';
import { DeliveryMainDataFormComponent } from '../delivery-main-data-form/delivery-main-data-form.component';


@Component({
  selector: 'app-delivering-tab-shell',
  templateUrl: './delivering-tab-shell.component.html',
  styleUrls: ['./delivering-tab-shell.component.css']
})
export class DeliveringTabShellComponent implements OnInit {
  @Output() AddDeliveryChoice:EventEmitter<any> = new EventEmitter <any>();
  @ViewChild('form') form : DeliveryMainDataFormComponent;
  @ViewChild('deliveryArea') deliveryArea : DeliveringAreaComponent;
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
 
 
  private subs = new SubSink();

  ngOnInit(): void {
    this.renderAllTabs();
    this.getVillages();
    this.getStates();
    this.getCities();
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
    this.subs.sink = this.dataService.editCity(body,this.editCityId).subscribe(res => {
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
    this.subs.sink = this.dataService.editState(body,this.editStateId).subscribe(res => {
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
    this.subs.sink = this.dataService.editVillage(body,this.editVillageId).subscribe(res => {
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
      this.Cities=res.cities
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
      this.Villages=res.villages
      this.hideLoading();
    }, err => {
      this.hideLoading();
      this.handleError(err);
    });
  }

  getVillages = (): void => {
    this.showLoading();
    this.subs.sink = this.dataService.getVillages().subscribe(res => {
      this.Villages = res.villages.data;
      
      this.hideLoading();
    }, err => {
      this.hideLoading();
      this.handleError(err);
    });
  }
  getStates = (): void => {
    this.showLoading();
    this.subs.sink = this.dataService.getStates().subscribe(res => {
      this.States = res.states.data;
      this.hideLoading();
    }, err => {
      this.hideLoading();
      this.handleError(err);
    });
  }
  getCities = (): void => {
    this.showLoading();
    this.subs.sink = this.dataService.getCities().subscribe(res => {
      this.Cities = res.cities.data;
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
   if(this.deletedState == 'city') {
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
  showDeletePop = (obj) =>{
     this.isConfirmDeletePopupVisible = true;
      this.deletedState = obj.name; this.deletedId = obj.id}
hideDeletePopup = (): boolean => this.isConfirmDeletePopupVisible = false;
  constructor(
    private dataService: DataService,
     private loading: LoadingService,private errorService: ErrorHandlerService,
     private toaster:ToasterService) {}
}
