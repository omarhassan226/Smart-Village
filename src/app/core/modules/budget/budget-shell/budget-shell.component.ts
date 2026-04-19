import { Component, OnInit } from '@angular/core';

import { DataService } from 'src/app/shared/services/data-service/data.service';
import { ToasterService } from 'src/app/shared/services/toaster/toaster.service';
import { NavigationHeaderService } from '../../../../shared/navigation-header.service';

@Component({
  selector: 'app-budget-shell',
  templateUrl: './budget-shell.component.html',
  styleUrls: ['./budget-shell.component.css']
})
export class BudgetShellComponent implements OnInit {
  shippingList:any[]
  quantity:any
  AvailableAmount:any []
  budget:any;
  Debit:any;
  Debits:any[]
  UpdateDepit=false
  sumation:any ;
  trackers:any[];
  isAdminPopupVisible=false;
  title="تعديل"
  amount='';
  date='';
  note=''
 
  constructor(private navigationHeaderService:NavigationHeaderService ,private dataService : DataService ,private toaster:ToasterService) { }

  ngOnInit(): void {
    this.navigationHeaderService.headerObject$.next({
      headericon: '../../../../assets/images/budget.svg',
      headerTitle: 'المحفظة',
    });
    this.getAvailableAmount()
    this.getDebit ()
    this.getTracker()
  }
  getAvailableAmount ()
  {


    this.dataService.getAvailableAmount().subscribe(
res=>
{

  console.log(res)
  this.quantity=res.sum
  this.AvailableAmount=res.AvailableAmount
}

    )  
  }
  getDebit ()
  {


    this.dataService.getDebit().subscribe(
res=>
{

  console.log(res)
  this.Debit=res.sum
  this.Debits=res.Debits.data

}

    )  
  }
  getTracker ()
  {
    this.dataService.getTracker().subscribe(
res=>
{
this.trackers=res.trackers.data
this.sumation="اجمالي التعاملات :"+res.sum 
  console.log(res)
  
}

    )  
  }
  editSupplier()
  {


    console.log("edfsfds")
  }
  hidePopUp() {
    this.isAdminPopupVisible = false

  }
  showPopUp()
  { this.isAdminPopupVisible = true
  }
  trackerPDF()
  {
    window.open("https://smartvillageapp.com/app/admin/tracker/pdf", "_blank");
  }
  trackerExcel()
  {
    window.open("https://smartvillageapp.com/app/admin/Tracker/Excel", "_blank");
  }
  debitPDF()
  {
    window.open("https://smartvillageapp.com/app/admin/debit/pdf", "_blank");
  }
  debitExcel()
  {
    window.open("https://smartvillageapp.com/app/admin/debit/Excel", "_blank");
  }
  cashPDF()
  {
    window.open("https://smartvillageapp.com/app/admin/cash/pdf", "_blank");
  }
  cashExcel()
  {
    window.open("https://smartvillageapp.com/app/admin/amount/Excel", "_blank");
  }


  editAmount()
  {
    


    if (!this.amount  )
    {return}
    else
    {
      const body={amount:this.amount , note:this.note}
      this.dataService.EditvailableAmount(body).subscribe(
        res=>
        {
        
          this.date='';
          this.note='';
          this.amount='';
    
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
  UpdateDepitt()
  {


    if (!this.amount )
    {return}
    else
    {
      const body={  amount:this.amount }
      this.dataService.UpdateDepit(body).subscribe(
        res=>
        {
        
          this.date='';
          this.note='';
          this.amount='';
    
          this.toaster.showSuccessToast('تم بنجاح')
          this.UpdateDepit = false;
  
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
showPopUpDepit()
{
  this.UpdateDepit=true;
}
}
