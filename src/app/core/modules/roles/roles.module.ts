import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RolesShellComponent } from './roles-shell/roles-shell.component';
import { RouterModule, Routes } from '@angular/router';
import { DxSharedModule } from '../../../shared/dx-shared/dx-shared.module';


const rolesRoutes: Routes = [{
  path: 'roles',
  component:RolesShellComponent
}
]
@NgModule({
  declarations: [RolesShellComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(rolesRoutes), DxSharedModule

  ]
})
export class RolesModule { }
