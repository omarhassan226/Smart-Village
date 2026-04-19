import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShellNotificationComponent } from './shell-notification/shell-notification.component';
import { RouterModule, Routes } from '@angular/router';
import { DxSharedModule } from '../../../shared/dx-shared/dx-shared.module';

const  NotificationRoutes: Routes = [{
  path: "Notification",
  component: ShellNotificationComponent

}]

@NgModule({
  declarations: [ShellNotificationComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(NotificationRoutes), DxSharedModule
  ]
})
export class NotificationModule { }
