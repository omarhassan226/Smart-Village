import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { DxValidatorComponent } from 'devextreme-angular';
import { arrayMax } from 'highcharts';
import { NavigationHeaderService } from 'src/app/shared/navigation-header.service';
import { DataService } from 'src/app/shared/services/data-service/data.service';
import { ToasterService } from 'src/app/shared/services/toaster/toaster.service';

@Component({
  selector: 'app-show-bills',
  templateUrl: './show-bills.component.html',
  styleUrls: ['./show-bills.component.css']
})
export class ShowBillsComponent implements OnInit {
  @ViewChildren(DxValidatorComponent) validatorViewChildren: QueryList<DxValidatorComponent>;
  isAdminPopupVisibleEdit=false
  visiable=true ;
  returnBill=false;
  bills:any[]
  details_bill=[]
  foundedAdd=false
  dateBill ='';
  note="";
  suppliers=[]

  constructor(private navigationHeaderService:NavigationHeaderService ,private dataService :DataService,private toaster :ToasterService) { }

  showPopup=false ;
  isConfirmDeletePopupVisible=false;
  selectedBill :any ;
  popTitle="التفاصيل"
  popEdit="'تعديل البيانات الاساسيه"
  deletedId:any;
  options = [];
  allvalues=[];
  details=[];
  result = [];
  supplierID :any ;
  resultFinal=[];
  products=[];
  EditBillId:any;

  ngOnInit(): void {
    this.navigationHeaderService.headerObject$.next({
      headericon: '../../../../assets/images/receipt.svg',
      headerTitle: 'الفواتير',
    });

    this.getBills()
    this.getSuppliers();
  }

  getBills()
  {
    this.dataService.GetInvoicesSales().subscribe
    (res=>{
      res.salesInvoices.data.forEach(element => {
        if (element.way_pay==1)
        element.way_pay="مدفوع"
        else if (element.way_pay==2)
        element.way_pay="غير مدفوع"
        else 
        element.way_pay="مدفوع جزئيا"
        
      });
      this.bills=res.salesInvoices.data
      ; console.log(this.bills)})
  }
  showEditPopup(id)
  {
    this.EditBillId=id;
    let bill = this.bills.find(i=>i.id==id);
    this.supplierID=bill.supplier.id
    this.note=bill.note,
    this.dateBill=bill.date
    this.isAdminPopupVisibleEdit=true
  }
  
  showDetalPopup(id)
  {
    debugger
  
    this.dataService.GetsalesInvoicesById(id).subscribe(

      res=>{
        this.details_bill=[];
        this.selectedBill=res.salesInvoice.products
        console.log ("fdfdfdfdfdfdf",res.salesInvoice)
      console.log("تةىةىة"+this.selectedBill);
      this.selectedBill.forEach(element => {
        element.details_invoices.forEach(item => {
          this.details_bill.push(

            {
              ptoduct_Id:element.id,
              detailID:item.id,
              product_name:element.name_ar,
              cost_price:item.pivot.cost_price,
              quantity:item.pivot.quantity,
              r_quantity:item.pivot.r_quantity,
              values:item.pivot.values,
              price:item.pivot.cost_price/item.pivot.quantity,
              min_quantity:item.min_quantity ,
              staticQuantity:item.pivot.quantity-item.pivot.r_quantity,




            }
          )

          
        });
        
      });
      
      ;
   
   console.log ("kfjdkjf",this.details_bill)
   this.showPopup=true
  
      },
      arr=>{}

    )



  }
  showReturnBill(id)
  {
    this.deletedId=id
    console.log(this.deletedId)
    debugger
  
    this.dataService.GetsalesInvoicesById(id).subscribe(

      res=>{
        this.visiable=false;
        this.returnBill=true;

        this.details_bill=[];
        this.selectedBill=res.salesInvoice.products
      console.log(this.selectedBill);
      this.selectedBill.forEach(element => {
        element.details_invoices.forEach(item => {
          this.details_bill.push(

            {
              ptoduct_Id:element.id,
              detailID:item.id,
              product_name:element.name_ar,
              cost_price:item.cost_price,
              quantity:item.pivot.quantity,
              quantityReturn:0,
              values:item.pivot.values,
              price:item.pivot.cost_price/item.pivot.quantity,
              min_quantity:item.min_quantity ,
              discount_price:item.discount_price,
              staticQuantity:item.pivot.quantity-item.pivot.r_quantity,




            }
          )

          
        });
        
      });
      
      ;
   
   console.log ("kfjdkjf",this.details_bill)
  
  
      },
      arr=>{}

    )



  }
  showDeletePopup(id)
  {this.deletedId=id ;this.isConfirmDeletePopupVisible=true;
  }
  
  hidePopUp()
  {
    this.showPopup=false;
  }

  whenDeletePopupConfirm = (e) => {
    if (e) {
      this.dataService.deleteAdmin(this.deletedId).subscribe(
        res=>{
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

  hideDeletePopup()
  {

    this.isConfirmDeletePopupVisible=false
  }
 
  
   GetProducts()
  {

this.dataService.getProducts().subscribe(
res=>

{this.products=res.products.data ;
console.log(this.products)
}
,arr=>{


}

)

  }
  addbill()
   {
     debugger

      if ( !this.dateBill||  !this.note  ) {

        return
      }
      else
      {
        let products =[];
        this.details_bill.forEach( item =>
          {
          if(products.length>0)
          {
            products.forEach(element=>
              {
                if(element.product_id==item.ptoduct_Id)
                {

                  if(item.quantityReturn>0)
                  {
              
                  element.details.push({
                    id:item.detailID ,
                
                min_quantity:item.min_quantity ,
                price:item.price ,
                discount_price:item.discount_price,
                cost_price:item.price *item.quantityReturn,
               
               
                quantity:item. quantityReturn,
                values:item.values
                  })
                  this.foundedAdd=true
                }
                }
  
  
              }
  
  
            )
  
  
          
          
          }
          if(this.foundedAdd==false)
          {
            if(item.quantityReturn>0)
            {
            products.push({
              product_id:item.ptoduct_Id,
              details:[{
                id:item.detailID ,
                
                min_quantity:item.min_quantity ,
                price:item.price ,
                discount_price:item.discount_price,
                cost_price:item.price *item.quantityReturn,
               
                quantity:item.quantityReturn,
                values:item.values
              }]
  
  
            })
  
          }
          }
          this.foundedAdd=false
          }
  
        )
        let date =this.formatDate(this.dateBill)
        const addBill={
          date:date,
          note:this.note,
          type:2,  
          parent:this.deletedId,
        
        
         
          products:products
  
  
  
        }
        console.log(addBill)
        this.dataService.AddReturnInvoices(addBill).subscribe(
          res=>{
  
            this.returnBill=false ;
            this.visiable =true;
      
            this.clearDxValidators()
          
            this.toaster.showSuccessToast('تم الاضافه بنجاح ')
          }
          ,
          arr=>{
           
            for (const [key, value] of Object.entries(arr.error.errors)) {
              console.log(`${key}: ${value}`);
              this.toaster.showErrorToast(`${value}`)
            }
          }
        )
  
        
  
      }
  
    
  
   }
   clearDxValidators = () => {
    this.validatorViewChildren.toArray().map(ref => {
      ref.instance.reset();
    })
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
getSuppliers ()
{
this.dataService.getSuppliers().subscribe(
  res=>
  {
   this.suppliers=res.suppliers.data; 
   console.log(this.suppliers) ;

  }



)

}
hidePopUpEdit ()
{
  this.isAdminPopupVisibleEdit=false
}
editbill()
{
  const editBill ={ date:this.formatDate(this.dateBill) ,note :this.note ,supplier_id:this.supplierID , invoice_id:this.EditBillId }

  this.dataService.updateBill(editBill).subscribe(
    res=>{
      console.log(res)
      this.hidePopUpEdit();

      this.getBills()
      this.toaster.showSuccessToast('تم  التعديل بنجاح')
    }
    ,
    arr=>
    {
      this.hidePopUpEdit();
      
      for (const [key, value] of Object.entries(arr.error.errors)) {
        console.log(`${key}: ${value}`);
        this.toaster.showErrorToast(`${value}`)
      }
    }
  )

}

}
