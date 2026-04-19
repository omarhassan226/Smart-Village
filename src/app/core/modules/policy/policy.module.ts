import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PolicyShellComponent } from './policy-shell/policy-shell.component';
import { RouterModule, Routes } from '@angular/router';
import { DxSharedModule } from 'src/app/shared/dx-shared/dx-shared.module';
import { AngularEditorModule } from '@kolkov/angular-editor';

const OrdersRoutes: Routes = [
  {
    path: 'policy',
    component: PolicyShellComponent,
  }]

@NgModule({
  

  declarations: [PolicyShellComponent],
  imports: [
    CommonModule,AngularEditorModule, RouterModule.forChild(OrdersRoutes), DxSharedModule
  ]
})
export class PolicyModule { }
