import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { DxValidatorComponent } from 'devextreme-angular';
import { NavigationHeaderService } from 'src/app/shared/navigation-header.service';
import { DataService } from 'src/app/shared/services/data-service/data.service';
import { LoadingService } from 'src/app/shared/services/loading-service/loading.service';
import { ToasterService } from 'src/app/shared/services/toaster/toaster.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-customer-address',
  templateUrl: './customer-address.component.html',
  styleUrls: ['./customer-address.component.css']
})
export class CustomerAddressComponent implements OnInit {

  @ViewChildren(DxValidatorComponent) validatorViewChildren: QueryList<DxValidatorComponent>;

  customerList:any[] ;
  customerListForGrid:any[];
  private subs = new SubSink();
  userId='';

  city_id;
  state_id;
  village_id;
  phone='';
  receiver_name=""
  address='';
  typeName='';

  userIdEdit='';

  city_idEdit;
  state_idEdit;
  village_idEdit;
  phoneEdit='';
  receiver_nameEdit=""
  addressEdit='';
  typeNameEdit='';
  addressId=''
  addresslist:any []
  Villages;
  gridUserId='';
  States;
  Cities;

  types=[{name:'مكتب'},{name:'شفه'},{name:'شركه'} ]


  content_en='';
  content_ar='';
  name='';
  content_enEdit='';
  content_arEdit='';
  nameEdit='';
  popTitle='تعديل العنوان'
  isConfirmDeletePopupVisible=false
  isAdminPopupVisibleEdit=false;

  supplierId:any
  deletedId:any
  constructor(private loading: LoadingService,private navigationHeaderService: NavigationHeaderService, private dataservice: DataService, private toaster: ToasterService)
  {
  }

  ngOnInit(): void {
    this.navigationHeaderService.headerObject$.next({
      headericon: '../../../../assets/images/supplier.svg',
      headerTitle: 'الموردين',
    });

   this.getCustomerList();
   this.getCities();
   this.getStates();
   this.getVillages();
   this.getAllAddress();
   this.getCustomerListForGrid();



  }
  clearDxValidators = () => {
    this.validatorViewChildren.toArray().map(ref => {
      ref.instance.reset();
    })
  }
  addSupplier ()
  {
    if (!this.userId || !this.typeName||!this.city_id ||!this.village_id || !this.state_id || !this.phone ||!this.receiver_name) {

      return
    }
    else
    {
    const addAddres ={
      // address :this.address,
      governorate_id:this.state_id ,
      state_id:this.city_id ,
      village_id:this.village_id,
      type_address:this.typeName,
      phone_number:this.phone,
      user_id:this.userId,
      default:'false',
      receiver_name:this.receiver_name
       }
    this.dataservice.addAddressUser(addAddres).subscribe(rea=>{
   

      this.resetForm ()
    this.clearDxValidators()

    this.toaster.showSuccessToast('تم الاضافه بنجاح ')
    }, arr=>{
      for (const [key, value] of Object.entries(arr.error.errors)) {
        console.log(`${key}: ${value}`);
        this.toaster.showErrorToast(`${value}`)
      }
    })

    }

  }
  EditSupplier ()
  {
    if (!this.userIdEdit || !this.typeNameEdit|| !this.city_idEdit ||!this.village_idEdit || !this.state_idEdit || !this.phoneEdit ||!this.receiver_nameEdit) {

      return
    }
    else
    {
    const addAddres ={
      // address :this.addressEdit,
      governorate_id:this.state_idEdit ,
      state_id:this.city_idEdit ,
      village_id:this.village_idEdit,
      type_address:this.typeNameEdit,
      phone_number:this.phoneEdit,
      user_id:this.userIdEdit,
      default:'false',
      receiver_name:this.receiver_nameEdit,
      shipping_address_id:this.addressId
       }
    this.dataservice.updateShippingAddress(addAddres).subscribe(rea=>{
      this.hidePopUp();
      this.resetForm ();
    this.clearDxValidators();
    this.getAllAddress();

    this.toaster.showSuccessToast('تم تعديل بنجاح ')
    }, arr=>{
      for (const [key, value] of Object.entries(arr.error.errors)) {
        console.log(`${key}: ${value}`);
        this.toaster.showErrorToast(`${value}`)
      }
    })

    }

  }
  resetForm()
  {
this.name='',
this.content_ar ='' ;
this.content_en='';
this.nameEdit='',
this.content_arEdit='' ;
this.content_enEdit='';

this.userIdEdit='';

this.city_idEdit='';
this.state_idEdit='';
this.village_idEdit='';
this.phoneEdit='';
this.receiver_nameEdit=""
this.addressEdit='';
this.typeNameEdit='';
this.addressId=''

this.userId='';

this. city_id='';
this.  state_id='';
this.  village_id='';
this. phone='';
this.  receiver_name=""
this. address='';

  }
editSupplier(){
}
  whenDeletePopupConfirm = (e) => {
    if (e) {
const  body ={shiping_id:this.deletedId};

      this.dataservice.deleteAddressUser(body).subscribe(
        res=>{
          console.log(res)
          this.hideDeletePopup();
          this.getAddressUser();

          this.toaster.showSuccessToast('تم الحذف بنجاح')
        }
        ,
        arr=>
        {for (const [key, value] of Object.entries(arr.error.errors)) {
          console.log(`${key}: ${value}`);
          this.toaster.showErrorToast(`${value}`)
        }}
      )



      }
      else {
        this.hideDeletePopup();
      }
  }
 
  showDeletePopup(id)
  {
  this.isConfirmDeletePopupVisible=true;
  this.deletedId = id
  }
  showEditPopup (id)
  {

    debugger
    let editSupplier = this. addresslist.find(a=>a.id==id)
    console.log(editSupplier)
    this.addressId=editSupplier.id
    this.isAdminPopupVisibleEdit=true
    this.addressEdit=editSupplier.address;
    this.state_idEdit=editSupplier.country_id;
    this.city_idEdit=editSupplier.city_id;
    this.village_idEdit=editSupplier.village_id;
    this.userIdEdit=editSupplier.user_id;
    this.receiver_nameEdit=editSupplier.phone_number;
    this.phoneEdit=editSupplier.phone_number;
    this.typeNameEdit=editSupplier.type_address


  }
  hideDeletePopup()
  {
    this.isConfirmDeletePopupVisible=false

  }
  hidePopUp()
  {
    this.isAdminPopupVisibleEdit=false
  }


  getCustomerList = (): void => {
    this.showLoading();
    this.subs.sink = this.dataservice.getCustomerList().subscribe(res => {
      this.customerList = res.users.data;
      this.customerList.forEach(item=>{
     
          item.Fname=item.Fname+"/"+item.phone
  
  
          
   


      });
      console.log(this.customerList);
      this.hideLoading();
    }, err => {
      this.hideLoading();

    });
  }
  getCustomerListForGrid = (): void => {
    this.showLoading();
    this.subs.sink = this.dataservice.getCustomerList().subscribe(res => {
      this.customerListForGrid = res.users.data;
      this.customerListForGrid.forEach(item=>{
        item.Fname=item.Fname+"/"+item.phone


        
      });
      console.log(this.customerList);
      this.hideLoading();
    }, err => {
      this.hideLoading();

    });
  }

  showLoading = () => this.loading.showLoading();
  hideLoading = () => this.loading.hideLoading();
  getAddressUser ()
  {

    this.showLoading();
    this.subs.sink= this.dataservice.getAddressUser(this.gridUserId)
    .subscribe(res => {
      debugger
      res.address. forEach(element => {
        element.created_at=element?.governorate?.name_ar +" : "+element?.state?.name_ar+" : "+element?.village?.name_ar
      });
      this. addresslist = res.address;
      console.log(this.customerList);
      this.hideLoading();
    }, err => {
      this.hideLoading();

    });

  }


  getAllAddress()
  {

    this.showLoading();
    this.subs.sink= this.dataservice.getAllAddress()
    .subscribe(res => {
      console.log(res)
   debugger
      res.address.forEach(element => {
        element.created_at=element?.governorate?.name_ar +" : "+element?.state?.name_ar+" : "+element?.village?.name_ar
      });
      this.addresslist=res.address;

      this.hideLoading();
    }, err => {
      this.hideLoading();

    });

  }
  getVillages = (): void => {
    this.showLoading();
    this.subs.sink = this.dataservice.getVillages().subscribe(res => {
      this.Villages = res.villages.data;

      this.hideLoading();
    }, err => {
      this.hideLoading();

    });
  }
  getStates = (): void => {
    this.showLoading();
    this.subs.sink = this.dataservice.getStates().subscribe(res => {
      this.States = res.states.data;
      this.hideLoading();
    }, err => {
      this.hideLoading();

    });
  }
  getCities = (): void => {
    this.showLoading();
    this.subs.sink = this.dataservice.getCities().subscribe(res => {
      this.Cities = res.cities.data;
      this.hideLoading();
    }, err => {
      this.hideLoading();

    });
  }

  filterCity( )
  {
    this.showLoading();
    this.subs.sink = this.dataservice.filterCity(this.state_id).subscribe(res => {
      console.log(res)
      this.Cities = res.cities;
      this.hideLoading();
    }, err => {
      this.hideLoading();

    });

  }
  filterVillage( )
  {
    debugger
    this.showLoading();
    this.subs.sink = this.dataservice.filterVillage(this.city_id).subscribe(res => {
      debugger
      console.log(res)

      this.Villages = res.villages;
      debugger
      this.hideLoading();
    }, err => {
      this.hideLoading();

    });

  }
  EditfilterCity( )
  {
    this.showLoading();
    this.subs.sink = this.dataservice.filterCity(this.state_idEdit).subscribe(res => {
      console.log(res)
      this.Cities = res.cities;
      this.hideLoading();
    }, err => {
      this.hideLoading();

    });

  }
  EditfilterVillage( )
  {
    this.showLoading();
    this.subs.sink = this.dataservice.filterVillage(this.city_idEdit).subscribe(res => {
      console.log(res)
      this.Villages = res.villages;
      this.hideLoading();
    }, err => {
      this.hideLoading();

    });

  }

}
