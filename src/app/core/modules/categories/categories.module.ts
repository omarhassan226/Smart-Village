import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesShellComponent } from './categories-shell/categories-shell.component';
import { Routes, RouterModule } from '@angular/router';
import { DxSharedModule } from 'src/app/shared/dx-shared/dx-shared.module';

const CategoriesRoutes: Routes = [
  {
  
    path: "categories",
    component: CategoriesShellComponent

  }
];

@NgModule({
  declarations: [CategoriesShellComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(CategoriesRoutes),
    DxSharedModule
  ]
})
export class CategoriesModule { }
