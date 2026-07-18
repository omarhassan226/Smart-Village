import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular';
import { Observable } from 'rxjs';
import { NavigationHeaderService } from 'src/app/shared/navigation-header.service';
import { DataService } from 'src/app/shared/services/data-service/data.service';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler/error-handler.service';
import { LoadingService } from 'src/app/shared/services/loading-service/loading.service';
import { ToasterService } from 'src/app/shared/services/toaster/toaster.service';
import { SubSink } from 'subsink';
import { CustomerListComponent } from '../customer-list/customer-list.component';
import { CustomerPopupComponent } from '../customer-popup/customer-popup.component';

@Component({
  selector: 'app-customer-shell',
  templateUrl: './customer-shell.component.html',
  styleUrls: ['./customer-shell.component.css'],
})
export class CustomerShellComponent implements OnInit, OnDestroy {
  @ViewChild('popup') popup: CustomerPopupComponent;
  @ViewChild('list') list: CustomerListComponent
  isConfirmDeletePopupVisible = false;
  deletedId;
  selectedId;
  isCustomerPopupVisible = false;
  popTitle = '';
  customerList;
  States;
  Villages;
  Cities;
  addCase;
  isConfirmDeleteunPopupVisible = false
  listData: Observable<any>;
  private subs = new SubSink();

  ngOnInit(): void {
    this.navigationHeaderService.headerObject$.next({
      headericon: 'customers-icon',
      headerTitle: 'العملاء',
    });
    this.getCustomerList();
    this.getCities();
    this.getVillages();
    this.getStates();
  }
  ngOnDestroy() {
    this.subs.unsubscribe();
  }
  getCustomerList = (): void => {
    this.showLoading();
    this.subs.sink = this.dataService.getCustomerList().subscribe(res => {
      this.customerList = res.users.data;
      console.log(this.customerList);
      this.hideLoading();
    }, err => {
      this.hideLoading();
      this.handleError(err);
    });
  }
  showunDeletePopup(id) { this.isConfirmDeleteunPopupVisible = true; this.deletedId = id }

  editCustomer = (body) => {

    this.showLoading();
    this.subs.sink = this.dataService.editCustomer(body, this.selectedId).subscribe(res => {
      if (res['status'] == true) {
        this.getCustomerList();
        this.popup.resetForm();

        this.hidePopUp();
        this.popup.clearDxValidators();
        this.toaster.showSuccessToast('تم التعديل بنجاح')
      }

      this.hideLoading();
    }, err => {
      this.hideLoading();
      this.handleError(err);
    });
  }
  addCustomer = (body) => {

    this.showLoading();

    this.subs.sink = this.dataService.addCustomer(body).subscribe(res => {

      if (res['status'] == true) {
        this.getCustomerList();
        this.popup.resetForm();

        this.hidePopUp();
        this.popup.clearDxValidators();
        this.toaster.showSuccessToast('تم الأضافة بنجاح')
      }

      this.hideLoading();
    }, err => {
      this.popup.patchform(body)
      this.hideLoading();
      this.handleError(err);
      for (const [key, value] of Object.entries(err.error.errors)) {
        console.log(`${key}: ${value}`);
        this.toaster.showErrorToast(`${value}`)
      }

    });
  }
  getCustomerById = (id) => {
    this.showLoading();
    this.subs.sink = this.dataService.getCustomerById(id).subscribe(res => {
      this.popup.patchform(res.users)
      this.hideLoading();
    }, err => {
      this.hideLoading();
      this.handleError(err);
    });
  }
  deleteCustomer = (id) => {
    this.showLoading();
    this.subs.sink = this.dataService.deleteCustomer(id).subscribe(res => {
      if (res['status'] == true) {
        this.getCustomerList();
        this.toaster.showSuccessToast("تم الحذف بنجاح")
      }

      this.hideLoading();
    }, err => {
      this.hideLoading();
      this.handleError(err);
    });
  }
  undeleteCustomer = (id) => {

    this.showLoading();
    let body = { user_id: id }
    this.subs.sink = this.dataService.activeUser(body).subscribe(res => {

      this.getCustomerList();
      this.toaster.showSuccessToast("تم بنجاح")


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
  showPopUp = (obj) => {
    this.popup.resetForm();
    this.popup.clearDxValidators();
    this.addCase = true;
    this.isCustomerPopupVisible = true;
    this.popTitle = obj.text
    this.selectedId = obj.id;
    if (obj.text == 'تعديل العميل') {
      this.addCase = false;
      this.getCustomerById(obj.id);
    }


  };
  showDeletePopUp = (id) => {
    this.isCustomerPopupVisible = true;
    this.deletedId = id;
  }
  whenDeletePopupConfirm = (e) => {
    if (e) {
      this.filterDataSourceByRow(this.list.gridRef.dataSource, 'id', this.list.gridRef);
      this.deleteCustomer(this.deletedId);
      this.customerList = this.list.gridRef.dataSource;

      this.hideDeletePopup();
    }
    else {
      this.hideDeletePopup();
    }
  }
  whenunDeletePopupConfirm = (e) => {
    if (e) {
      this.filterDataSourceByRow(this.list.gridRef.dataSource, 'id', this.list.gridRef);
      this.undeleteCustomer(this.deletedId);
      this.customerList = this.list.gridRef.dataSource;

      this.hideunDeletePopup();
    }
    else {
      this.hideunDeletePopup();
    }
  }

  filterDataSourceByRow = (
    list: any,
    keyExpr: any,
    gridRef: DxDataGridComponent,
    callback?: () => any
  ): void => {
    const newdataSource = list.filter(
      (item) => item[keyExpr] !== gridRef.focusedRowKey
    );
    gridRef.dataSource = newdataSource;
    gridRef.instance.refresh();
    if (callback) {
      callback();
    }
    return;
  };
  hideunDeletePopup = (): boolean => this.isConfirmDeleteunPopupVisible = false;
  showDeletePopup = (id) => { this.isConfirmDeletePopupVisible = true; this.deletedId = id }
  hideDeletePopup = (): boolean => this.isConfirmDeletePopupVisible = false;
  hidePopUp = () => (this.isCustomerPopupVisible = false);
  showLoading = () => this.loading.showLoading();
  hideLoading = () => this.loading.hideLoading();
  handleError = (error: any) => this.errorService.handleError(error);
  constructor(
    private dataService: DataService,
    private navigationHeaderService: NavigationHeaderService,
    private loading: LoadingService, private errorService: ErrorHandlerService,
    private toaster: ToasterService) { }
}
