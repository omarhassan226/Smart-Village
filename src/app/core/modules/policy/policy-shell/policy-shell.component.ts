import { Component, OnInit } from '@angular/core';
import { NavigationHeaderService } from 'src/app/shared/navigation-header.service';
import { DataService } from 'src/app/shared/services/data-service/data.service';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler/error-handler.service';
import { LoadingService } from 'src/app/shared/services/loading-service/loading.service';
import { ToasterService } from 'src/app/shared/services/toaster/toaster.service';

@Component({
  selector: 'app-policy-shell',
  templateUrl: './policy-shell.component.html',
  styleUrls: ['./policy-shell.component.css']
})
export class PolicyShellComponent implements OnInit {
  Secure_policy=''
  Privacy_policy=''
  Sales_policy=''
  constructor(public dataService: DataService,
    private navigationHeaderService: NavigationHeaderService,
     private loading: LoadingService,private errorService: ErrorHandlerService,
     private toaster: ToasterService) { }
  ngOnInit(): void {
    this.navigationHeaderService.headerObject$.next({
      headericon: '../../../../assets/images/padlock.svg',
      headerTitle: 'السياسات',
    });
    this.getSocila()
  }

  getSocila = (): void => {
  
     this.dataService.getSocial().subscribe(res => {
       debugger
      console.log(res)
     this.Privacy_policy= res['socail'].Privacy_policy;
    
      this.Sales_policy =  res['socail'].Sales_policy;
      this.Secure_policy = res['socail'].Secure_policy;
     

      
    }, err => {
         });
  }
  saveArea()
  {
this.saveSecure_policy();
this.saveSales_policy();
this.saveSPrivacy_policy();

this.toaster.showSuccessToast("تم الحفظ بنجاح")



  }

  saveSecure_policy() {
    let socialObj = {

      Secure_policy: this.Secure_policy
      
    }

    this.dataService.updateShipping(socialObj).subscribe(res => {
      
        this.getSocila();
      
    }, err => {
      
    });}
    saveSPrivacy_policy() {
      debugger
      let socialObj = {
  
        Privacy_policy: this.Privacy_policy
        
      }
  
      this.dataService.updateShipping(socialObj).subscribe(res => {
        
          this.getSocila();
        
      }, err => {
        
      });}
      saveSales_policy() {
        let socialObj = {
    
          Sales_policy: this.Sales_policy
          
        }
  
        this.dataService.updateShipping(socialObj).subscribe(res => {
          
            this.getSocila();
          
        }, err => {
          
        });}
 
}
