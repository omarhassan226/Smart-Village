import { Component, OnInit } from '@angular/core';
import { NavigationHeaderService } from 'src/app/shared/navigation-header.service';
import { DataService } from 'src/app/shared/services/data-service/data.service';
import { ToasterService } from 'src/app/shared/services/toaster/toaster.service';

@Component({
  selector: 'app-show-damage-bills',
  templateUrl: './show-damage-bills.component.html',
  styleUrls: ['./show-damage-bills.component.css']
})
export class ShowDamageBillsComponent implements OnInit {

  bills: any[]
  details_bill = [];
  constructor(private navigationHeaderService: NavigationHeaderService, private dataService: DataService, private toaster: ToasterService) { }
  showPopup = false;
  isConfirmDeletePopupVisible = false;
  selectedBill: any;
  popTitle = "التفاصيل"
  deletedId: any;
  supplierID: any
  isAdminPopupVisibleEdit = false;
  suppliers: any[];
  note: any
  dateBill: any
  EditBillId: any
  popEdit = "'تعديل البيانات الاساسيه"

  ngOnInit(): void {
    this.navigationHeaderService.headerObject$.next({
      headericon: '../../../../assets/images/receipt.svg',
      headerTitle: 'الفواتير',
    });

    this.getBills()
  }

  getBills() {
    this.dataService.GetInvoicesDamage().subscribe
      (res => { this.bills = res.damageInvoices.data; console.log(this.bills) })
  }
  showDetalPopup(id) {

    this.showPopup = true
    this.dataService.GetDamageInvoicesById(id).subscribe(

      res => {
        this.details_bill = [];
        this.selectedBill = res.damageInvoice.products; console.log(this.selectedBill)
        this.selectedBill.forEach(element => {
          element.details_invoices.forEach(item => {
            this.details_bill.push(

              {
                product_name: element.name_ar,
                cost_price: item.pivot.cost_price,
                quantity: item.pivot.d_quantity,
                values: item.pivot.values,
                price: item.pivot.cost_price / item.pivot.d_quantity,



              }
            )


          });

        });

        ;

        console.log("kfjdkjf", this.details_bill)
      },
      arr => { }

    )



  }
  showDeletePopup(id) {
    this.deletedId = id; this.isConfirmDeletePopupVisible = true;
  }

  hidePopUp() {
    this.showPopup = false;
  }

  whenDeletePopupConfirm = (e) => {
    if (e) {
      this.dataService.deleteAdmin(this.deletedId).subscribe(
        res => {
          console.log(res)
          this.hideDeletePopup();

          this.getBills()
          this.toaster.showSuccessToast('تم الحذف بنجاح')
        }
      )



    }
    else {
      this.hideDeletePopup();
    }
  }

  hideDeletePopup() {

    this.isConfirmDeletePopupVisible = false
  }
  showEditPopup(id) {
    this.EditBillId = id;
    let bill = this.bills.find(i => i.id == id);

    this.note = bill.note,
      this.dateBill = bill.date
    this.isAdminPopupVisibleEdit = true
  }
  editbill() {
    const editBill = { date: this.formatDate(this.dateBill), note: this.note, invoice_id: this.EditBillId }

    this.dataService.updateBill(editBill).subscribe(
      res => {
        console.log(res)
        this.hidePopUpEdit();

        this.getBills()
        this.toaster.showSuccessToast('تم  التعديل بنجاح')
      }
      ,
      arr => {
        this.hidePopUpEdit();

        for (const [key, value] of Object.entries(arr.error.errors)) {
          console.log(`${key}: ${value}`);
          this.toaster.showErrorToast(`${value}`)
        }
      }
    )

  }
  getSuppliers() {
    this.dataService.getSuppliers().subscribe(
      res => {
        this.suppliers = res.suppliers.data;
        console.log(this.suppliers);

      }



    )

  }
  hidePopUpEdit() {
    this.isAdminPopupVisibleEdit = false
  }
  formatDate = (date) => {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;

    return [year, month, day].join('-');
  }

}
