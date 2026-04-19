import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NavigationHeaderService } from 'src/app/shared/navigation-header.service';
import { DataService } from 'src/app/shared/services/data-service/data.service';
import { ToasterService } from 'src/app/shared/services/toaster/toaster.service';

@Component({
  selector: 'app-review-order-list',
  templateUrl: './review-order-list.component.html',
  styleUrls: ['./review-order-list.component.css']
})
export class ReviewOrderListComponent implements OnInit {

 
  @Output() showDetailsPage: EventEmitter<any> = new EventEmitter<any>();
  @Output() canceLOrder: EventEmitter<any> = new EventEmitter<any>();
  isOrdersPopupVisible:boolean=false
orders:any[];
orderId:any;
  popTitle: string
  popTitle2 ="تغير  حاله الطلب"
  isAdminPopupVisible=false
showCompleteOrder:boolean=true
  showOrderDetails: boolean = false
  day =''
  status = ''
  payment = ''
  query = '?'
  daylabel='';
  paylabel = '';
  statuslabel = '';
  deleteMessage='';


  print = () => {
    window.print();
    }
  
  showDay = (e) => {
   this.daylabel =  this.days.find(element => element.value == e.value).key;
  
  }
  showPayMethod =(e) => {
    this.paylabel =  this.payments.find(element => element.value == e.value).key;
  }
  showStatus = (e)=> {
    this.statuslabel =  this.statusOrder.find(element => element.value == e.value).key;
  }
  editStatusOdrer() {
    debugger
    let updateOrder = { order_id: this.statusCurrentOrderId, status: this.statusCurrentOrder ,message:this.deleteMessage}
    this.dataservice.ReturnOrder(updateOrder).subscribe
      (
        res => {
          console.log(res)
          this.popTitle = ''
          this.deleteMessage=''
          this.toaster.showSuccessToast('تم بنجاح')
          this.isAdminPopupVisible = false;
          this.getOrders()
        },
        arr => {
          for (const [key, value] of Object.entries(arr.error.errors)) {
            console.log(`${key}: ${value}`);
            this.toaster.showErrorToast(`${value}`)
          }
        }
    )
  }
  statusCurrentOrder: any
  statusCurrentOrderId:any
  hidePopUp() {
    this.isAdminPopupVisible = false

  }
showDetailsPage2(id)

{
  this.orderId=id

this.showCompleteOrder=false;
this.showOrderDetails=true

}
OnHiding()
{
  this.isOrdersPopupVisible = false;

  }
  cancelOrder(deletedmessage) {

    console.log(this.orderId)
    const body = { message: deletedmessage, order_id: this.orderId }
    this.dataservice.concelOrder(body).subscribe
      (
        res => {
          console.log(res)
          this.popTitle = ''
          this.toaster.showSuccessToast('تم الالغاء بنجاح')
          this.isOrdersPopupVisible = false;
          this.getOrders()
        },
        arr => {
          for (const [key, value] of Object.entries(arr.error.errors)) {
            console.log(`${key}: ${value}`);
            this.toaster.showErrorToast(`${value}`)
          }
        }
      )
  }
canceLOrder2(e,id)
{
this.popTitle=e;
this.orderId=id;
this.isOrdersPopupVisible=true
}
  payments= [
    { value: '', key: 'الكل ' },
    { value: 'Pay on receipt', key: 'دفع عند الأستلام' }
    ,
    { value: 'Transfer via Bank', key: 'تحويل عبر البنك' }
  ]
  days = [
    { value: '', key: 'الكل ' },
    { value: 1, key: 'اليوم ' },
    { value: 7, key: 'منذ اسبوع ' }
    ,
    { value: 14, key: 'منذ اسبوعين' }
    , { value: 30, key: 'منذ شهر' }
  ]


  statusOrder2 =
    [
   { value: 'accepted', key: 'قبول' }
      ,
      { value: 'Rejected', key: 'رفض'},


    ]
statusOrder=
  [
{ value: '', key: 'الكل ' },
{value:'new', key:'جديد'}
,
    { value: 'process', key: 'تم التجهيز'},
    { value: 'delivering', key: 'قسم التوصيل' }
,{value:'complete', key:'مكتمل'}
    , { value: 'cancel', key: 'لاغي' }
]
  operationDescriptions: {

    between: 'بين';
    contains: 'يحتوي';
    endsWith: 'ينتهي ب';
    equal: 'يساوي';
    greaterThan: 'أكبر من';
    greaterThanOrEqual: 'أكبر من أو يساوي';
    lessThan: 'أقل من';
    lessThanOrEqual: 'أقل من أو يساوي';
    notContains: 'لا يحتوي علي';
    notEqual: 'لا يساوي';
    startsWith: 'يبدا ب';
  };
  
  datasource = [
    {
      id: 1,
      name: 'أحمد عصام أحمد',
      code: '#55345',
      price: '2010-01-02T00:00:00.000-10:00',
      category: '2018-01-02T00:00:00.000-10:00',
      quantity: 'بريد عمان',
      paymethod: 'عند الاستلام',
      state: 'مكتمل',
    },
    {
      id: 1,
      name: 'محمد أحمد عمر',
      code: '#56564',
      price: '2010-07-02T00:00:00.000-10:00',
      category: '2016-07-02T00:00:00.000-10:00',
      quantity: 'بريد عمان',
      paymethod: 'عند الاستلام',
      state: 'جديد',
    },
    {
      id: 1,
      name: 'أحمد عصام أحمد',
      code: '#3333',
      price: '2010-06-02T00:00:00.000-10:00',
      category: '2010-01-02T00:00:00.000-10:00',
      quantity: 'بريد عمان',
      paymethod: 'عند الاستلام',
      state: 'قسم التوصيل',
    },
    {
      id: 1,
      name: 'محمد عصام ',
      code: '#55345',
      price: '2017-03-02T00:00:00.000-10:00',
      category: '2016-01-02T00:00:00.000-10:00',
      quantity: 'بريد مصر',
      paymethod: 'اونلاين',
      state: 'تحت التجهيز',
    },
    {
      id: 1,
      name: 'أحمد علي أحمد',
      code: '#3333',
      price: '2016-01-02T00:00:00.000-10:00',
      category: '2010-06-02T00:00:00.000-10:00',
      quantity: 'بريد الامارات',
      paymethod: 'كاش',
      state: 'مكتمل',
    },
    {
      id: 1,
      name: 'أحمد عصام أحمد',
      code: '#55345',
      price: '2013-01-02T00:00:00.000-10:00',
      category: '2030-01-02T00:00:00.000-10:00',
      quantity: 'بريد عمان',
      paymethod: 'عند الاستلام',
      state: 'مكتمل',
    },
  ];
  onCellPrepared = (e) => {
    if (e.value == 'جديد' && e.column.dataField == 'status') {
      e.cellElement.classList.add('new-state');
    }
    if (e.value == 'مكتمل' && e.column.dataField == 'status') {
      e.cellElement.classList.add('complete-state');
    }
    if (e.value == 'قسم التوصيل' && e.column.dataField == 'status') {
      e.cellElement.classList.add('department-state');
    }
    if (e.value == 'تم التجهيز' && e.column.dataField == 'status') {
      e.cellElement.classList.add('under-repairing-state');
    }
  };
  constructor(private navigationHeaderService: NavigationHeaderService, private toaster: ToasterService,private dataservice :DataService) {}

  ngOnInit(): void {
    this.getOrders()
  }
  showEditPopup(id, status) {
    this.isAdminPopupVisible = true
    if (status == 'تم التجهيز') {
      status = 'process'
    }
    if (status == 'قسم التوصيل') {
      status = 'delivering'
    }

    if (status == 'مكتمل') {
      status = 'complete' 
    }
    if (status == 'جديد') {
      status = 'new' 
    }
    if (status == 'ملغي' ) {
      status = 'cancel'
    }

    this.statusCurrentOrder = status
   this. statusCurrentOrderId=id
   
    
  }
  onCellClicked = (e) => {};
  getOrders()
  {

    this.dataservice.getOrdersReview().subscribe(res =>
      {let orders=res.orders
        orders.forEach(element => {

          if(element.status=='Rejected')
          {
            element.status= ' تم الرفض'
          }
          if(element.status=='accepted')
          {
            element.status=  'تم القبول'
          }
          if(element.status=='process')
          {
            element.status= 'تم التجهيز'
          }
          if(element.status=='delivering')
          {
            element.status = 'قسم التوصيل' 
          }
          
          if(element.status=='complete')
          {
            element.status= 'مكتمل'
          }
          if(element.status=='new')
          {
            element.status= 'جديد'
          }
          if (element.status == 'review') {
            element.status = 'مرتجع'
          }
          if (element.way_pay == 'Transfer via Bank') {
            element.way_pay = 'تحويل عبر البنك'
          }
          if (element.way_pay == 'Pay on receipt') {
            element.way_pay = 'دفع عند الأستلام'
          }
    
          
        

          
          
        });
      this.orders = orders
      this.query = '?'

      console.log(this.orders)
      })
  }
  filterOrder() {
    debugger;
    if (this.day !=='')
    {
      console.log(this.day)
      this.query = this.query + 'day=' + this.day + '&'
    }
    if (this.payment !== '') {
      console.log(this.payment)
      this.query = this.query + 'way_pay=' + this.payment + '&'
    }
    if (this.status !== '') {
      this.query = this.query + 'status=' + this.status + '&'
      console.log(this.status)
    }
    console.log(this.query)
    // this.getOrders()
  }
}



