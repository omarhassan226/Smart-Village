import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SellerShellComponent } from './seller-shell/seller-shell.component';
import { DxSharedModule } from 'src/app/shared/dx-shared/dx-shared.module';

const sellerRoutes: Routes = [{
  path: 'seller',
  component:SellerShellComponent
}
]

@NgModule({
  declarations: [SellerShellComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(sellerRoutes), DxSharedModule

  ]
})
export class SellerModule { }
