import { Component, OnInit } from '@angular/core';
import { NavigationHeaderService } from 'src/app/shared/navigation-header.service';
import { DataService } from 'src/app/shared/services/data-service/data.service';
import { ToasterService } from 'src/app/shared/services/toaster/toaster.service';

@Component({
  selector: 'app-offer-setting',
  templateUrl: './offer-setting.component.html',
  styleUrls: ['./offer-setting.component.css']
})
export class OfferSettingComponent implements OnInit {
 obj=  {category_ar:'',status:null, category_en:'', iamgeUrl:'../../../../../assets/images/upload.png' , photo:''}
 status=[{id:1,name:"مفعل"},{id:2,name:" غير مفعل" }]
 
 constructor(private  dataService: DataService ,private toaster:ToasterService,private navigationHeaderService: NavigationHeaderService,) { }

  ngOnInit(): void {
    this.navigationHeaderService.headerObject$.next({
      headericon: 'home-icon',
      headerTitle: 'اعدادت العرض',
    });
    this. GetOfferSetting()
  
  }
  GetOfferSetting()
  {
this.dataService.GetOffer().subscribe(res=> {console.log(res)

this.obj.iamgeUrl='https://smartvillageapp.com/app/'+res.ImageOffer.image ;
this.obj.status=res.ImageOffer.status ;
this.obj.category_ar=res.ImageOffer.title_ar ;
this.obj.category_en=res.ImageOffer.title_en;

})

  }
  uploadFile (event)
  {

    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) =>  this.obj.iamgeUrl = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
    this.obj.photo =event.target.files[0]
      
    }
  }
  save()
  {
    if (!this.obj.category_ar || !this.obj.category_en || !this.obj.status ) { return }
    else {
      const addOffer = new FormData();
      addOffer.append('title_ar', this.obj.category_ar )
      addOffer.append('title_en', this.obj.category_en)
      addOffer.append('status', this.obj.status )
      addOffer.append('file',this.obj.photo)

      //let body = { title: this.quality, Body: this.description }
      this.dataService.SetOffer(addOffer).subscribe
        (res => {
        

           this.GetOfferSetting();
          this.toaster.showSuccessToast('تم التغديل بنجاح')
        },arr=>{
          this.toaster.showErrorToast('يرجي اضافه صوره  ')
        })

    }

  }
  


}
