import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { DxPopupComponent } from 'devextreme-angular';

@Component({
  selector: 'app-delete-pop-up',
  templateUrl: './delete-pop-up.component.html',
  styleUrls: ['./delete-pop-up.component.css']
})
export class DeletePopUpComponent implements AfterViewInit {
 @Input() isDeletePopupVisible;
  @Output() whenPopupConfirm: EventEmitter<any> = new EventEmitter<any>();
  @Output() whenPopupHide: EventEmitter<any> = new EventEmitter<any>();
  @Output() OnHiding: EventEmitter<any> = new EventEmitter<any>();
  ngAfterViewInit() {
  
  }
}

