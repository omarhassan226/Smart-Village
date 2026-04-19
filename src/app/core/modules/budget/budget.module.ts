import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BudgetShellComponent } from './budget-shell/budget-shell.component';
import { DxSharedModule } from 'src/app/shared/dx-shared/dx-shared.module';


const budgetRoutes: Routes = [
  {
    path: 'budget',
    component: BudgetShellComponent,
  },
 
];
@NgModule({
  declarations: [BudgetShellComponent],
  imports: [CommonModule, RouterModule.forChild(budgetRoutes), DxSharedModule],
})
export class BudgetModule { }
