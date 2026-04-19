import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css'],
})
export class CustomerListComponent implements OnInit {
  @Output() showPopUp: EventEmitter<any> = new EventEmitter<any>();
  @Output() showDeletePopUp: EventEmitter<any> = new EventEmitter<any>();
  @Output() showunDeletePopUp: EventEmitter<any> = new EventEmitter<any>();
 
  @ViewChild('gridRef') gridRef: DxDataGridComponent;
  @Input() datasource ;
  // datasource = [
  //   {
  //     id: 2,
  //     name: 'أحمد عصام أحمد',
  //     code: '09346639294',
  //     price: 'أكتوبر - الحصري - الحي السادس',
  //     category: '54',
  //     quantity: '12-2-2020',
  //     image: '',
  //   },
  //   {
  //     id: 3,
  //     name: 'أحمد عصام أحمد',
  //     code: '09346639294',
  //     price: 'مدينة نصر الحي الثامن- عباس العقاد',
  //     category: '65',
  //     quantity: '12-2-2020',
  //     image: '',
  //   },
  //   {
  //     id: 4,
  //     name: 'أحمد عصام أحمد',
  //     code: '09346639294',
  //     price: 'ميدان التحرير - مول البستان',
  //     category: '65',
  //     quantity: '12-2-2020',
  //     image: '',
  //   },
  //   {
  //     id: 5,
  //     name: 'أحمد عصام أحمد',
  //     code: '09346639294',
  //     price: 'أكتوبر - الحصري - الحي السادس',
  //     category: '34',
  //     quantity: '12-2-2020',
  //     image: '',
  //   },
  //   {
  //     id: 6,
  //     name: 'علاء محمد',
  //     code: '01139547573',
  //     price: 'مدينة نصر الحي الثامن- عباس العقاد',
  //     category: '65',
  //     quantity: '12-2-2020',
  //     image: '',
  //   },
  //   {
  //     id: 1,
  //     name: 'علاء محمد',
  //     code: '01139547573',
  //     price: 'ميدان التحرير - مول البستان',
  //     category: '65',
  //     quantity: '12-2-2020',
  //     image: '',
  //   },
  //   {
  //     id: 2,
  //     name: 'علاء محمد',
  //     code: '9653546355',
  //     price: 'أكتوبر - الحصري - الحي السادس',
  //     category: '34',
  //     quantity: '12-2-2020',
  //     image: '',
  //   },
  //   {
  //     id: 3,
  //     name: 'علاء محمد',
  //     code: '9653546355',
  //     price: 'مدينة نصر الحي الثامن- عباس العقاد',
  //     category: '65',
  //     quantity: '12-2-2020',
  //     image: '',
  //   },
  //   {
  //     id: 4,
  //     name: 'محمود جمال أحمد',
  //     code: '9653546355',
  //     price: 'ميدان التحرير - مول البستان',
  //     category: '34',
  //     quantity: '28-2-2021',
  //     image: '',
  //   },
  //   {
  //     id: 5,
  //     name: 'محمود جمال أحمد',
  //     code: '9653546355',
  //     price: 'أكتوبر - الحصري - الحي السادس',
  //     category: '34',
  //     quantity: '28-2-2021',
  //     image: '',
  //   },
  //   {
  //     id: 6,
  //     name: 'محمود جمال أحمد',
  //     code: '9653546355',
  //     price: 'مدينة نصر الحي الثامن- عباس العقاد',
  //     category: '65',
  //     quantity: '28-2-2021',
  //     image: '',
  //   },
  // ];
  constructor() {}
  
  

  ngOnInit(): void { }

  onToolbarPreparing(e) {
    e.toolbarOptions.items.push(
      {
        location: 'before',
        text: 'عرض جميع العملاء',
      },

      {
        location: 'before',
        widget: 'dxButton',

        options: {
          elementAttr: {
            id: 'addNewCustomer',
          },
          icon: 'plus',
          text: 'أضافة عميل جديد',
          onClick: () => {let obj = {
            text: 'أضافة عميل جديد',
            id : this.gridRef.focusedRowKey
          };
          this.showPopUp.emit(obj)} ,
        },
      }
    );
  }
}
