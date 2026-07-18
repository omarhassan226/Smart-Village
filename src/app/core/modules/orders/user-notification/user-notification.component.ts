import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavigationHeaderService } from 'src/app/shared/navigation-header.service';

@Component({
  selector: 'app-user-notification',
  template: `
    <div class="container-fluid mt-3" style="direction: rtl;">
      <app-order-details-list *ngIf="orderId" [orderId]="orderId"></app-order-details-list>
    </div>
  `
})
export class UserNotificationComponent implements OnInit {
  orderId: any;

  constructor(
    private route: ActivatedRoute,
    private navigationHeaderService: NavigationHeaderService
  ) { }

  ngOnInit(): void {
    this.navigationHeaderService.headerObject$.next({
      headericon: '../../../../assets/images/notification.svg',
      headerTitle: 'تفاصيل إشعار الطلب',
    });

    this.route.params.subscribe(params => {
      this.orderId = params['id'];
    });
  }
}
