import { Input, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular';
import { DataService } from '../../../../shared/services/data-service/data.service';
import { exportDataGrid as exportDataGridToPdf } from 'devextreme/pdf_exporter';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { ToasterService } from '../../../../shared/services/toaster/toaster.service';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-order-details-list',
  templateUrl: './order-details-list.component.html',
  styleUrls: ['./order-details-list.component.css']
})
export class OrderDetailsListComponent implements OnInit {
  @ViewChild('gridRef') gridRef: DxDataGridComponent;
  @Input() orderId: boolean;
  popTitle3 = 'ارجاع'
  statusOrder3 =
    [
      { value: 'accepted', key: 'قبول' }
      ,
      { value: 'Rejected', key: 'رفض' },


    ]
  productid: any;
  products: any[];
  ReturnProducts: any[];
  order: any;
  new = '';
  delivery = ''
  cancel = ''
  process = ''
  complete = ''
  statuslabel = '';
  deleteMessage = '';
  isAdminPopupVisible = false
  isAdminPopupVisibleReturn = false;
  statusCurrentOrder: any
  statusCurrentOrderId: any
  imageVisible = false
  popImage = "مرفق البنك"
  hidenPopUp() {

    this.imageVisible = false
  }

  datasource = [
    { id: 1, name: 'Apple Watch series4 ساعة آبل الاًصدار الرابع', code: 'K345', price: '10$', category: 'أكسسوارات', quantity: 6, image: '' },
    { id: 2, name: 'Apple Watch series4 ساعة آبل الاًصدار الرابع', code: 'K345', price: '4$', category: 'الكترونيات', quantity: 6, image: '' },
    { id: 3, name: 'Apple Watch series4 ساعة آبل الاًصدار الرابع', code: 'K345', price: '9$', category: 'أكسسوارات', quantity: 6, image: '' },

  ]
  exportGrid() {
    //;
    //const input = document.getElementById('gridRef');
    //html2canvas(input)
    //  .then((canvas) => {
    //    const imgData = canvas.toDataURL('image/png');
    //    const pdf = new jsPDF();
    //    pdf.
    //  ;
    //    pdf.save("download.pdf");
    //  });
    //https://smartvillageapp.com/app/admin/invoice/pdf/25
    window.open("https://smartvillageapp.com/app/admin/invoice/pdf/" + this.order?.id, "_blank");

  }
  showEditPopup(id, status) {
    this.isAdminPopupVisible = true
    //if (status == 'تم التجهيز') {
    //  status = 'process'
    //}
    //if (status == 'قسم التوصيل') {
    //  status = 'delivering'
    //}

    //if (status == 'مكتمل') {
    //  status = 'complete'
    //}
    //if (status == 'جديد') {
    //  status = 'new'
    //}
    //if (status == 'ملغي') {
    //  status = 'cancel'
    //}

    this.statusCurrentOrder = status
    this.statusCurrentOrderId = id


  }
  showImage() {

    this.imageVisible = true
  }
  hidePopUp() {
    this.isAdminPopupVisible = false
    this.isAdminPopupVisibleReturn = false;

  }
  popTitle2 = "تغير  حاله الطلب"
  statusOrder2 =
    [
      { value: 'new', key: 'جديد' }
      ,
      { value: 'process', key: 'تم التجهيز' },
      { value: 'delivering', key: 'قسم التوصيل' }
      , { value: 'complete', key: 'مكتمل' }

    ]
  print = () => {
    window.print();
  }

  downloadFile(fileUrl: string) {
    fetch(fileUrl)
      .then(response => response.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileUrl.substring(fileUrl.lastIndexOf('/') + 1) || 'download';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      })
      .catch(err => {
        window.open(fileUrl, '_blank');
      });
  }

  constructor(private dataservice: DataService, private toaster: ToasterService) { }
  editStatusOdrer() {

    let updateOrder = { order_id: this.statusCurrentOrderId, status: this.statusCurrentOrder }
    this.dataservice.updaterderStatus(updateOrder).subscribe


      (

        res => {
          console.log(res)

          this.toaster.showSuccessToast('تم بنجاح')

          this.isAdminPopupVisible = false;



        },
        arr => {
          for (const [key, value] of Object.entries(arr.error.errors)) {
            console.log(`${key}: ${value}`);
            this.toaster.showErrorToast(`${value}`)
          }

        }



      )



  }
  paymentStatus(id) {
    this.dataservice.updatePayment(id).subscribe
      (res => {
        console.log(res)

        this.toaster.showSuccessToast('تم بنجاح')
        this.order.pay_status = 'pay ok'





      },
        arr => {
          for (const [key, value] of Object.entries(arr.error.errors)) {
            console.log(`${key}: ${value}`);
            this.toaster.showErrorToast(`${value}`)
          }

        }
      )

  }
  notpaymentStatus(id) {

    this.dataservice.updatePaymentPending(id).subscribe
      (res => {
        console.log(res)

        this.toaster.showSuccessToast('تم بنجاح')
        this.order.pay_status = 'pending'





      },
        arr => {
          for (const [key, value] of Object.entries(arr.error.errors)) {
            console.log(`${key}: ${value}`);
            this.toaster.showErrorToast(`${value}`)
          }

        }
      )
  }
  ngOnInit(): void {

    this.dataservice.getDetailsOrder(this.orderId).subscribe
      (
        res => {

          this.order = res.order
          if (this.order.way_pay == 'Pay on receipt') {
            this.order.way_pay = 'دفع عند الأستلام'
          }
          if (this.order.way_pay == 'Transfer via Bank') {
            this.order.way_pay = 'تحويل عبر البنك'
          }
          if (res.order.products) {
            res.order.products.forEach(item => {
              if (item.product && item.product.image && item.product.image.image) {
                item.product.image.image = 'https://smartvillageapp.com/app/' + item.product.image.image;
              }
              if (Array.isArray(item.selectedOptions)) {
                item.selectedOptions = item.selectedOptions.map(x => x.name_ar || x.name_en || '').filter(Boolean).join(" - ");
              } else if (item.selectedOptions && typeof item.selectedOptions === 'object') {
                item.selectedOptions = item.selectedOptions.name_ar || item.selectedOptions.name_en || '';
              }
            });
            this.products = [...res.order.products];
          }

          if (res.order.return_products) {
            res.order.return_products.forEach(item => {
              if (item.product && item.product.image && item.product.image.image) {
                item.product.image.image = 'https://smartvillageapp.com/app/' + item.product.image.image;
              }
              if (Array.isArray(item.selectedOptions)) {
                item.selectedOptions = item.selectedOptions.map(x => x.name_ar || x.name_en || '').filter(Boolean).join(" - ");
              } else if (item.selectedOptions && typeof item.selectedOptions === 'object') {
                item.selectedOptions = item.selectedOptions.name_ar || item.selectedOptions.name_en || '';
              }
            });
            this.ReturnProducts = [...res.order.return_products];
          }

          if (this.order.status == 'process') {
            this.process = 'text-default';
          }
          if (this.order.status == 'delivering') {
            this.delivery = 'text-default';
          }
          if (this.order.status == 'complete') {
            this.complete = 'text-default';
          }
          if (this.order.status == 'new') {
            this.new = 'text-default';
          }
          if (this.order.status == 'cancel') {
            this.cancel = "text-default";
          }
          if (this.order.shipping_address && this.order.shipping_address.governorate) {
            this.order.created_at = this.order.shipping_address.governorate.state_ar + "-" + this.order.shipping_address.state.city_ar + "-" + this.order.shipping_address.village.village_ar;
          }






          console.log(res)
          console.log(this.order)
        }

      )

  }
  showDeletePopup(id) {
    this.isAdminPopupVisibleReturn = true;
    this.productid = id

  }
  editStatusOdrer2() {

    let product = this.ReturnProducts.find(a => a.id = this.productid)

    let updateOrder = { order_id: this.orderId, product_id: product.product.id, detail_id: this.productid, status: this.statusCurrentOrder, message: this.deleteMessage }
    this.dataservice.productReturn(updateOrder).subscribe
      (
        res => {
          console.log(res)
          this.productid = '';
          this.deleteMessage = ''
          this.toaster.showSuccessToast('تم بنجاح')
          this.isAdminPopupVisible = false;

        },
        arr => {
          for (const [key, value] of Object.entries(arr.error.errors)) {
            console.log(`${key}: ${value}`);
            this.toaster.showErrorToast(`${value}`)
          }
        }
      )
  }

}
