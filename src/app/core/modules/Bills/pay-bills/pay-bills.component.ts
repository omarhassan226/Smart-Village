import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { timeStamp } from 'console';
import { DxValidatorComponent } from 'devextreme-angular';
import { fstat } from 'fs';
import { DataService } from 'src/app/shared/services/data-service/data.service';
import { ToasterService } from 'src/app/shared/services/toaster/toaster.service';
import { threadId } from 'worker_threads';

@Component({
  selector: 'app-pay-bills',
  templateUrl: './pay-bills.component.html',
  styleUrls: ['./pay-bills.component.css']
})
export class PayBillsComponent implements OnInit {
  @ViewChildren(DxValidatorComponent) validatorViewChildren: QueryList<DxValidatorComponent>;
  bills: any[]
  Payment = false
  max: any;
  amount: any;
  note: any
  billID: any;
  title = "دفع الفاتورة"
  clearDxValidators = () => {
    this.validatorViewChildren.toArray().map(ref => {
      ref.instance.reset();
    })
  }
  constructor(private dataService: DataService, private toaster: ToasterService) { }


  ngOnInit(): void {

    this.getBills()
  }
  getBills() {
    this.dataService.invoicesDebit().subscribe
      (
        res => {

          res.invoices.forEach(element => {
            if (element.way_pay == 1)
              element.way_pay = "مدفوع"
            else if (element.way_pay == 2)
              element.way_pay = "غير مدفوع"
            else

              element.way_pay = "مدفوع جزئيا"

          });
          this.bills = res.invoices
            ; console.log(this.bills)
        })
  }
  showReturnBill(id) {

    this.Payment = true
    this.billID = id
    let bill = this.bills.find(i => i.id == id);
    this.max = bill.amount - bill.deposit

  }
  hidePopUp() {
    this.Payment = false
  }
  PaymentAction() {

    if (!this.amount || !this.note) {
      return
    }
    const Payment = { invoice_id: this.billID, amount: this.amount, note: this.note }
    this.dataService.payDebit(Payment).subscribe(
      res => {

        this.hidePopUp();
        this.clearDxValidators()
        this.getBills()
        this.toaster.showSuccessToast('تم الدفع بنجاح')
        this.amount = ""
        this.note = ""

      }
      ,
      arr => { }
    )


  }

}
