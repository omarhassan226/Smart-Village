import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { NavigationHeaderService } from 'src/app/shared/navigation-header.service';
import { DataService } from 'src/app/shared/services/data-service/data.service';
import { ToasterService } from 'src/app/shared/services/toaster/toaster.service';
import { DxValidatorComponent } from 'devextreme-angular';

interface City {
  name: string,
  code: string
}

@Component({
  selector: 'app-admin-panel-shell',
  templateUrl: './admin-panel-shell.component.html',
  styleUrls: ['./admin-panel-shell.component.css'],
})
export class AdminPanelShellComponent implements OnInit {

  @ViewChildren(DxValidatorComponent) validatorViewChildren: QueryList<DxValidatorComponent>;
  maincategory = [{ id: 6, category_ar: "jh" }, { id: 8, category_ar: 'hgh' }]
  maincategory2 = [{ id: 9, category_ar: "jbvvvbh" }, { id: 10, category_ar: 'hgvgbvbvbvbvh' }]
  mainCategoryList:any
  roles: any[];
  admins:any[]
  popTitle='تعديل مشرف'
  RoleId:any;
  name = '';
  email = '';
  password = '';
  nameEdit = '';
  emailEdit = '';
  passwordEdit = '';
  roleEdit:any;
  adminId
  isAdminPopupVisible:boolean=false;
  deletedId: any;

  isConfirmDeletePopupVisible = false;
    
onhidden(){

  this.isConfirmDeletePopupVisible=false
}

  clearDxValidators = () => {
    this.validatorViewChildren.toArray().map(ref => {
      ref.instance.reset();
    })
  }
  hidePopUp()
  {
    this.isAdminPopupVisible=false;
  }
  
  showEditPopup (id)
  {
    let editAdmin = this.admins.find(a=>a.id==id)
    this.isAdminPopupVisible=true
    this.nameEdit=editAdmin.username
    this.emailEdit=editAdmin.email
    this.roleEdit=editAdmin.role.id
    this.adminId=editAdmin.id


  }
  showDeletePopup(id){ this.isConfirmDeletePopupVisible = true; this.deletedId = id}
  hideDeletePopup()
  {
    this.isConfirmDeletePopupVisible=false

  }
  editAdmin ()  {
    if (!this.nameEdit || !this.roleEdit  ||  !this.passwordEdit ||!this.roleEdit) {
      return
    }
    else{
      const admin={username:this.nameEdit,email:this.emailEdit ,password:this.passwordEdit ,role:this.roleEdit}
   
      this.dataservice.editAdmin(admin,this.adminId).subscribe(
        res=>{
          console.log(res)
          this.hidePopUp();
          this.resetForm ()
          this.clearDxValidators()
          this.getAdmins()
          this.toaster.showSuccessToast('تم التعديل بنجاح')
        }
        , arr => {
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
      this.dataservice.deleteAdmin(this.deletedId).subscribe(
        res=>{
          console.log(res)
          this.hideDeletePopup();

          this.getAdmins()
          this.toaster.showSuccessToast('تم الحذف بنجاح')
        }
      )
        
       

      }
      else {
        this.hideDeletePopup();
      }
  }

  datasource = [
    {
      id: 1,
      name: 'alaa Mohamed',
      code: '959654664',
      price: 'alaa@gmail.com',
      category: ' مشرف عام',
    },
    {
      id: 2,
      name: 'alaa Mohamed',
      code: '959654664',
      price: 'alaa@gmail.com',
      category: 'مدير',
    },
    {
      id: 3,
      name: 'alaa Mohamed',
      code: '959654664',
      price: 'alaa@gmail.com',
      category: 'مشرف',
    },
    {
      id: 4,
      name: 'alaa Mohamed',
      code: '959654664',
      price: 'alaa@gmail.com',
      category: 'مشرف',
    },
  ];
  
  constructor(private navigationHeaderService: NavigationHeaderService, private dataservice: DataService, private toaster: ToasterService)
  {
  }

  ngOnInit(): void {
    this.navigationHeaderService.headerObject$.next({
      headericon: 'user',
      headerTitle: 'المشرفين',
    });
    this.getRoles()
    this.getAdmins()

  
  }
  resetForm ()
  {
    this.name='';
    this.email='';
    this.password='';
    this.RoleId='';
    this.nameEdit='';
    this.emailEdit='';
    this.passwordEdit='';
    this.roleEdit='';


  }
  addAdmin()
  {
    if (!this.name || !this.email  ||  !this.password ||!this.RoleId ) {

      return
    }
    else
    {
      const admin={username:this.name,email:this.email ,password:this.password ,role:this.RoleId}
      console.log(admin);
this.dataservice.addAdmin(admin).subscribe(
  res=>{console.log(res)
    this.resetForm ()
    this.clearDxValidators()
    this.getAdmins()
    this.toaster.showSuccessToast('تم الاضافه بنجاح ')
  }
  , arr => {
    for (const [key, value] of Object.entries(arr.error.errors)) {
      console.log(`${key}: ${value}`);
      this.toaster.showErrorToast(`${value}`)
    }}
  
)

    }

  }
  
  getRoles()
  {
    this.dataservice.getRoles().subscribe(
      res=>{
        console.log(res)
        this.roles=res.roles;
        console.log(this.roles)

      }
    )


  }
  getAdmins()
  {
    this.dataservice.getAdmins().subscribe(
      res=>{
        console.log(res)
        this.admins=res.admins;
        console.log(this.admins)

      }
    )


  }

}
