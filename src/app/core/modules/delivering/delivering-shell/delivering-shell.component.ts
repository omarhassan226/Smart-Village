import { Component, OnInit, ViewChild } from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular';
import { NavigationHeaderService } from 'src/app/shared/navigation-header.service';
import { DataService } from 'src/app/shared/services/data-service/data.service';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler/error-handler.service';
import { LoadingService } from 'src/app/shared/services/loading-service/loading.service';
import { ToasterService } from 'src/app/shared/services/toaster/toaster.service';
import { SubSink } from 'subsink';
import { DeliveringTabShellComponent } from '../delivering-tab-shell/delivering-tab-shell.component';
import { DeliveringselectTabShellComponent } from '../deliveringselect-tab-shell/deliveringselect-tab-shell.component';
import { DeliveryListComponent } from '../delivery-list/delivery-list.component';

@Component({
  selector: 'app-delivering-shell',
  templateUrl: './delivering-shell.component.html',
  styleUrls: ['./delivering-shell.component.css'],
})
export class DeliveringShellComponent implements OnInit {
  @ViewChild('list') list: DeliveryListComponent;
  @ViewChild('tab') tab: DeliveringTabShellComponent;
  @ViewChild('tabb') tabb: DeliveringselectTabShellComponent;
  deliverFormEditStatus = false;
  isConfirmDeletePopupVisible = false;
  deletedId;
  showtabs = false;
  showtabs_Select = false
  private subs = new SubSink();
  shippingList;
  selectedId;
  ngOnInit(): void {
    this.navigationHeaderService.headerObject$.next({
      headericon: 'delivery-icon',
      headerTitle: 'التوصيل',
    });
    this.getShippings();

  }

  showTabs = () => {
    this.showtabs = true;
  };
  showTabsSelect = () => {
    this.showtabs_Select = true;
  };
  hideTabs = () => { this.showtabs = false; this.showtabs_Select = false; }

  handleShippingData = (e) => {


    if (this.deliverFormEditStatus) {
      this.editShipping(e);
    } else {
      this.addShipping(e);
    }
  }
  getShippings = (): void => {
    this.showLoading();
    this.subs.sink = this.dataService.getShippings().subscribe(res => {
      this.shippingList = res.shipping.data;
      this.hideLoading();
    }, err => {
      this.hideLoading();
      this.handleError(err);
    });
  }

  editShipping = (body) => {


    this.showLoading();
    this.subs.sink = this.dataService.editShipping(body, this.selectedId).subscribe(res => {
      if (res['status'] == true) {
        this.getShippings();
        this.tabb.resetMainForm();
        this.toaster.showSuccessToast('تم التعديل بنجاح');
        this.deliverFormEditStatus = false;
        this.hideTabs();
      }

      this.hideLoading();

    }, err => {
      this.hideLoading();
      this.handleError(err);
    });
  }
  addShipping = (body) => {


    this.showLoading();

    this.subs.sink = this.dataService.addShipping(body).subscribe(res => {

      if (res['status'] == true) {
        this.tabb.resetMainForm();
        this.toaster.showSuccessToast('تم الأضافة بنجاح');
        this.hideTabs();
      }

      this.hideLoading();
    }, err => {
      this.hideLoading();
      this.handleError(err);
    });
  }
  getShippingById = (id) => {
    this.showLoading();
    this.selectedId = id
    this.subs.sink = this.dataService.getShippingById(id).subscribe(res => {
      this.tabb.form.patchForm(res.shipping);
      this.tabb.setData(res.shipping);
      this.tabb.getCities();
      this.tabb.getStates();
      this.tabb.getVillages();
      this.deliverFormEditStatus = true;
      this.showTabsSelect();
      this.hideLoading();
    }, err => {
      this.hideLoading();
      this.handleError(err);
    });
  }
  deleteShipping = (id) => {
    this.showLoading();
    this.subs.sink = this.dataService.deleteShipping(id).subscribe(res => {
      if (res['status'] == true) {
        this.getShippings();
        this.toaster.showSuccessToast('تم الحذف بنجاح')
      }

      this.hideLoading();
    }, err => {
      this.hideLoading();
      this.handleError(err);
    });
  }


  whenDeletePopupConfirm = (e) => {
    if (e) {
      this.filterDataSourceByRow(this.list.gridRef.dataSource, 'id', this.list.gridRef);
      this.deleteShipping(this.deletedId);

      this.hideDeletePopup();
    }
    else {
      this.hideDeletePopup();
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

  showLoading = () => this.loading.showLoading();
  hideLoading = () => this.loading.hideLoading();
  handleError = (error: any) => this.errorService.handleError(error);
  showDeletePopUp = (id) => { this.isConfirmDeletePopupVisible = true; this.deletedId = id }
  hideDeletePopup = (): boolean => this.isConfirmDeletePopupVisible = false;
  constructor(
    private dataService: DataService,
    private navigationHeaderService: NavigationHeaderService,
    private loading: LoadingService, private errorService: ErrorHandlerService,
    private toaster: ToasterService) { }
}
