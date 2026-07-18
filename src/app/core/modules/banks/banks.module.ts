import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BanksShellComponent } from './banks-shell/banks-shell.component';
import { RouterModule, Routes } from '@angular/router';
import { DxSharedModule } from 'src/app/shared/dx-shared/dx-shared.module';

const BanksRoutes: Routes = [
  {
    path: 'banks',
    component: BanksShellComponent,
  }
];

@NgModule({
  declarations: [
    BanksShellComponent
  ],
  imports: [
    CommonModule,
    DxSharedModule,
    RouterModule.forChild(BanksRoutes)
  ]
})
export class BanksModule { }
