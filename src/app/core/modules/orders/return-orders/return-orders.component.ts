import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationHeaderService } from 'src/app/shared/navigation-header.service';
import { DataService } from 'src/app/shared/services/data-service/data.service';
import { ToasterService } from 'src/app/shared/services/toaster/toaster.service';

@Component({
  selector: 'app-return-orders',
  templateUrl: './return-orders.component.html',
  styleUrls: ['./return-orders.component.css']
})
export class ReturnOrdersComponent implements OnInit {
  orders: any[] = [];
  notifications: any[] = [];
  unreadCount = 0;

  // Navigation / views
  showCompleteOrder = true;
  showOrderDetails = false;
  orderId: any;

  // Filtering
  day = '';
  payment = '';
  status = '';
  daylabel = '';
  paylabel = '';
  statuslabel = '';

  // Entry type (الاشعارات vs أمر الدفع)
  selectedEntryType = 'notifications';

  // Edit status popup
  isAdminPopupVisible = false;
  statusCurrentOrder = '';
  statusCurrentOrderId: any = null;
  deleteMessage = '';
  popTitle2 = "تغير حاله الطلب";

  days = [
    { value: '', key: 'الكل' },
    { value: 1, key: 'اليوم' },
    { value: 7, key: 'منذ اسبوع' },
    { value: 14, key: 'منذ اسبوعين' },
    { value: 30, key: 'منذ شهر' }
  ];

  payments = [
    { value: '', key: 'الكل' },
    { value: 'Pay on receipt', key: 'دفع عند الأستلام' },
    { value: 'Transfer via Bank', key: 'تحويل عبر البنك' }
  ];

  statusOrder2 = [
    { value: 'accepted', key: 'قبول' },
    { value: 'Rejected', key: 'رفض' }
  ];

  statusOrder = [
    { value: '', key: 'الكل' },
    { value: 'new', key: 'جديد' },
    { value: 'process', key: 'تم التجهيز' },
    { value: 'delivering', key: 'قسم التوصيل' },
    { value: 'complete', key: 'مكتمل' },
    { value: 'cancel', key: 'لاغي' }
  ];

  entryTypes = [
    { value: 'payments', key: 'أمر الدفع' },
    { value: 'notifications', key: 'الاشعارات' }
  ];

  constructor(
    private navigationHeaderService: NavigationHeaderService,
    private dataservice: DataService,
    private toaster: ToasterService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.navigationHeaderService.headerObject$.next({
      headericon: 'fas fa-undo-alt',
      headerTitle: 'مرتجع الطلبات',
    });
    this.getReturnOrders();
    this.getNotifications();
  }

  getReturnOrders() {
    this.dataservice.getReturnOrders().subscribe(
      res => {
        let orders = res.orders || [];
        orders.forEach(element => {
          if (element.status == 'Rejected') element.status = ' تم الرفض';
          if (element.status == 'accepted') element.status = 'تم القبول';
          if (element.status == 'process') element.status = 'تم التجهيز';
          if (element.status == 'delivering') element.status = 'قسم التوصيل';
          if (element.status == 'complete') element.status = 'مكتمل';
          if (element.status == 'new') element.status = 'جديد';
          if (element.status == 'review') element.status = 'مرتجع';
          if (element.way_pay == 'Transfer via Bank') element.way_pay = 'تحويل عبر البنك';
          if (element.way_pay == 'Pay on receipt') element.way_pay = 'دفع عند الأستلام';
        });
        this.orders = orders;
      },
      err => {
        this.toaster.showErrorToast('حدث خطأ أثناء جلب الطلبات المرتجعة');
      }
    );
  }

  getNotifications() {
    this.dataservice.getNotifications().subscribe(
      res => {
        this.notifications = res.notifications || [];
        this.unreadCount = res.count || 0;

        // Update entryTypes list with unreadCount
        this.entryTypes = [
          { value: 'payments', key: 'أمر الدفع' },
          { value: 'notifications', key: `الاشعارات - ${this.unreadCount}` }
        ];
      },
      err => {
        console.error('Error fetching notifications', err);
      }
    );
  }

  viewDetails(id: any) {
    this.router.navigate([`/userNotification/${id}`]);
  }

  showDetailsPage2(id: any) {
    this.orderId = id;
    this.showCompleteOrder = false;
    this.showOrderDetails = true;
  }

  showEditPopup(id: any, status: any) {
    this.isAdminPopupVisible = true;
    if (status == 'تم التجهيز') status = 'process';
    if (status == 'قسم التوصيل') status = 'delivering';
    if (status == 'مكتمل') status = 'complete';
    if (status == 'جديد') status = 'new';
    if (status == 'ملغي') status = 'cancel';
    if (status == 'تم القبول') status = 'accepted';
    if (status == ' تم الرفض') status = 'Rejected';

    this.statusCurrentOrder = status;
    this.statusCurrentOrderId = id;
  }

  hidePopUp() {
    this.isAdminPopupVisible = false;
  }

  editStatusOdrer() {
    let updateOrder = { order_id: this.statusCurrentOrderId, status: this.statusCurrentOrder, message: this.deleteMessage };
    this.dataservice.ReturnOrder(updateOrder).subscribe(
      res => {
        this.toaster.showSuccessToast('تم بنجاح');
        this.isAdminPopupVisible = false;
        this.deleteMessage = '';
        this.getReturnOrders();
      },
      arr => {
        if (arr.error && arr.error.errors) {
          for (const [key, value] of Object.entries(arr.error.errors)) {
            this.toaster.showErrorToast(`${value}`);
          }
        } else {
          this.toaster.showErrorToast('حدث خطأ أثناء تغيير الحالة');
        }
      }
    );
  }

  showDay(e: any) {
    this.daylabel = this.days.find(element => element.value == e.value)?.key || '';
  }

  showPayMethod(e: any) {
    this.paylabel = this.payments.find(element => element.value == e.value)?.key || '';
  }

  showStatus(e: any) {
    this.statuslabel = this.statusOrder.find(element => element.value == e.value)?.key || '';
  }

  print() {
    window.print();
  }
}
