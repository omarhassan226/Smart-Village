import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsShellComponent } from './reports-shell/reports-shell.component';
import { Routes, RouterModule } from '@angular/router';
import { DxSharedModule } from 'src/app/shared/dx-shared/dx-shared.module';
import { ReportsMainComponent } from './reports-main/reports-main.component';
import { DxPieChartModule } from 'devextreme-angular';
// For MDB Angular Free

const ReportsRoutes: Routes = [
  {
    path: 'reports',
    component: ReportsShellComponent,
  },
  {
    path: 'reports-main',
    component: ReportsMainComponent,
  },
  
];

@NgModule({
  declarations: [ReportsShellComponent, ReportsMainComponent],
  imports: [CommonModule, DxPieChartModule, RouterModule.forChild(ReportsRoutes), DxSharedModule],
})
export class ReportsModule {}
