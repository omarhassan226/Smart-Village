import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular';
import { NavigationHeaderService } from 'src/app/shared/navigation-header.service';
import { DataService } from 'src/app/shared/services/data-service/data.service';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler/error-handler.service';
import { LoadingService } from 'src/app/shared/services/loading-service/loading.service';
import { ToasterService } from 'src/app/shared/services/toaster/toaster.service';
import { SubSink } from 'subsink';
import { ProductsListComponent } from '../products-list/products-list.component';
import { ProductsTabShellComponent } from '../products-tab-shell/products-tab-shell.component';

@Component({
  selector: 'app-products-shell',
  templateUrl: './products-shell.component.html',
  styleUrls: ['./products-shell.component.css'],
})
export class ProductsShellComponent implements OnInit, OnDestroy {
  @ViewChild('list') list: ProductsListComponent;
  @ViewChild('tab') tab: ProductsTabShellComponent;
  options;
  isOrdersPopupVisible = false;
  showtabs = false;
  private subs = new SubSink();
  ProductsList;
  selectedId;
  addState;
  isConfirmDeletePopupVisible = false;
  deletedId;

  ngOnInit(): void {
    this.navigationHeaderService.headerObject$.next({
      headericon: 'products-icon',
      headerTitle: 'المنتجات',
    });
    this.getProductsList();
    this.dataService.$productDetails.subscribe(res => {
      if (res) {
        this.showTabs(res);
      }
    });
  }
  ngOnDestroy() {
    this.subs.unsubscribe();
  }
  getProductsList = (): void => {
    this.showLoading();
    this.subs.sink = this.dataService.getProductsall().subscribe(res => {
      this.ProductsList = res.products.data;
      this.hideLoading();
    }, err => {
      this.hideLoading();
      this.handleError(err);
    });
  }

  addProduct = (body) => {

    this.showLoading();
    console.log(body)

    this.subs.sink = this.dataService.addProduct(body).subscribe(res => {

      if (res['status'] == "true") {
        this.getProductsList();
        this.tab.mainDataForm.resetProduct();
        this.tab.mainDataForm.clearDxValidators();
        this.toaster.showSuccessToast('تم الأضافة بنجاح');
        this.hideTabs();
      }

      this.hideLoading();
    }, err => {
      this.hideLoading();
      this.handleError(err);
    });
  }
  editProduct = (body, id) => {

    this.showLoading();

    this.subs.sink = this.dataService.editProduct(body, id).subscribe(res => {

      if (res['status'] == "true") {
        this.getProductsList();
        this.tab.mainDataForm.resetProduct();
        this.tab.mainDataForm.clearDxValidators();
        this.toaster.showSuccessToast('تم التعديل بنجاح');
        this.hideTabs();
      }

      this.hideLoading();
    }, err => {
      this.hideLoading();
      this.handleError(err);
    });
  }
  getProductByID = (id) => {
    this.showLoading();
    this.subs.sink = this.dataService.getProductById(id).subscribe(res => {

      this.tab.mainDataForm.patchProduct(res.product);
      res.product.details.forEach(element => {
        if (element.report_status == "yes") {
          element.report_status = true
        }
        else {
          element.report_status = false
        }

      });
      this.tab.advancedChoices.patchOptions(res.product.options, res.product.details, true)
      this.hideLoading();
    }, err => {
      this.hideLoading();
      this.handleError(err);
    });
  }
  deleteProduct = (id) => {
    this.showLoading();
    this.subs.sink = this.dataService.deleteProduct(id).subscribe(res => {
      if (res.status) {
        this.toaster.showSuccessToast(res['message']);
        this.getProductsList();
      }

      this.hideLoading();
    }, err => {
      this.hideLoading();
      this.handleError(err);
    });
  }
  saveAdvanced = (body) => {

    this.showLoading();
    this.subs.sink = this.dataService.saveAdvanced(body, this.selectedId).subscribe(res => {

      if (res['status'] == true) {
        this.getProductsList();
        this.toaster.showSuccessToast('تم التعديل بنجاح');
        this.hideTabs();
        this.addState = true;
      }

      this.hideLoading();
    }, err => {
      this.hideLoading();
      this.handleError(err);
    });
  }
  saveDetails = (body) => {

    this.showLoading();
    this.subs.sink = this.dataService.saveDetails(body, this.selectedId).subscribe(res => {

      if (res['status'] == true) {
        this.getProductsList();
        this.toaster.showSuccessToast('تم التعديل بنجاح');
        this.hideTabs();
        this.addState = true;
      }

      this.hideLoading();
    }, err => {
      for (const [key, value] of Object.entries(err.error.errors)) {
        console.log(`${key}: ${value}`);
        this.toaster.showErrorToast(`${value}`)
      }
      this.hideLoading();
    });
  }

  handleProductData = (body) => {
    if (this.addState) {
      this.addProduct(body);
    } else {
      this.editProduct(body, this.selectedId);
      this.hideTabs();
      this.addState = true;
    }
  }

  whenDeletePopupConfirm = (e) => {
    if (e) {
      this.filterDataSourceByRow(this.list.gridRef.dataSource, 'id', this.list.gridRef);
      this.deleteProduct(this.deletedId);

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

  hidePop = () => (this.isOrdersPopupVisible = false);
  showPop = () => (this.isOrdersPopupVisible = true);
  showLoading = () => this.loading.showLoading();
  hideLoading = () => this.loading.hideLoading();
  handleError = (error: any) => this.errorService.handleError(error);


  showDeletePopUp = (id) => { this.isConfirmDeletePopupVisible = true; this.deletedId = id }
  hideDeletePopup = (): boolean => this.isConfirmDeletePopupVisible = false;
  showTabs = (id) => {
    if (id == 'add') {
      this.addState = true;
      this.showtabs = true;
    } else {
      this.addState = false;
      this.showtabs = true;
      this.getProductByID(id);
      this.selectedId = id;
    }

  };
  hideTabs = () => this.showtabs = false;
  constructor(
    private navigationHeaderService: NavigationHeaderService,
    private loading: LoadingService,
    public dataService: DataService,
    private errorService: ErrorHandlerService,
    private toaster: ToasterService
  ) { }
}
