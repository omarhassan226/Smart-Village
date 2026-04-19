import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DxSharedModule } from 'src/app/shared/dx-shared/dx-shared.module';
import { SupplierShellComponent } from './supplier-shell/supplier-shell.component';


const SupplierRoutes: Routes = [
  {
    path: 'supplier',
    component: SupplierShellComponent,
  },
 
];
@NgModule({
  declarations: [SupplierShellComponent],
  imports: [CommonModule, RouterModule.forChild(SupplierRoutes), DxSharedModule],
})
export class SupplierModule { }
