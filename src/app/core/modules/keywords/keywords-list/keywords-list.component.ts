import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { DxValidatorComponent } from 'devextreme-angular';
import { NavigationHeaderService } from 'src/app/shared/navigation-header.service';
import { DataService } from 'src/app/shared/services/data-service/data.service';
import { ToasterService } from 'src/app/shared/services/toaster/toaster.service';

@Component({
  selector: 'app-keywords-list',
  templateUrl: './keywords-list.component.html',
  styleUrls: ['./keywords-list.component.css']
})
export class KeywordsListComponent implements OnInit {
  
  @ViewChildren(DxValidatorComponent) validatorViewChildren: QueryList<DxValidatorComponent>;
  popTitle='تعديل';
  name_ar="";
  name_en="";
  categoryList:any[]=[]
  minCategoryList:any[]=[];
  keyWords:any[]
  isConfirmDeletePopupVisible=false;
  isAdminPopupVisibleEdit=false;
  deletedId:number;
  keyWordEdit:number
  constructor(
    private toaster :ToasterService,
    private navigationHeaderService: NavigationHeaderService,
    private dataservice: DataService,
  ) { }

  ngOnInit(): void {
    this.navigationHeaderService.headerObject$.next({
      headericon: 'assets/images/keywords.svg',
      headerTitle: 'الكامات الدالة',
    });
   this. getKeyWords();
   this.GetAllSubCategories();
  }
  clearDxValidators = () => {
    this.validatorViewChildren.toArray().map(ref => {
      ref.instance.reset();
    })
  }
  addSupplier ()
  {
    if (!this.name_ar || !this.name_en|| !this.categoryList) {    return
    }
    else
    {
    const addSupplier ={keyword_ar :this.name_ar, keyword_en: this.name_en, categories: this.categoryList}
    this.dataservice.addkeywords(addSupplier).subscribe(rea=>{
   
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
  getKeyWords ()
  {
  this.dataservice.GetAllkeywords().subscribe(
    res=>
    {

      console.log(res)
     this.keyWords=res.keywords; 
 

    }



  )

  }
  showDeletePopup(id)
  {
  this.isConfirmDeletePopupVisible=true;
  this.deletedId = id
  }
  whenDeletePopupConfirm = (e) => {
    if (e) {
      this.dataservice.DeleteKeywords(this.deletedId).subscribe(
        res=>{
          console.log(res)
          this.hideDeletePopup();

          this.getKeyWords()
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
  hideDeletePopup()
  {
    this.isConfirmDeletePopupVisible=false


  }
  hidePopUp()
  {
    this.isAdminPopupVisibleEdit=false;
  }
  showEditPopup (id)
  {
    this.keyWordEdit =id;
    this.dataservice.ShowSingleCategory(id).subscribe(
      res=>{
        this.categoryList=[];
        res.keyword.categories.forEach(element => {
          this.categoryList.push(element.id);

          
        });
        this.name_ar=  res.keyword.keyword_ar
        this.name_en=  res.keyword.keyword_en
      
        console.log(res)}
    )
    this.isAdminPopupVisibleEdit=true;
  }
  GetAllSubCategories()
  {
    this.dataservice.GetAllSubcategories().subscribe(
      res=>{
        this.minCategoryList=res.categories;

        console.log (res);
      }
    )
  }
  editKeyword()
  
  {
    let keywordEdit={keyword_ar:this.name_ar, keyword_en:this.name_en ,categories:this.categoryList}
    this.dataservice.Updatekeywords(keywordEdit
      ,this.keyWordEdit).subscribe(
        res=>{
          console.log(res)
          this.hidePopUp();

          this.getKeyWords()
          this.toaster.showSuccessToast('تم التعديل بنجاح')
        }
        ,
        arr=>
        {for (const [key, value] of Object.entries(arr.error.errors)) {
          console.log(`${key}: ${value}`);
          this.toaster.showErrorToast(`${value}`)
        }}
      


      )
  }

  

}
