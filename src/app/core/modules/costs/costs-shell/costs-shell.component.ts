import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular';
import { NavigationHeaderService } from 'src/app/shared/navigation-header.service';
import { DataService } from 'src/app/shared/services/data-service/data.service';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler/error-handler.service';
import { LoadingService } from 'src/app/shared/services/loading-service/loading.service';
import { ToasterService } from 'src/app/shared/services/toaster/toaster.service';
import { SubSink } from 'subsink';
import { CostsFormComponent } from '../costs-form/costs-form.component';
import { CostsListComponent } from '../costs-list/costs-list.component';

@Component({
  selector: 'app-costs-shell',
  templateUrl: './costs-shell.component.html',
  styleUrls: ['./costs-shell.component.css'],
})
export class CostsShellComponent implements OnInit , OnDestroy{
  @ViewChild('costForm') costForm: CostsFormComponent;
  @ViewChild('list')list: CostsListComponent;
  private subs = new SubSink();
  isConfirmDeletePopupVisible = false;
  deletedId;
  editState = false;
  Costs;
  selectedId;

  ngOnInit(): void {
    this.navigationHeaderService.headerObject$.next({
      headericon: 'costs',
      headerTitle: 'التكاليف',
    });
    this.getCosts();
  }
  ngOnDestroy(){
    this.subs.unsubscribe();
  }
submitForm = (body) => {
  if(this.editState) {
    this.editCost(body);
  } else {
    this.addCost(body);
  }
}
  editCost = (body) => {
    debugger;
  this.showLoading();
  this.subs.sink = this.dataService.editCost(body,this.selectedId).subscribe(res => {
    if(res['status']== true) {
      this.getCosts();
      this.costForm.resetForm();
      this.costForm.clearDxValidators();
      this.toaster.showSuccessToast('تم التعديل بنجاح');
      this.costForm.costfile.nativeElement.value = ''
    }
    this.editState = false;
    this.hideLoading();
  }, err => {
    this.hideLoading();
    this.handleError(err);
  });
}
filterCosts = (query): void => {
  this.showLoading();
  this.subs.sink = this.dataService.filterCosts(query).subscribe(res => {
    this.Costs = res.costs;
    this.hideLoading();
  }, err => {
    this.hideLoading();
    this.handleError(err);
  });
}
  addCost = (body) => {

    this.showLoading();

    this.subs.sink = this.dataService.addCost(body).subscribe(res => {
 
      if(res['status']== true) {
        this.getCosts();
        this.costForm.resetForm();
         this.costForm.clearDxValidators();
         this.toaster.showSuccessToast('تم الأضافة بنجاح');
         this.costForm.costfile.nativeElement.value = ''
      }
      
      this.hideLoading();
    }, err => {
      this.hideLoading();
      this.handleError(err);
    });
  }
  getCosts = (): void => {
    this.showLoading();
    this.subs.sink = this.dataService.getCosts().subscribe(res => {
      this.Costs = res.costs.data;
      this.hideLoading();
    }, err => {
      this.hideLoading();
      this.handleError(err);
    });
  }
  deleteCost = (id) => {
    this.showLoading();
    this.subs.sink = this.dataService.deleteCost(id).subscribe(res => {
      if(res['status']== true) {
        this.getCosts();
        this.toaster.showSuccessToast("تم الحذف بنجاح")
      }
      
      this.hideLoading();
    }, err => {
      this.hideLoading();
      this.handleError(err);
    });
  }
  getCostById = (id) => {
    this.showLoading();
    this.subs.sink = this.dataService.getCostById(id).subscribe(res => {
      this.selectedId = id;
      this.costForm.patchForm(res.cost) ;
      this.editState = true;    
      this.hideLoading();
    }, err => {
      this.hideLoading();
      this.handleError(err);
    });
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
showDeletePopup = (id) =>{ this.isConfirmDeletePopupVisible = true; this.deletedId = id}
hideDeletePopup = (): boolean => this.isConfirmDeletePopupVisible = false;
  whenDeletePopupConfirm = (e) => {
    if (e) {
      this.filterDataSourceByRow(this.list.gridRef.dataSource, 'id', this.list.gridRef);
      this.deleteCost(this.deletedId);
      this.Costs = this.list.gridRef.dataSource;
        
        this.hideDeletePopup();
      }
      else {
        this.hideDeletePopup();
      }
  }

  showLoading = () => this.loading.showLoading();
  hideLoading = () => this.loading.hideLoading();
  handleError = (error: any) => this.errorService.handleError(error);
  constructor(
    private dataService: DataService,
    private navigationHeaderService: NavigationHeaderService,
     private loading: LoadingService,private errorService: ErrorHandlerService,
      private toaster:ToasterService) {}
}
