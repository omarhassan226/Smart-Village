import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeShellComponent } from './home-shell/home-shell.component';
import { RouterModule, Routes } from '@angular/router';
import { DxSharedModule } from 'src/app/shared/dx-shared/dx-shared.module';

const HomeRoutes : Routes = [
  {
    path:'',
    component: HomeShellComponent
  }
  
]

@NgModule({
  declarations: [HomeShellComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(HomeRoutes),
    DxSharedModule
  ]
})
export class HomeModule { }
