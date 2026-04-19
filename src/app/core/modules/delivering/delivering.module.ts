import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeliveryListComponent } from './delivery-list/delivery-list.component';
import { DeliveringShellComponent } from './delivering-shell/delivering-shell.component';
import { RouterModule, Routes } from '@angular/router';
import { DxSharedModule } from 'src/app/shared/dx-shared/dx-shared.module';
import { DeliveryMainDataFormComponent } from './delivery-main-data-form/delivery-main-data-form.component';
import { DeliveringTabShellComponent } from './delivering-tab-shell/delivering-tab-shell.component';
import { DeliveringAreaComponent } from './delivering-area/delivering-area.component';
import { DeliveringselectTabShellComponent } from './deliveringselect-tab-shell/deliveringselect-tab-shell.component';


const DeliveringRoutes: Routes = [ {
  path: 'delivering',
  component: DeliveringShellComponent
}
];
@NgModule({
  declarations: [DeliveryListComponent, DeliveringShellComponent, DeliveryMainDataFormComponent, DeliveringTabShellComponent, DeliveringAreaComponent, DeliveringselectTabShellComponent],
  imports: [
    CommonModule,
    DxSharedModule,
    RouterModule.forChild(DeliveringRoutes)
  ]
})
export class DeliveringModule { }
