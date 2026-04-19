import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LoadingService } from '../../services/loading-service/loading.service';

@Component({
  selector: 'app-loading',
  template: `
    <dx-load-panel
      shadingColor="rgba(0,0,0,0.4)"
      [visible]="isLoading$ | async"
      [message]="'تحميل'"
      [showIndicator]="true"
      [showPane]="true"
      [shading]="true"
      [closeOnOutsideClick]="false"
    ></dx-load-panel>
  `,
})
export class LoadingComponent implements OnInit {
  isLoading$: Observable<boolean> = this.loadingHandlerService.isLoading$;
  constructor(private loadingHandlerService: LoadingService) {}
  ngOnInit() {
    this.isLoading$ = this.loadingHandlerService.isLoading$;
  }
}
