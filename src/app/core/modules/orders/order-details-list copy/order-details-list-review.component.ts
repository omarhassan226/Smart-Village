
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular';
import { DataService } from '../../../../shared/services/data-service/data.service';
import { exportDataGrid as exportDataGridToPdf } from 'devextreme/pdf_exporter';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { ToasterService } from '../../../../shared/services/toaster/toaster.service';

@Component({
  selector: 'app-order-details-list-review',
  templateUrl: './order-details-list-review.component.html',
  styleUrls: ['./order-details-list-review.component.css']
})
export class OrderDetailsListReviewComponent implements OnInit {

  @ViewChild('gridRef') gridRef: DxDataGridComponent;
  @Input() orderId: boolean;
  popTitle3='ارجاع'
  statusOrder3 =
    [
   { value: 'accepted', key: 'قبول' }
      ,
      { value: 'Rejected', key: 'رفض'},


    ]
    productid:any ;
  products: any[];
  ReturnProducts :any[];
  order: any;
  new = '';
  delivery = ''
  cancel = ''
  process = ''
  complete = ''
  statuslabel = '';
  deleteMessage='';
  deleteMessage2='';
  isAdminPopupVisible =false
  isAdminPopupVisibleReturn=false;
  statusCurrentOrder: any
  statusCurrentOrderId:any
  imageVisible = false
  popImage = "مرفق البنك"
  hidenPopUp() {
    debugger
    this.imageVisible = false
  }

  datasource = [ 
    {id:1, name: 'Apple Watch series4 ساعة آبل الاًصدار الرابع', code: 'K345', price: '10$', category: 'أكسسوارات', quantity: 6,image: ''},
    {id:2, name: 'Apple Watch series4 ساعة آبل الاًصدار الرابع', code: 'K345', price: '4$', category: 'الكترونيات', quantity: 6,image: ''},
    {id:3, name: 'Apple Watch series4 ساعة آبل الاًصدار الرابع', code: 'K345', price: '9$', category: 'أكسسوارات', quantity: 6,image: ''},
  
  ]
  exportGrid() {
    //debugger;
    //const input = document.getElementById('gridRef');
    //html2canvas(input)
    //  .then((canvas) => {
    //    const imgData = canvas.toDataURL('image/png');
    //    const pdf = new jsPDF();
    //    pdf.
    //  ;
    //    pdf.save("download.pdf");
    //  });

    const doc = new jsPDF();
    //html2canvas
    //doc.setFont('');
    doc.setFont('trado');
    const AmiriRegular = '../../../../../assets/fonts';

    doc.addFileToVFS('Amiri-Regular.ttf', AmiriRegular);
    doc.addFont('Amiri-Regular.ttf', 'Amiri', 'normal');

    doc.setFont('Amiri'); // set font
    var ff = this.gridRef.instance;
    debugger
    exportDataGridToPdf({
        jsPDFDocument: doc,
        component: this.gridRef.instance
    }).then(() => {
        doc.save('Customers.pdf');
    })
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
    debugger
    this.imageVisible = true
  }
  hidePopUp() {
    this.isAdminPopupVisible = false
    this.isAdminPopupVisibleReturn=false;


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



  constructor(private dataservice: DataService, private toaster: ToasterService) { }
  editStatusOdrer() {
    debugger
    let updateOrder = { order_id: this.statusCurrentOrderId, status: this.statusCurrentOrder,message:this.deleteMessage2 }
    this.dataservice.updaterderStatus(updateOrder).subscribe


      (

        res => {
          console.log(res)
        
          this.toaster.showSuccessToast('تم بنجاح')

          this.deleteMessage2='';
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
        this.order.pay_status='pay ok'

   



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
        debugger
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
         debugger
          this.order = res.order
          if (this.order.way_pay == 'Pay on receipt') {
            this.order.way_pay ='دفع عند الأستلام'
          }
          if (this.order.way_pay == 'Transfer via Bank') {
            this.order.way_pay = 'تحويل عبر البنك'
          }
          this.products = res.order.products
          this.ReturnProducts=res.order.return_products
          if (this.order.status == 'process') {
            this.process = 'text-default'
          }
          if (this.order.status == 'delivering') {
            this.delivery = 'text-default'
          }

          if (this.order.status == 'complete') {
            this.complete = 'text-default'
          }
          if (this.order.status == 'new') {
            this.new = 'text-default'
          }
          if (this.order.status == 'cancel') {
            this.cancel = "text-default"
          }
          this.order.created_at =this.order.shipping_address.governorate.state_ar +"-"+this.order.shipping_address.state.city_ar+"-"+this.order.shipping_address.village.village_ar
 
          this.order.products.forEach(item => {
          item.product.image.image ='https://smartvillageapp.com/app/'+ item.product.image.image

          })
      
         
          this.order.products.forEach(item => {
            let optionName =item.selectedOptions.map(x=>x.name_ar).join("-");
            // item.selectedOptions.forEach(element => {
            //   optionName=optionName+element.name_ar+"-"

              
            // });
           item .selectedOptions=optionName

           optionName =''
              })
              this.order.return_products.forEach(item => {
                let optionName ='';
                item.selectedOptions.forEach(element => {
                  optionName=optionName+element.name_ar+"-"
    
                  
                });
               item .selectedOptions=optionName
    
               optionName =''
                  })
              
              this.order.return_products.forEach(item => {
                item.product.image.image ='https://smartvillageapp.com/app/'+ item.product.image.image
      
                })
            
               
            
            
                    debugger
                   
          console.log(res)
          console.log(this.order)
        }

      )

  }
  showDeletePopup(id)
  {
   this. isAdminPopupVisibleReturn=true;
   this.productid=id

  }
  editStatusOdrer2()
  {

let product = this.ReturnProducts.find(a=>a.id=this.productid)

    let updateOrder = { order_id: this.orderId, product_id: product.product.id, detail_id:this.productid,status: this.statusCurrentOrder ,message:this.deleteMessage}
    this.dataservice.productReturn(updateOrder).subscribe
      (
        res => {
          console.log(res)
      this.productid='';
          this.deleteMessage=''
          this.toaster.showSuccessToast('تم بنجاح')
          this.isAdminPopupVisible = false;
          this.isAdminPopupVisibleReturn=false;
         
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
