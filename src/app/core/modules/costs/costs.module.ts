import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CostsShellComponent } from './costs-shell/costs-shell.component';
import { CostsFormComponent } from './costs-form/costs-form.component';
import { CostsListComponent } from './costs-list/costs-list.component';
import { RouterModule, Routes } from '@angular/router';
import { DxSharedModule } from 'src/app/shared/dx-shared/dx-shared.module';

const CostsRoutes: Routes = [ {
  path: 'costs',
  component: CostsShellComponent
}
];

@NgModule({
  declarations: [CostsShellComponent, CostsFormComponent, CostsListComponent],
  imports: [
    CommonModule,
    DxSharedModule,
    RouterModule.forChild(CostsRoutes)
  ]
})
export class CostsModule { }
