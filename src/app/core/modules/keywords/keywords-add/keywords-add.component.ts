import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { DxValidatorComponent } from 'devextreme-angular';
import { NavigationHeaderService } from 'src/app/shared/navigation-header.service';
import { DataService } from 'src/app/shared/services/data-service/data.service';
import { ToasterService } from 'src/app/shared/services/toaster/toaster.service';

@Component({
  selector: 'app-keywords-add',
  templateUrl: './keywords-add.component.html',
  styleUrls: ['./keywords-add.component.css']
})
export class KeywordsAddComponent implements OnInit {
  @ViewChildren(DxValidatorComponent) validatorViewChildren: QueryList<DxValidatorComponent>;
 
  name_ar="";
  name_en="";
  categoryList:any[]=[]
  minCategoryList:any[]=[];
 
 
  constructor(
    private dataservice:DataService,
    private toaster:ToasterService,
    private navigationHeaderService :NavigationHeaderService
  ) { }

  ngOnInit(): void {
    this.navigationHeaderService.headerObject$.next({
      headericon: 'assets/images/keywords.svg',
      headerTitle: 'الكامات الدالة',
    });
    this.GetAllSubCategories();
  }
  addSupplier ()
  {
    if (!this.name_ar || !this.name_en|| !this.categoryList) {

      return
    }
    else
    {
    const addSupplier ={keyword_ar :this.name_ar, keyword_en: this.name_en, categories: this.categoryList}
    this.dataservice.addkeywords(addSupplier).subscribe(rea=>{
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
  clearDxValidators = () => {
    this.validatorViewChildren.toArray().map(ref => {
      ref.instance.reset();
    })
  }
  resetForm()
  {
this.name_ar='',
this.name_en ='' ;


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

 
  

}
