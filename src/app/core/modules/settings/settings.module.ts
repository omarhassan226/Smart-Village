import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingShellComponent } from './setting-shell/setting-shell.component';
import { SettingPopComponent } from './setting-pop/setting-pop.component';
import { Routes, RouterModule } from '@angular/router';
import { DxSharedModule } from 'src/app/shared/dx-shared/dx-shared.module';
import { DeletePopUpComponent } from 'src/app/shared/components/delete-pop-up/delete-pop-up.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

const SettingsRoutes: Routes = [ {
  path: "settings",
  component: SettingShellComponent
  
}]
@NgModule({
  declarations: [SettingShellComponent, SettingPopComponent],
  imports: [
    CommonModule,
    DxSharedModule,
    CKEditorModule,
    AngularEditorModule
    ,
   
    RouterModule.forChild(SettingsRoutes)
  ]
})
export class SettingsModule { }
