import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DxSharedModule } from './shared/dx-shared/dx-shared.module';
import { SideNavComponent } from './shared/components/side-nav/side-nav.component';
import { UserPanelComponent } from './shared/components/user-panel/user-panel.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { LoadingComponent } from './shared/components/loading/loading.component';
import { LoginFormComponent } from './shared/components/login-form/login-form.component';
import { HttpClientModule } from '@angular/common/http';
import { SupplierShellComponent } from './core/modules/Supplier/supplier-shell/supplier-shell.component';
import { BudgetShellComponent } from './core/modules/budget/budget-shell/budget-shell.component';

import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { KeywordsListComponent } from './core/modules/keywords/keywords-list/keywords-list.component';
import { OfferSettingComponent } from './core/modules/offerImage/offer-setting.component';


@NgModule({
  declarations: [
    AppComponent,
    SideNavComponent,
    UserPanelComponent,
    HeaderComponent,
    LoadingComponent,
    LoginFormComponent,
    OfferSettingComponent,
    
  
   

  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CKEditorModule,
    DxSharedModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
