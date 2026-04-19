import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerShellComponent } from './banner-shell/banner-shell.component';
import { Routes, RouterModule } from '@angular/router';
import { DxSharedModule } from 'src/app/shared/dx-shared/dx-shared.module';


const BannersRoutes:Routes = [{
  path:'banners',
  component: BannerShellComponent
}]
@NgModule({
  declarations: [BannerShellComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(BannersRoutes),
    DxSharedModule
  ]
})
export class BannersModule { }
