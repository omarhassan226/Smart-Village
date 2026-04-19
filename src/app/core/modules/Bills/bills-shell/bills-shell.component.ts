import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { DxValidatorComponent } from 'devextreme-angular';

import { DataService } from 'src/app/shared/services/data-service/data.service';
import { ToasterService } from 'src/app/shared/services/toaster/toaster.service';
import { NavigationHeaderService } from '../../../../shared/navigation-header.service';

@Component({
  selector: 'app-bills-shell',
  templateUrl: './bills-shell.component.html',
  styleUrls: ['./bills-shell.component.css']
})
export class BillsShellComponent implements OnInit {
  @ViewChildren(DxValidatorComponent) validatorViewChildren: QueryList<DxValidatorComponent>;
  price=0
  total=0
  costPayment:any;
  paymentWay:any;
  categories:any[];
  units:any[];
  products:any[];
  productId:any 
  productDetails:any;
  options :any[];
  details :any [] ;
  allvalues :any[];
  result :any [];
  resultFinal=[]
  basket=[];
  suppliers:any[];
  supplierID :any ;
  typeID=1 ;
  dateBill :any;
  quantity=0;
  detailId:any;
  founded=false;
  foundedAdd=false;
  note="";
  maxQuantity:any;
  pricDamage:any;
  cost_price=this.price*this.quantity;
  typesBills=[{id:1,type:"الشراء"},{id:3,type:"تالف"}]
  typespayment=[{id:1,type:"مدفوع "},{id:2,type:"غير مدفوع"},{id:3,type:"مدفوع جزئيا"}]
  constructor(private navigationHeaderService:NavigationHeaderService ,private dataService :DataService,private toaster :ToasterService) { }
  callCost()
  {
    this.cost_price=this.quantity*this.price;
  }
  ngOnInit(): void {
    this.navigationHeaderService.headerObject$.next({
      headericon: '../../../../assets/images/receipt.svg',
      headerTitle: 'الفواتير',
    });
    this.GetProducts()
    this.getSuppliers()
  }
  addItem()
  {}
  deleteItem (i)
  {
    this.basket.splice(i, 1)
    this.CalTotal()

    debugger
  }
  addCategory()
  {
    if (this.typeID==1)
    {
    this.resultFinal.forEach(element=>
      {
if (element.id==this.detailId)
{
        if (this.basket.length>0)
        {
          this.basket.forEach( item=>
            {
              if(item.id ==element.id)
              {
               
                item.quantity=item.quantity+this.quantity
                this.founded=true;

              }
    
    
    
            })
            if (this.founded==false&&this.quantity>0)
            {

              debugger
              this.basket.push({               
                ProductId:this.productId,
                id:element.id ,
                productName:element.productName,
                min_quantity:element.min_quantity ,
                price:this.price,
                discount_price:element.discount_price,
                cost_price:this.price*this.quantity,
                NameDetail:element.NameDetail,
                quantity:this.quantity
              
              
              
              
              })
            }

    
    
        }
        else{
    if(this.quantity>0)
    {
    this.basket.push({
      ProductId:this.productId,
      id:element.id ,
      productName:element.productName,
      min_quantity:element.min_quantity ,
      price:this.price,
      discount_price:element.discount_price,
      cost_price:this.price*this.quantity,
      NameDetail:element.NameDetail,
      quantity:this.quantity
    
    
    
    
    })}
    
        }
        this.founded=false;

      }
      })}

      else
      {

        this.resultFinal.forEach(element=>
          {
    if (element.id==this.detailId)
    {
        if (this.basket.length>0)
            {
              this.basket.forEach( item=>
                {
                  if(item.id ==element.id)
                  {
                    item.quantity=item.quantity+this.quantity
                    this.founded=true;
                  }
                })
                if (this.founded==false&&this.quantity>0)
                {
                  debugger
                  this.basket.push({               
                    ProductId:this.productId,
                    id:element.id ,
                    productName:element.productName,
                    min_quantity:element.min_quantity ,
                    price:this.pricDamage,
                    discount_price:element.discount_price,
                    cost_price:this.pricDamage*this.quantity,
                    NameDetail:element.NameDetail,
                    quantity:this.quantity
                  })
                }
            }
            else{
        if(this.quantity>0)
        {
        this.basket.push({
          ProductId:this.productId,
          id:element.id ,
          productName:element.productName,
          min_quantity:element.min_quantity ,
          price:this.pricDamage,
          discount_price:element.discount_price,
          cost_price:this.pricDamage*this.quantity,
          NameDetail:element.NameDetail,
          quantity:this.quantity
        })}
            }
            this.founded=false;
          }
          })
      }
      this.quantity=0;
      this.price=0
      this.CalTotal();
  }
  GetProducts()
  {
this.dataService.ProductAvailableInvoices().subscribe(
res=>
{this.products=res.products.data ;
console.log(this.products)
}
,arr=>{
}
)}
  getDetailsProduct()
  {


    this.dataService.getProductById(this.productId).subscribe(
   
      res=>{
        this.allvalues=[];
        this.productDetails=res.product;
        this.patchOptions(this.productDetails.options,this.productDetails.details)
      console.log(this.productDetails)
      console.log(this.result)
      console.log(this.resultFinal)
    console.log(this.details)
    }
    
    )
      console.log(this.productId)

  }
  patchOptions = (options,details) => {

    this.options = [];
    if(options && options.length > 0) {
      options.forEach((e1,i) => {
        options[i].values.forEach((e2 ,j)=> {
          if (options[i].type == 'image') {

        
            options[i].values[j].display_value = options[i].values[j].display_value;
            console.log(options[i].values[j].display_value);
          }
         
        });
      });
      this.options = options;
      this.options.forEach((el) => {
        this.allvalues.push(el.values);
      });
      if(details  && details.length > 0)  {
        this.details = details;
      }
     
     
       this.getPatchoptions(details);
    }
   

  }
  getPatchoptions = (details) => {
 
 
    this.result = [];
    this.details = [];
    this.resultFinal=[];
    if(this.options.length  == 1 &&  this.allvalues.length > 0 ) {
      
     this.allvalues[0].forEach(el1 => {
       this.result.push(`${el1.name_ar} `);
     
     });
    }
     else if (this.options.length == 2 &&  this.allvalues.length > 0) {
     this.allvalues[0].forEach(el1 => {
       this.allvalues[1].forEach(el2 => {
         this.result.push(`${el1.name_ar}/ ${el2.name_ar}`);
         if(!this.details.length) {
   
         }
       
       });
     });
    } else if(this.options.length == 3 &&  this.allvalues.length > 0) {
     this.allvalues[0].forEach(el1 => {
       this.allvalues[1].forEach(el2 => {
         this.allvalues[2].forEach(el3 => {
           this.result.push(`${el1.name_ar} / ${el2.name_ar}/ ${el3.name_ar}`);
        
         });
       });
     });
    
    } 
    this.details = details;
    var product =this.products.filter(a=>a.id==this.productId);
 
    for( var i=0; i<this.result.length; i++)
    {
      this.resultFinal.push(
{
  id:this.details[i].id ,
  productName:product[0].name_ar,
  min_quantity:this.details[i].quantity ,
  price:this.details[i].price ,
  discount_price:this.details[i].discount_price,
  cost_price:this.details[i].cost_price,
  NameDetail:this.result[i],
  quantity:0




}

      );


    }
   
    console.log( "kfjdskfdsk",this.resultFinal)
    
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
   CalTotal()
   {
     this.total=0 ;
     this.basket.forEach(item=>{

      this.total=this.total+ item.quantity*item.price



     }
     )



   }

   addbill()
   {
     debugger
     if(this.typeID ==3 )
     {
      if (!this.typeID || !this.dateBill||  !this.note) {

        return
      }
      else
      {
        let products =[];
        this.basket.forEach( item =>
          {
          if(products.length>0)
          {
            products.forEach(element=>
              {
                if(element.product_id==item.ProductId)
                {
                  element.details.push({
                    id:item.id ,
                
                min_quantity:item.min_quantity ,
                price:item.price ,
                discount_price:item.discount_price,
                cost_price:item.price *item.quantity,
               
               
                quantity:item.quantity,
                values:item.NameDetail
                  })
                  this.foundedAdd=true
  
                }
  
  
              }
  
  
            )
  
  
          
          
          }
          if(this.foundedAdd==false)
          {
            products.push({
              product_id:item.ProductId,
              details:[{
                id:item.id ,
                
                min_quantity:item.min_quantity ,
                price:item.price ,
                discount_price:item.discount_price,
                cost_price:item.price *item.quantity,
               
                quantity:item.quantity,
                values:item.NameDetail
              }]
  
  
            })
  
  
          }
          this.foundedAdd=false
          }
  
        )
       
          let date =this.formatDate(this.dateBill)
          const addBill={
            date:date,
            note:this.note,
            type:this.typeID,
          
         
            products:products
    
    
    
          }
          console.log(addBill)
          this.dataService.AddDamageInvoices(addBill).subscribe(
            res=>{
    
    
              this.basket=[];
        
              this.clearDxValidators()

              this.toaster.showSuccessToast('تم الاضافه بنجاح ')
              this.typeID=1
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
     if (this.typeID==1)
     {
      if (!this.typeID || !this.dateBill|| !this.supplierID) {

        return
      }
      else
      {
        let products =[];
        this.basket.forEach( item =>
          {
          if(products.length>0)
          {
            products.forEach(element=>
              {
                if(element.product_id==item.ProductId)
                {
                  element.details.push({
                    id:item.id ,
                    
                    min_quantity:item.min_quantity ,
                    price:item.price ,
                    discount_price:item.discount_price,
                    cost_price:item.price *item.quantity,
               
                   
                    quantity:item.quantity,
                    values:item.NameDetail
                  })
                  this.foundedAdd=true
  
                }
  
  
              }
  
  
            )
  
  
          
          
          }
          if(this.foundedAdd==false)
          {
            products.push({
              product_id:item.ProductId,
              details:[{
                id:item.id ,
                
                min_quantity:item.min_quantity ,
                price:item.price ,
                discount_price:item.discount_price,
                cost_price:item.price *item.quantity,
               
                quantity:item.quantity,
                values:item.NameDetail

              }]
  
  
            })
  
  
          }
          this.foundedAdd=false
          }
  
        )
        if(this.paymentWay==3)
        {debugger
        let date =this.formatDate(this.dateBill)
        const addBill={
          date:date,
          note:this.note,
          type:this.typeID,
          supplier_id:this.supplierID,
          products:products,
          way_pay:this.paymentWay,
          desposi:this.costPayment
  
  
  
        }
        console.log(addBill)
        this.dataService.AddSalesInvoices(addBill).subscribe(
          res=>{

  
            this.basket=[];
            this.clearDxValidators()
         
            this.toaster.showSuccessToast('تم الاضافه بنجاح ')
            this.typeID=1
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
    else{
      debugger
      let date =this.formatDate(this.dateBill)
      const addBill={
        date:date,
        note:this.note,
        type:this.typeID,
        supplier_id:this.supplierID,
        products:products,
        way_pay:this.paymentWay,
      



      }
      console.log(addBill)
      this.dataService.AddSalesInvoices(addBill).subscribe(
        res=>{


          this.basket=[];
          this.clearDxValidators()
        
          this.toaster.showSuccessToast('تم الاضافه بنجاح ')
          this.typeID=1
        }
        ,
        arr=>{
         
          for (const [key, value] of Object.entries(arr.error.errors)) {
            console.log(`${key}: ${value}`);
            this.toaster.showErrorToast(`${value}`)
          }
        }
      )

      



    }}
      
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
SetQuantityAndPrice()
{
  debugger
let detail=  this.resultFinal.find(a=>a.id==this.detailId)
  this.pricDamage=detail.price;
  this.maxQuantity=parseInt (detail.min_quantity);
}
callCostDamage()
{
  this.cost_price=this.quantity*this.pricDamage;

}
}
