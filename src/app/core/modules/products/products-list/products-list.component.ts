import {
  Component,
  ViewChild,
  OnInit,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular';
import { DataService } from 'src/app/shared/services/data-service/data.service';
import { LoadingService } from 'src/app/shared/services/loading-service/loading.service';
import { ToasterService } from 'src/app/shared/services/toaster/toaster.service';
@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css'],
})
export class ProductsListComponent implements OnInit {
  @ViewChild(DxDataGridComponent) gridRef: DxDataGridComponent;
  @Output() OpenItem: EventEmitter<number> = new EventEmitter<number>();
  @Output() showTabs: EventEmitter<any> = new EventEmitter<any>();
  @Output() showDeletePopUp: EventEmitter<any> = new EventEmitter<any>();
  @Input() ProductsList;
  showProductinList: boolean = false;

  SearchForID=""
  constructor(public toaster: ToasterService,private loading: LoadingService, public dataService: DataService,) {}

  ngOnInit(): void {
  
  }

  hideProduct = () => (this.showProductinList = false);
  onToolbarPreparing(e) {
    e.toolbarOptions.items.push(
      {
        location: 'before',
        text: 'عرض جميع المنتجات',
      },


      {
        location: 'before',
        widget: 'dxButton',

        options: {
          elementAttr: {
            id: 'addNewCustomer',
          },
          icon: 'plus',
          text: 'أضافة منتج جديد',
          onClick: () => {let obj = {
            text: 'أضافة منتج جديد',
            id : this.gridRef.focusedRowKey
          };
          this.showTabs.emit('add')} ,
        },
      }
      ,
      {
        location: 'after',
        widget: 'dxTextBox',
        elementAttr: {
          id: 'valueSearsh',
        },
        options: {
          placeholder: "ادخل البركود",
        value: this.SearchForID
        },
       
      },
      {
        location: 'after',
        widget: 'dxButton',

        options: {
          elementAttr: {
            id: 'addNewCustomer',
          },
         
          text: 'بحث',
          onClick: () => {let obj = {
           
            id : this.gridRef.focusedRowKey
          };
        this.  getProductsList( document.getElementsByTagName('input')[1].value)
          console.log ( document.getElementsByTagName('input')[1].value)
          } ,
        },
      }
      
     
    );
  }
  onCellClicked = (e): void => {
    if (!e.column) {
      return;
    }
    if (e.column?.caption === 'تعديل') {
      debugger
      console.log(this.ProductsList);
      console.log(this.gridRef.focusedRowKey);
      this.OpenItem.emit(this.gridRef.focusedRowKey);
      return;
    }
  };
  getProductsList = (barcode): void => {
    this.showLoading();
     this.dataService.filterProductbarcode(barcode).subscribe(res => {
      this.ProductsList = res.products.data;
      this.hideLoading();
    }, err => {
      this.hideLoading();
    
    });
  }
  showLoading = () => this.loading.showLoading();
  hideLoading = () => this.loading.hideLoading();
}
