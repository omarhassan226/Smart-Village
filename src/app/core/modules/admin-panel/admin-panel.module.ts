import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AdminPanelShellComponent } from './admin-panel-shell/admin-panel-shell.component';
import { DxSharedModule } from 'src/app/shared/dx-shared/dx-shared.module';

const AdminRoutes: Routes = [
  {
    path: 'admin',
    component: AdminPanelShellComponent,
  },
];

@NgModule({
  declarations: [AdminPanelShellComponent],
  imports: [CommonModule, RouterModule.forChild(AdminRoutes), DxSharedModule],
})
export class AdminPanelModule {}
