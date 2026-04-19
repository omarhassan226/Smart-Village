import { Component, OnInit ,ViewChildren,QueryList, OnDestroy} from '@angular/core';
import { NavigationHeaderService } from 'src/app/shared/navigation-header.service';
import { DataService } from 'src/app/shared/services/data-service/data.service';
import { ToasterService } from 'src/app/shared/services/toaster/toaster.service';
import { LoadingService } from 'src/app/shared/services/loading-service/loading.service';
import { DxValidatorComponent } from 'devextreme-angular';

export interface Category 
{
  category_ar :string ;
  category_en :string ;
  iamgeUrl:string ;
  photo:string ;
  sortnumber:any;
  
  


}
export interface editCategory {
  id: any
  category_ar: string;
  category_en: string;
  iamgeUrl: string;
  photo: string;
  sortnumber:any;




}

@Component({
  selector: 'app-categories-shell',
  templateUrl: './categories-shell.component.html',
  styleUrls: ['./categories-shell.component.css'],
})
export class CategoriesShellComponent implements OnInit, OnDestroy {
  @ViewChildren(DxValidatorComponent) validatorViewChildren: QueryList<DxValidatorComponent>;
  categories =[]; 
  sub_CategoriesForm:FormData []=[];
  sub_Categories :any[]=[];
  mainCategory:Category ={category_ar:'',sortnumber:null, category_en:'', iamgeUrl:'../../../../../assets/images/upload.png' , photo:''}
  state:boolean=false;
  categoryId:any ;
  isConfirmDeletePopupVisible = false;
  deletedId:any;

  products = [
    {
      ID: 1,
      Name: 'الموبايل',
    },
    {
      ID: 1,
      Name: 'الموبايل',
    },
    {
      ID: 1,
      Name: 'الموبايل',
    },
    {
      ID: 1,
      Name: 'الموبايل',
    },
    {
      ID: 1,
      Name: 'الموبايل',
    },
    {
      ID: 1,
      Name: 'الموبايل',
    },
  ];
  clearDxValidators = () => {
    this.validatorViewChildren.toArray().map(ref => {
      ref.instance.reset();
    })
  }
  constructor(private loading: LoadingService,private navigationHeaderService: NavigationHeaderService ,private dataservice :DataService , private toaster:ToasterService) {}

  ngOnInit(): void {
    this.navigationHeaderService.headerObject$.next({
      headericon: 'categories',
      headerTitle: 'التصنيفات',
    });
    this.sub_Categories.push({category_ar:'', category_en:'' , iamgeUrl:'../../../../../assets/images/upload.png',photo:'' })
    this. getCategories ();
  }
  ngOnDestroy() {
    
  }
  showLoading = () => this.loading.showLoading();
  hideLoading = () => this.loading.hideLoading();
  hideDeletePopup()
  {
    this.isConfirmDeletePopupVisible=false

  }
  whenDeletePopupConfirm = (e) => {
    if (e) {
      this.dataservice.deleteCategory(this.deletedId).subscribe(
        res=>{
          console.log(res)

          this.getCategories()
          this.toaster.showSuccessToast('تم الحذف بنجاح')
        },


        arr => {
          for (const [key, value] of Object.entries(arr.error.errors)) {
            console.log(`${key}: ${value}`);
            this.toaster.showErrorToast(`${value}`)
          }
        }






      )
        
        this.hideDeletePopup();

      }
      else {
        this.hideDeletePopup();
      }
  }

  uploadFile (event)
  {

    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) =>   this.mainCategory.iamgeUrl = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
    this.mainCategory.photo =event.target.files[0]
      
    }
  }
  showPreview(event, i) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) =>   this.sub_Categories[i].iamgeUrl = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
    this.sub_Categories[i].photo =event.target.files[0]
      
    }
     // this.image = event.target.files[0];
      
    
  }
  addItem ()
  {
   // const ArraList:any []=[];
    //this.sub_Categories.forEach(item=>ArraList.push(item))
    
    

    const addCategory: editCategory = {id:null,sortnumber:null, category_ar: '', category_en: '', iamgeUrl: '../../../../../assets/images/upload.png', photo: '' }
    this.sub_Categories.push(addCategory);
   
    
    console.log (this.sub_Categories)


  
  }
  addCategory ()
{
if (!this.mainCategory.category_ar ||!this.mainCategory.category_en)
{
return

}
this.showLoading()
  console.log(this.sub_Categories);
  console.log(this.mainCategory)
  this.sub_Categories.forEach(item=>{
    const addItem=new FormData();
    
    addItem.append('category_ar',item.category_ar)
    console.log(item.category_ar)
    addItem.append('category_en',item.category_en)
    console.log(item.category_en)
    addItem.append('image',item.photo)
    this.sub_CategoriesForm.push(addItem)

  })
  const addMainItem=new FormData();
  //const obj = {'category_ar':this.mainCategory.category_ar,'category_en':this.mainCategory.category_en,'photo':this.mainCategory.photo,'categories':this.sub_CategoriesForm}
  addMainItem.append('category_ar',this.mainCategory.category_ar)
  addMainItem.append('category_en',this.mainCategory.category_en)
  addMainItem.append('sortnumber',this.mainCategory.sortnumber)
  addMainItem.append('photo',this.mainCategory.photo)
  for(let i=0 ; i<this.sub_Categories.length; i++)
  {
    if (this.sub_Categories[i].id != null) {
      addMainItem.append('categories[' + i + '][id]', this.sub_Categories[i].id)
    }
    addMainItem.append('categories['+i+'][sortnumber]',this.sub_Categories[i].sortnumber)
   // console.log(item.category_ar)
    addMainItem.append('categories['+i+'][category_en]',this.sub_Categories[i].category_en)
    addMainItem.append('categories['+i+'][category_ar]',this.sub_Categories[i].category_ar)
  //  console.log(item.category_en)
    addMainItem.append('categories['+i+'][image]',this.sub_Categories[i].photo)
    

  }
  //addMainItem.append('categories',JSON.stringify( this.sub_CategoriesForm))
 // console.log(JSON.stringify( this.sub_CategoriesForm))
  console.log (addMainItem);
  if(this.state==true)
  {
    this.dataservice.editCategory(addMainItem,this.categoryId).subscribe(res=>{  this.getCategories() 
   
    this.state=false ;
    this.mainCategory={category_ar:'',sortnumber:null, category_en:'', iamgeUrl:'../../../../../assets/images/upload.png' , photo:''}
this.clearDxValidators()
  this.sub_Categories=[]
    this.getCategories()
    this.toaster.showSuccessToast('تم الاضافه بنجاح')

    }, arr => {
      //for (const [key, value] of Object.entries(arr.error.errors)) {
      //  console.log(`${key}: ${value}`);
      //  this.toaster.showErrorToast(`${value}`)
      //}

    this.toaster.showErrorToast('يرجي اضافه صوره للاقسام المضافه حديثا')
    })
}
else{
  this.dataservice.addCategory(addMainItem).subscribe(
    res=>{
  this.mainCategory={category_ar:'',sortnumber:null, category_en:'', iamgeUrl:'../../../../../assets/images/upload.png' , photo:''}
this.clearDxValidators()
  this.sub_Categories=[]
  this.getCategories()
  this.getCategories()
  this.toaster.showSuccessToast('تم الأضافة بنجاح')
  
    },
    arr => {
      for (const [key, value] of Object.entries(arr.error.errors)) {
        console.log(`${key}: ${value}`);
        this.toaster.showErrorToast(`${value}`)
      }
    }
  )
}
this.hideLoading()

}
  deleteItem (i)
  
  {
    
   let id= this.sub_Categories[i].id
    this.sub_Categories.splice(i, 1)
    if (id != null) {
      this.dataservice.deleteSubCategoryById(id).subscribe(
        res => {
          this.toaster.showSuccessToast('تم الحذف بنجاح')
        }
      )
    }

  }
  getCategories ()
  {
    this.showLoading();
this.dataservice.getCategories().subscribe(res=>{
  console.log(res);

  this.categories = res.maincategories.data;
  console.log(res);

},
  err=>{});
  this.hideLoading();






  }
  getCategoryById (id)
  {

    this.state=true;
    this.showLoading()
this.dataservice.getCategoryById(id).subscribe
(res=>{
  console.log(res)
  this.categoryId = res.mainCategory.id
  res.mainCategory.image = 'https://smartvillageapp.com/app/' + res.mainCategory.image 
  this.mainCategory.category_ar = res.mainCategory.category_ar

  this.mainCategory.iamgeUrl = res.mainCategory.image
  this.mainCategory.sortnumber=res.mainCategory.sortnumber
  
  this.mainCategory.category_en =res.mainCategory.category_en
  this.sub_Categories=[]
  res.mainCategory.categories.forEach(item => {
    this.sub_Categories.push({ id: item.id, category_ar: item.category_ar,sortnumber:item.sortnumber  ,category_en: item.category_en, iamgeUrl: 'https://smartvillageapp.com/app/' + item.image, photo: '' })
  });
 
  

})

this.hideLoading();

  }
  showDeletePopup(id){ this.isConfirmDeletePopupVisible = true; this.deletedId = id}
}
