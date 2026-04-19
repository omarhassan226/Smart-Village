import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { DxValidatorComponent } from 'devextreme-angular';
import { NavigationHeaderService } from 'src/app/shared/navigation-header.service';
import { DataService } from 'src/app/shared/services/data-service/data.service';
import { ToasterService } from 'src/app/shared/services/toaster/toaster.service';

@Component({
  selector: 'app-seller-shell',
  templateUrl: './seller-shell.component.html',
  styleUrls: ['./seller-shell.component.css']
})
export class SellerShellComponent implements OnInit {
  @ViewChildren(DxValidatorComponent) validatorViewChildren: QueryList<DxValidatorComponent>;
 
  content_en='';
  content_ar='';
  name='';
  content_enEdit='';
  content_arEdit='';
  nameEdit='';
  popTitle='تعديل البائع'
  isConfirmDeletePopupVisible=false
  isAdminPopupVisibleEdit=false;
  suppliers:any []
  supplierId:any
  deletedId:any
  constructor(private navigationHeaderService: NavigationHeaderService, private dataservice: DataService, private toaster: ToasterService)
  {
  }

  ngOnInit(): void {
    this.navigationHeaderService.headerObject$.next({
      headericon: '../../../../assets/images/supplier.svg',
      headerTitle: 'البائعين',
    });
   this. getSellers ();
  }
  clearDxValidators = () => {
    this.validatorViewChildren.toArray().map(ref => {
      ref.instance.reset();
    })
  }
  addSupplier ()
  {
    if (!this.name || !this.content_en|| !this.content_ar) {

      return
    }
    else
    {
    const addSupplier ={name :this.name, content_ar: this.content_ar, content_en: this.content_en}
    this.dataservice.AddSellers(addSupplier).subscribe(rea=>{
      this.resetForm ()
    this.clearDxValidators()
    this.getSellers()
    this.toaster.showSuccessToast('تم الاضافه بنجاح ')
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

  }
editSupplier(



  
){

  if(!this.nameEdit || !this.content_arEdit || !this.content_enEdit )
  return
  else{
    const editSupplier = {name:this.nameEdit, content_ar :this.content_arEdit , content_en:this.content_enEdit }
    this.dataservice.UpdateSellers(editSupplier, this.supplierId).subscribe(

      res=>{
        console.log(res)
        this.hidePopUp();
        this.resetForm ()
        this.clearDxValidators()
        this.getSellers()
        this.toaster.showSuccessToast('تم التعديل بنجاح')
      }
      ,
      arr=>{
        this.hidePopUp()
          for (const [key, value] of Object.entries(arr.error.errors)) {
            console.log(`${key}: ${value}`);
            this.toaster.showErrorToast(`${value}`)
          }
      }
    )
 

  }

}
  whenDeletePopupConfirm = (e) => {
    if (e) {
      this.dataservice.DeleteSellers(this.deletedId).subscribe(
        res=>{
          console.log(res)
          this.hideDeletePopup();

          this.getSellers()
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
  getSellers ()
  {
  this.dataservice.getSellers().subscribe(
    res=>
    {
     this.suppliers=res.sellers.data; 
     console.log(this.suppliers) ;

    }



  )

  }
  showDeletePopup(id)
  {
  this.isConfirmDeletePopupVisible=true;
  this.deletedId = id
  }
  showEditPopup (id)
  {
    let editSupplier = this.suppliers.find(a=>a.id==id)
    this.isAdminPopupVisibleEdit=true
    this.nameEdit=editSupplier.name
    this.content_arEdit=editSupplier.content_ar
    this.content_enEdit=editSupplier.content_en
    this.supplierId=editSupplier.id

  }
  hideDeletePopup()
  {
    this.isConfirmDeletePopupVisible=false

  }
  hidePopUp()
  {
    this.isAdminPopupVisibleEdit=false
  }
  
}
