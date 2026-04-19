import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular';

@Component({
  selector: 'app-delivery-list',
  templateUrl: './delivery-list.component.html',
  styleUrls: ['./delivery-list.component.css']
})
export class DeliveryListComponent implements OnInit {
  @ViewChild(DxDataGridComponent) gridRef: DxDataGridComponent;
  @Output() OpenItem: EventEmitter<number> = new EventEmitter<number>();
  @Output() showDeletePopUp: EventEmitter<any> = new EventEmitter<any>();
  @Output() getMainDataById: EventEmitter<any> = new EventEmitter<any>();
  @Input() shippingList;
  constructor() { }

  ngOnInit(): void {
  }



}
