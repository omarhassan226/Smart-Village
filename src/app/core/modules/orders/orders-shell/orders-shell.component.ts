import { Component, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { DxValidatorComponent } from 'devextreme-angular';
import { NavigationHeaderService } from 'src/app/shared/navigation-header.service';
import { DataService } from '../../../../shared/services/data-service/data.service';
import { ToasterService } from '../../../../shared/services/toaster/toaster.service';
import { ProductsTabShellComponent } from '../../products/products-tab-shell/products-tab-shell.component';
import { OrdersBascketComponent } from '../orders-bascket/orders-bascket.component';

@Component({
  selector: 'app-orders-shell',
  templateUrl: './orders-shell.component.html',
  styleUrls: ['./orders-shell.component.css'],
})
export class OrdersShellComponent implements OnInit , OnDestroy{
  @ViewChildren(DxValidatorComponent) validatorViewChildren: QueryList<DxValidatorComponent>;
  @ViewChild('tab') tab : OrdersBascketComponent;
 
  
  addresslist;
  isAdminPopupVisibleupload = false
  isOrdersPopupVisible = false;
  products = [];
  titlefile= "ارفاق ملف"
  showform = false
  productCard: any[] = [];
  cost_prict:any
  productSelected: any
  slider: any[]
  colors: any[]
  sizes: any[]
  users: any[]
  body: any
  values: any[] = []
  way_pay:any
  customerInfo = {};
  showOrderList = true;
  showCompleteOrder = false;
  totalprice = 0;
  costShipping = 0;
  productsListOrder:any[]
  showOrderDetails = false;
  ishidden: boolean;
  popTitle: string;
  companyId = 0
  userId: any
  addressId :any ;
  Shippings: any[];
  cost_shipping = 0;
  selectedOptions: any[] = []
  file: any
  imgSrc2 = "../../../../../assets/images/upload.png"
  savefile() {
    this.isAdminPopupVisibleupload = false}
  hidePopUp() {

    this.imgSrc2 = "../../../../../assets/images/upload.png";

   
    this.isAdminPopupVisibleupload=false
  }
  showPreview1 = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.imgSrc2 = e.target.result;
      reader.readAsDataURL(e.target.files[0]);
      this.file = e.target.files[0];

    }
    else {
      this.imgSrc2 = "../../../../../assets/images/upload.png";

      this.file = null;
    }
  }
  deleteUser() {
    debugger
    this.tab.resetForm();
    this.customerInfo = {}
    this.userId = null
    this.ishidden = false;
    this.addressId=null;
    this.addresslist=[];
    this.Shippings=[];
    this.companyId=null;
    this.costShipping=0
    


  }
  clearDxValidators = () => {
    this.validatorViewChildren.toArray().map(ref => {
      ref.instance.reset();
    })
  }
  addProduct = (event) => {
    debugger;
    this.values = []
    debugger
    if (event.sizeId != null)
    {
      const addkey = { randam_key1: event.sizeId }
      this.values.push(event.sizeId)
    }
    if (event.colorId !=null) {
      const addkey = { randam_key2: event.colorId }
      this.values.push(event.colorId)
    }
    if (event.imagId != null) {
      debugger
      const addkey = { randam_key3: event.imagId }
      this.values.push(event.imagId )
    }

   
    if (this.values.length == 3) {
     this.body = { product_id: event.id, values: { randam_key1: this.values[0], randam_key2: this.values[1], randam_key3: this.values[2] } }
    } 

      

    else if (this.values.length == 2) {
      this.body = { product_id: event.id, values: { randam_key1: this.values[0], randam_key2: this.values[1] } }
    }
    else if (this.values.length == 1) {
      this.body= { product_id: event.id, values: { randam_key1: this.values[0] } }
    }
    else
    {
      this. body = { product_id: event.id, values: {  } }
    }


  

    if (this.slider != null) {
      this.slider.forEach(item => {
        debugger
        if (item.randam_key == event.imagId) {
          this.selectedOptions.push({ display_value: item.display_value, name_ar: item.name_ar, name_en: item.name_en })
        }
      }


      )
    }
    if (this.sizes != null) {
      this.sizes.forEach(item => {
        debugger
        if (item.randam_key == event.sizeId) {
          this.selectedOptions.push({ display_value: item.display_value, name_ar: item.name_ar, name_en: item.name_en })
        }
      }


      )
    }
    if (this.colors != null) {
      this.colors.forEach(item => {
        debugger
        if (item.randam_key == event.colorId) {
          this.selectedOptions.push({ display_value: item.display_value, name_ar: item.name_ar, name_en: item.name_en })
        }
      }


      )
    }
    this.dataservice.filterProductPrice(this.body).subscribe
      (
        res => {
          this.totalprice = 0

          console.log("dfdf",res)
          if ( res.detail.discount_price !=0 && res.detail.discount_price) {


            this.cost_prict = res.detail.discount_price;
          }
          else {
            this.cost_prict =res.detail.price_sale ;
          }
      /////   
     
          const newproduct = { detail_id:res.detail.id, product_id: this.productSelected.id, quantity: event.quantity, productTotalPrice: parseFloat(this.cost_prict) * parseInt(event.quantity), selectedOptions: this.selectedOptions }
          console.log(newproduct
          )
          if(event.quantity>res.detail.quantity)
          {
            debugger
            this.toaster.showWarningToast(res.detail.quantity +"الكميه غير متاح  المتاح هو ") ;
           return
          }
          if(this.productCard.find(a=>a.detail_id==res.detail.id))
          {
            debugger
            let edit_product =this.productCard.find(a=>a.detail_id==res.detail.id);
          let  total_countity= edit_product.quantity+event.quantity
          if (total_countity>res.detail.quantity)
          {
            debugger
                       this.toaster.showWarningToast(res.detail.quantity +"الكميه غير متاح  المتاح هو ") ;
           return
          }
          else
          {
            this.productCard.forEach(element => {
              if (element.detail_id==res.detail.id)
              {
                debugger
                element.quantity=total_countity;
                element.productTotalPrice= parseFloat(this.cost_prict) * parseInt(total_countity)


              }
              
            });
            this.products.forEach(element => {
              if (element.detail_id==res.detail.id)
              {
                debugger
                element.quantity=total_countity;
                element.Price= parseFloat(this.cost_prict) * parseInt(total_countity)
                element.weight=parseInt(this.productSelected.weight) * parseInt(total_countity)


              }
              
            });
            this.products.forEach(item => {
              this.totalprice = this.totalprice+item.Price
            })
            if (this.companyId !== 0) {
              this.callweight(this.companyId)
            }
            
            return

          }

          }
          this.productCard.push(newproduct)
          this.products.push({
            ID: this.productSelected.id,
            detail_id:res.detail.id,
            Name: this.productSelected.name_ar,
            Price: parseFloat(this.cost_prict) * parseInt(event.quantity),
            product_price: this.cost_prict,
            Current_Inventory: 225,
            quantity: event.quantity,
            Backorder: 0,
            size: '2x',
            Manufacturing: 10,
            weight: parseInt(this.productSelected.weight) * parseInt(event.quantity),
            Category: 'Video Players',
            ImageSrc: 'https://smartvillageapp.com/app/' +this.productSelected.sliders[0].image,
          });
          this.products.forEach(item => {
            this.totalprice = this.totalprice+item.Price
          }
          )
          this.productsListOrder.forEach(item => {
            if (item.id ==this.productSelected.id) {
              
              item.updated_at = false
              item.created_at = true

            }



          })
          if (this.companyId !== 0) {
            debugger
            this.callweight(this.companyId)
          }
          this.selectedOptions = []
          this.productSelected = null
          this.colors = null;
          this.sizes = null;
          this.slider = null;
          this.showform = false
       
         
        }


    )
   
  
    
    this.isOrdersPopupVisible = false;
  };
  deleteProduct(event)
  {
    debugger
    let id = this.products[event].ID
    this.totalprice=0
    this.productCard.splice(event, 1);
    this.products.splice(event, 1)
    if (this.companyId !== 0) {
     this. callweight(this.companyId) 
    }
    this.products.forEach(item => {
      this.totalprice = this.totalprice + item.Price
    })
    this.productsListOrder.forEach(item => {
      if (item.id == id) {

        item.updated_at = true
        item.created_at = false

      }



    })

  }
  callweight(event) {
    debugger
    let total = 0;
    this.companyId=event
    this.products.forEach(item => {
      total = total + item.weight
    })
    this.dataservice.CalculatePriceShipping({ company_id: event, weight: total }).subscribe
      (res => { console.log(this.costShipping = res.cost) })

  }
  addressUser(event)
  {
    this.Shippings=[];
debugger
this.addressId=event
if (this.way_pay != undefined &&this.addressId!='') {
  const shipingsUser ={  status:this.way_pay ,address_id:this.addressId,order_cost: this.totalprice }
  this.dataservice.shipingsUser(shipingsUser).subscribe(
    res => {
      debugger
      this.Shippings=[];
      this.Shippings = res.shipping;
    },
    arr => {
   

      this.toaster.showErrorToast(arr.error.message)
      
      this.Shippings = [];
      //for (const [key, value] of Object.entries(arr.error.errors)) {
      //  console.log(`${key}: ${value}`);
      //  this.toaster.showErrorToast(`${value}`)
      //}
    }
  )
}

  }



  way_Payment(event)
  {
    this.Shippings=[];
    this.way_pay = event
    if (this.way_pay == 'Transfer via Bank') {

      this.isAdminPopupVisibleupload = true
    }
    else {
      this.file=null
    }
    console.log(event)
    if (this.addressId != undefined && this.addressId != null) {
      const shipingsUser ={  status:this.way_pay ,address_id:this.addressId,order_cost: this.totalprice }
 
      this.dataservice.shipingsUser(shipingsUser).subscribe(
        res => {
          debugger
          this.Shippings=[];
          this.Shippings = res.shipping;
        },
        arr => {
          console.log(arr)
          this.toaster.showErrorToast(arr.error.message)
          this.Shippings=[]
          //for (const [key, value] of Object.entries(arr.error.errors)) {
          //  console.log(`${key}: ${value}`);
          //  this.toaster.showErrorToast(`${value}`)
          //}
        }
      )
    }

  }

  getAddressUser ()
  {
   this.dataservice.getAddressUser(this.userId)
    .subscribe(res => {
      res.address. forEach(element => {
        element.created_at=element?.governorate?.name_ar +" : "+element?.state?.name_ar+" : "+element?.village?.name_ar
      });

      this. addresslist = res.address;
    }, err => {
    });
   }


  addCustomer = (event) => {
    console.log(event)
    this.customerInfo = {
      id:event.id,
      name: event.Fname,
      phone: event.phone,
    };
    debugger
    this.userId = event.id
    this.addressId=null
    // if (this.way_pay != undefined && this.userId != null) {
    //   this.dataservice.shipingsUser(this.userId, this.way_pay, this.totalprice).subscribe(
    //     res => {
    //       this.Shippings = res.shipings
    //     },
    //     arr => {
       

    //       this.toaster.showErrorToast(arr.error.message)
          
    //       this.Shippings = []
    //       //for (const [key, value] of Object.entries(arr.error.errors)) {
    //       //  console.log(`${key}: ${value}`);
    //       //  this.toaster.showErrorToast(`${value}`)
    //       //}
    //     }
    //   )
    // }
   this. getAddressUser ();
    
    this.isOrdersPopupVisible = false;
    this.ishidden = true;
  };
  showDetailsPage = () => {
    this.showCompleteOrder = false;
    this.showOrderDetails = true;
  };
  constructor(private navigationHeaderService: NavigationHeaderService, private dataservice: DataService ,private toaster: ToasterService) {}

  ngOnInit(): void {
    this.navigationHeaderService.headerObject$.next({
      headericon: 'far fa-shopping-cart',
      headerTitle: 'الطلبات',
    });
    this.getProduct() 
  }
ngOnDestroy() {
  
}
  OnHiding = () => {
    this.isOrdersPopupVisible = false
    this.popTitle=null
    this.colors = null;
    this.sizes = null;
    this.slider = null;
    this.showform = false };
  showBascketPopUp = (e) => {
    this.isOrdersPopupVisible = true;
    this.popTitle = 'قم بأختيار العميل';
    this.users = e; 
  };
  showListPopUp = (e) => {
    this.dataservice.getProductById(e).subscribe(
      res => {
        this.colors = null;
        this.sizes = null;
        this.slider = null;
        this.showform = true
        console.log( this.productSelected = res.product)
        this.productSelected.options.forEach(element => {
          if (element.type == 'Color') {
            this.colors = element.values
          }
          //else
          //{
          //  this.colors=null
          //}
          if (element.type == 'image') {

            element.values.forEach(item => {
              item.display_value = 'https://smartvillageapp.com/app/' + item.display_value;
              item.updated_at = false
            })
            this.slider = element.values
          }
          //else {
          //  this.slider=null
          //}
          if (element.type == 'text') {
            this.sizes = element.values
          }
          /*else { }*/

        })
        console.log(this.sizes)
        console.log(this.slider)
        console.log(this.colors)
        this.isOrdersPopupVisible = true;
        this.popTitle = this.productSelected.name_ar;
      }
   ) 
  };
  showCancelOrderPopUp = (e) => {
    debugger
    this.isOrdersPopupVisible = true;
    this.popTitle = e;
  };
  showCompleteOrderPage = () => {
    debugger
    if (!this.userId || this.companyId == 0 || !this.way_pay) { return }
    else {
      console.log( this.productCard)
      if (this.file == null) {
        const addorder = {
          user_id: this.userId,
          shipping_address_id: this.addressId,
          company_shipping_id: this.companyId,
          price_shipping: this.costShipping,
          way_pay: this.way_pay,
          cost: this.totalprice,
          products: this.productCard
        }
        this.dataservice.saveOrder(addorder).subscribe(
          res => {
            console.log(res)
            this.clearDxValidators()
            this.toaster.showSuccessToast('تم اضافه الطلب بنجاح')
            this.showOrderList = false;
            this.showCompleteOrder = true;
          },
          arr => {
            this.toaster.showSuccessToast(' تاكد من البيانات المطلوبه ')
          }
        )
      }

      else {
        console.log(this.file)
        const addorder = new FormData();
        addorder.append('user_id', this.userId)
        addorder.append('file', this.file)
        addorder.append('shipping_address_id', this.addressId)
        addorder.append('company_shipping_id', this.companyId.toString())
        addorder.append('price_shipping', this.costShipping.toString())
        addorder.append('way_pay', this.way_pay)
        addorder.append('cost', this.totalprice.toString())
        addorder.append('products', JSON.stringify(this.productCard))

        this.dataservice.saveOrder(addorder).subscribe(

          res => {
            console.log(res)
            this.clearDxValidators()
            this.toaster.showSuccessToast('تم اضافه الطلب بنجاح')
            this.showOrderList = false;
            this.showCompleteOrder = true;
          },
          arr => {
            this.toaster.showSuccessToast(' تاكد من البيانات المطلوبه ')
          }
        )
      }
       }
  }
  getProduct() {
    this.dataservice.getProducts().subscribe(res => {
      this.productsListOrder = res.products.data
      console.log(this.products)

      this.productsListOrder.forEach(item => {
        item.sliders = 'https://smartvillageapp.com/app/' + item.sliders[0].image
        item.updated_at = true
        item.created_at=false
        console.log(item.sliders)
      })
      console.log(this.productsListOrder)
    })
  }
}
