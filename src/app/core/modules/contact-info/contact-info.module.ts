import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactInfoShellComponent } from './contact-info-shell/contact-info-shell.component';
import { RouterModule, Routes } from '@angular/router';
import { DxSharedModule } from 'src/app/shared/dx-shared/dx-shared.module';

const ContactInfoRoutes: Routes = [
  {
    path: 'contact-info',
    component: ContactInfoShellComponent,
  }
];

@NgModule({
  declarations: [
    ContactInfoShellComponent
  ],
  imports: [
    CommonModule,
    DxSharedModule,
    RouterModule.forChild(ContactInfoRoutes)
  ]
})
export class ContactInfoModule { }
