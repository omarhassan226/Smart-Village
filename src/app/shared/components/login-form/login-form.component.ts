import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { DataService } from '../../services/data-service/data.service';
import { ToasterService } from '../../services/toaster/toaster.service';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler/error-handler.service';
import { LoadingService } from 'src/app/shared/services/loading-service/loading.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent {
  private subs = new SubSink();
username = '';
password='';
grant_type = 'password';
client_id = 2;
client_secret = 'OYlDKzophMU1jbOs4A0sYi3HsYmBQlVpUJivdwBm';
provider = 'admin';
  constructor( 
    private router: Router,
     private dataService: DataService, 
     private cookieService:CookieService,
     private toaster: ToasterService,
     private loading: LoadingService,
     private errorService: ErrorHandlerService
      ) {}

     async onFormSubmit()  {
        let userObj = {
          username:this.username,
          password:this.password,
          grant_type: this.grant_type,
          client_id:this.client_id,
          client_secret:this.client_secret,
          provider:this.provider
          
        }
        this.showLoading();
        this.subs.sink =   this.dataService.login(userObj).subscribe(res => {
          if( res["access_token"]){

            
            let user_token = res["access_token"];

           
           this.cookieService.set('user_token',user_token);

           this.toaster.showSuccessToast('مرحبا' )
           
           this.router.navigate(['/']);

         
         }else{
           this.toaster.showErrorToast('تأكد من معلومات تسجيل الدخول مرة أخري');
         }
         this.hideLoading();
          
        }, err => {
          this.toaster.showErrorToast('تأكد من معلومات تسجيل الدخول مرة أخري');
          this.hideLoading();
          this.handleError(err);
        });
      }
      handleError = (error: any) => this.errorService.handleError(error);
   showLoading = () => this.loading.showLoading();
   hideLoading = () => this.loading.hideLoading();
  }
 
