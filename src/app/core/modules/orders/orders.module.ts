import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersShellComponent } from './orders-shell/orders-shell.component';
import { RouterModule, Routes } from '@angular/router';
import { OrderListComponent } from './order-list/order-list.component';
import { DxSharedModule } from 'src/app/shared/dx-shared/dx-shared.module';
import { OrdersBascketComponent } from './orders-bascket/orders-bascket.component';
import { OrdersPopupComponent } from './orders-popup/orders-popup.component';
import { FollowOrderListComponent } from './follow-order-list/follow-order-list.component';
import { OrderDetailsListComponent } from './order-details-list/order-details-list.component';
import { ReviewOrderListComponent } from './review-order-list/review-order-list.component';
import { OrderDetailsListReviewComponent } from './order-details-list copy/order-details-list-review.component';
import { ReturnOrdersComponent } from './return-orders/return-orders.component';
import { UserNotificationComponent } from './user-notification/user-notification.component';

const OrdersRoutes: Routes = [
  {
    path: 'orders',
    component: OrdersShellComponent,
  },
  {
    path: 'orders-status',
    component: FollowOrderListComponent,
  },
  {
    path: 'orders-review',
    component: ReviewOrderListComponent,
  },
  {
    path: 'return-orders',
    component: ReturnOrdersComponent,
  },
  {
    path: 'userNotification/:id',
    component: UserNotificationComponent,
  },
];

@NgModule({
  declarations: [
    OrdersShellComponent,
    OrderListComponent,
    OrdersBascketComponent,
    OrdersPopupComponent,
    FollowOrderListComponent,
    OrderDetailsListComponent,
    ReviewOrderListComponent,
    OrderDetailsListReviewComponent,
    ReturnOrdersComponent,
    UserNotificationComponent,
  ],
  imports: [CommonModule, RouterModule.forChild(OrdersRoutes), DxSharedModule],
})
export class OrdersModule {}
