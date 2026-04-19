import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerPopupComponent } from './customer-popup/customer-popup.component';
import { CustomerShellComponent } from './customer-shell/customer-shell.component';
import { RouterModule, Routes } from '@angular/router';
import { DxSharedModule } from 'src/app/shared/dx-shared/dx-shared.module';
import { CustomerAddressComponent } from './customer-address/customer-address.component';

const customerRoutes: Routes = [ {
  path: 'customers',
  component: CustomerShellComponent
},
{
  path: 'customers-address',
  component: CustomerAddressComponent
}
];

@NgModule({
  declarations: [CustomerListComponent, CustomerPopupComponent, CustomerShellComponent, CustomerAddressComponent],
  imports: [
    CommonModule,
    DxSharedModule,
    RouterModule.forChild(customerRoutes)
  ]
})
export class CustomersModule { }
