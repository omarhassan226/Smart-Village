import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BillsShellComponent } from './bills-shell/bills-shell.component';
import { RouterModule, Routes } from '@angular/router';
import { DxSharedModule } from 'src/app/shared/dx-shared/dx-shared.module';
import { ShowBillsComponent } from './show-bills/show-bills.component';
import { ReturnBillComponent } from './return-bill/return-bill.component';
import { ShowReturnBillsComponent } from './show-return-bills/show-return-bills.component';
import { ShowDamageBillsComponent } from './show-damage-bills/show-damage-bills.component';
import { PayBillsComponent } from './pay-bills/pay-bills.component';

const billsRoutes: Routes = [
  {
    path: 'bills',
    component: BillsShellComponent,
    
  },
  {
    path: 'SalesBills',
    component: ShowBillsComponent,
    
  },
  {
    path: 'ReturnBills',
    component: ShowReturnBillsComponent,
    
  },
  
  {
    path: 'DamageBills',
    component: ShowDamageBillsComponent,
    
  },
  {
    path: 'PayBills',
    component: PayBillsComponent,
    
  },
 
 
];

@NgModule({
  declarations: [BillsShellComponent, ShowBillsComponent, ReturnBillComponent, ShowReturnBillsComponent, ShowDamageBillsComponent, PayBillsComponent],
  imports: [CommonModule, RouterModule.forChild(billsRoutes), DxSharedModule],
})
export class BillsModule { }
