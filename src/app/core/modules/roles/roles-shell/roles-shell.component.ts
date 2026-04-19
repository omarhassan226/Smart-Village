import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { DxValidatorComponent } from 'devextreme-angular';
import { DxiConstantLineComponent } from 'devextreme-angular/ui/nested';

import { NavigationHeaderService } from '../../../../shared/navigation-header.service';
import { DataService } from '../../../../shared/services/data-service/data.service';
import { ToasterService } from '../../../../shared/services/toaster/toaster.service';

@Component({
  selector: 'app-roles-shell',
  templateUrl: './roles-shell.component.html',
  styleUrls: ['./roles-shell.component.css']
})
export class RolesShellComponent implements OnInit {
  @ViewChildren(DxValidatorComponent) validatorViewChildren: QueryList<DxValidatorComponent>;
  mainCategoryList: any
  category = false
  user = false
  order = false
  report = false
  cost = false
  baner = false
  admin = false
  role = false
  delivery = false
  setting = false
  product = false
  budget=false
  bill=false

  role_name = ''
  editcategory = false
    edituser = false
    editorder = false
  editreport = false
   editcost = false
   editbaner = false
   editadmin = false
  editrole = false
  editdelivery = false
  editsetting = false
  editproduct = false
  editbudget=false
  editbill=false

    editrole_name = ''
  popTitle='تعديل صلاحيه'
  roles: any[]
  isConfirmDeletePopupVisible = false
  isEditPopupVisible = false

  deletedRole: any
  whenDeletePopupConfirm = (e) => {
    if (e) {
      this.dataservice.deleteRoleById(this.deletedRole).subscribe(
        res => {
          this.toaster.showSuccessToast('تم بنجاح')


          this.getRoles()
        }
        



      )
      this.hideDeletePopup();
    }
    else {
      this.hideDeletePopup();
    }}
  showDeletePopup(id) {

    this.deletedRole = id
    this.isConfirmDeletePopupVisible=true

  }
  hideDeletePopup() {
    this.isConfirmDeletePopupVisible = false
    this.isEditPopupVisible = false
    this.editrole_name = ''
    this.permission = []
    this.editcategory = false
    this.edituser = false
    this.editorder = false
    this.editreport = false
    this. editcost = false
    this.editbaner = false
    this.editadmin = false
    this.editrole = false
    this.editdelivery = false
    this.editsetting = false
    this.editproduct = false
   this.editbudget=false
   this.editbill=false
}
  showEditPopup(id) {


    this.deletedRole=id
    this.dataservice.getRoleById(id).subscribe(
      res => {
        this.editrole_name = res.role.name

        res.role.permissions.forEach(
          item => {

            if (item.name == 'user') {
              this.edituser = true
            }
            if (item.name == 'category') {
              this.editcategory = true
            }
            if (item.name == 'order') {
              this.editorder = true
            }
            if (item.name == 'bill') {
              this.editbill = true
            }
            
            if (item.name == 'report') {
              this.editreport = true
            }
            if (item.name == 'budget') {
              this.editbudget = true
            }
           
            if (item.name == 'cost') {
              this.editcost = true
            }
            if (item.name == 'role') {
              this.editrole=true
            }
            if (item.name == 'admin') {
              this.editadmin = true
            }
            if (item.name == 'baner') {
              this.editbaner=true
            }
            if (item.name  == 'delivery') {
              this.editdelivery=true
            }
            if (item.name == 'product') {
              this.editproduct =true
            }
            if (item.name  == 'setting') {
              this.editsetting=true
            }


          }

        )
        this.isEditPopupVisible = true


      }
    )

  }
  
 
  permission:any[]=[]
  maincategory2 = [{ id: 6, category_ar: "jh" }, { id: 8, category_ar: 'hgh' }]
  categories = [{ name_ar: 'عرض التصنيفات', name_en: 'read_category' },
    { name_ar: 'اضافه تصنيف', name_en: 'create_category' },
    { name_ar: 'تعديل التصنيفات', name_en: 'update_category' },
    { name_ar: 'حذف التصنيفات', name_en: 'delete_category' }]
  users = [{ name_ar: 'عرض المستخدمين', name_en: 'read_user' },
    { name_ar: 'اضافه مسخدم', name_en: 'create_user' },
    { name_ar: 'تعديل مستخدم', name_en: 'update_user' },
    { name_ar: 'حذف متخدم', name_en: 'delete_user' }]
  costs = [{ name_ar: 'عرض التكاليف', name_en: 'read_cost' },
    { name_ar: 'اضافه تكلغه', name_en: 'create_cost' },
    { name_ar: 'تعديل التكاليف', name_en: 'update_cost' },
    { name_ar: 'حذف التكاليف', name_en: 'delete_cost' }]
  orders = [{ name_ar: 'عرض الطلابات', name_en: 'read_order' },
    { name_ar: 'اضافه طلب ', name_en: 'create_order' },
    { name_ar: 'تعديل طلب ', name_en: 'update_order' },
    { name_ar: 'حذف طلب ', name_en: 'delete_order' }]
  products = [{ name_ar: 'عرض المنتجالت', name_en: 'read_product' },
    { name_ar: 'اضافه منتج', name_en: 'create_product' },
    { name_ar: 'تعديل منتج', name_en: 'update_product' },
    { name_ar: '', name_en: 'delete_product' }]
  clearDxValidators = () => {
    this.validatorViewChildren.toArray().map(ref => {
      ref.instance.reset();
    })
  }

  constructor (private navigationHeaderService: NavigationHeaderService,private dataservice: DataService, private toaster: ToasterService) { }

  ngOnInit(): void {

    this.getRoles()
    this.navigationHeaderService.headerObject$.next({
      headericon: 'key',
      headerTitle: 'الصلاحيات',
    });
  }




  addRole() {
    if (!this.role_name) {

      return
    }
    else {

      if (this.user == true) {
        this.permission.push('user')
      }

      if (this.category == true) {
        this.permission.push('category')
      }
      if (this.bill == true) {
        this.permission.push('bill')
      }
      if (this.report == true) {
        this.permission.push('report')
      }
      if (this.budget == true) {
        this.permission.push('budget')
      }
      if (this.order == true) {
        this.permission.push('order')
      }
      if (this.cost == true) {
        this.permission.push('cost')
      }
      if (this.role == true) {
        this.permission.push('role')
      }
      if (this.admin == true) {
        this.permission.push('admin')
      }
      if (this.baner == true) {
        this.permission.push('baner')
      }
      if (this.delivery == true) {
        this.permission.push('delivery')
      }
      if (this.product == true) {
        this.permission.push('product')
      }
      if (this.setting == true) {
        this.permission.push('setting')
      }


     
    }
    
    
    const addRole = { name: this.role_name, permissions: this.permission }
    this.dataservice.addRole(addRole).subscribe(

      res => {
        this.role_name = ''
        this.permission = []
        this.category = false
        this.user = false
        this.order = false
        this.report = false
        this .cost = false
        this. baner = false
        this. admin = false
        this. role = false
        this .delivery = false
        this. setting = false
        this. product = false
        this.budget=false
        this.bill=false


        this.clearDxValidators()
        this.toaster.showSuccessToast('تم الاضافه بنجاح')

        this.getRoles()
      }, arr => {
        console.log(arr.error.errors) 
        for (const [key, value] of Object.entries(arr.error.errors)) {
          console.log(`${key}: ${value}`);
          this.toaster.showErrorToast(`${value}`)
        }
       
        this.clearDxValidators()
      
      }
    );

   
  }
  editRole() {
    if (!this.editrole_name){

      return

    }
    else {

      if (this.edituser == true) {
        this.permission.push('user')
      }

      if (this.editcategory == true) {
        this.permission.push('category')
      }
      if (this.editbill == true) {
        this.permission.push('bill')
      }
      if (this.editreport == true) {
        this.permission.push('report')
      }
      if (this.editorder == true) {
        this.permission.push('order')
      }
      if (this.editcost == true) {
        this.permission.push('cost')
      }
      if (this.editrole == true) {
        this.permission.push('role')
      }
      if (this.editadmin == true) {
        this.permission.push('admin')
      }
      if (this.editbudget == true) {
        this.permission.push('budget')
      }
      if (this.editbaner == true) {
        this.permission.push('baner')
      }
      if (this.editdelivery == true) {
        this.permission.push('delivery')
      }
      if (this.editproduct == true) {
        this.permission.push('product')
      }
      if (this.editsetting == true) {
        this.permission.push('setting')
      }

    }
    console.log(this.permission)
    const addRole = { name: this.editrole_name, permissions: this.permission }
    this.dataservice.editRole(addRole, this.deletedRole).subscribe(

      res => {
        console.log(res)
       
        this.editrole_name = ''
        this.permission = []
        this.editcategory = false
        this.edituser = false
        this.editorder = false
        this.editreport = false
        this.editcost = false
        this.editbaner = false
        this.editadmin = false
        this.editrole = false
        this.editdelivery = false
        this.editsetting = false
        this.editproduct = false
        this.editbudget=false
        this.editbill=false
        this.clearDxValidators()

        this.toaster.showSuccessToast('تم الاضافه بنجاح')

        this.getRoles()
      }, arr => {
        for (const [key, value] of Object.entries(arr.error.errors)) {
          console.log(`${key}: ${value}`);
          this.toaster.showErrorToast(`${value}`)
        }
       

    
      

      }
    );
   
   

  }
  getRoles() {
    this.dataservice.getRoles().subscribe(
      res => {
        
        this.roles = res.roles;
  
      
        this.isEditPopupVisible = false
        this.editrole_name = ''
        this.permission = []
        this.editcategory = false
        this.edituser = false
        this.editorder = false
        this.editreport = false
        this.editcost = false
        this.editbaner = false
        this.editadmin = false
        this.editrole = false
        this.editdelivery = false
        this.editsetting = false
        this.editproduct = false
        this.editbill=false
        this.editbudget=false
        this.clearDxValidators()
      }
    )


  }


}
