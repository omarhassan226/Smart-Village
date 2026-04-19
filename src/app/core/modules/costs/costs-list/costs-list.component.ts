import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular';

@Component({
  selector: 'app-costs-list',
  templateUrl: './costs-list.component.html',
  styleUrls: ['./costs-list.component.css']
})
export class CostsListComponent implements OnInit {
  @Output() showDeletePopUp: EventEmitter<any> = new EventEmitter<any>();
  @Output() editCost: EventEmitter<any> = new EventEmitter<any>();
  @Output() filter: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('gridRef') gridRef: DxDataGridComponent;
  @Input() Costs;
  start_date ;
  end_date ;

  selectedItem ="كل الأنواع"
  costsType = [
    "فاتورة كهرباء","فاتورة عمالة","فاتورة شحن"
   ]
   type = "";
  constructor() { };
  costFilter = () => {
  let  start_date  =  this.formatDate(this.start_date) == 'NaN-NaN-NaN'?  '': this.formatDate(this.start_date);
  let  end_date =  this.formatDate(this.end_date) =='NaN-NaN-NaN'? '':this.formatDate(this.end_date);
  let selectedItem = this.selectedItem || '';
  let query =`type=${selectedItem}&start_date=${start_date}&end_date=${end_date}`
  this.filter.emit(query);
  };
  formatDate = (date) => {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}
  ngOnInit(): void {
  }
  getSelectedDropdown = (e) => {
    this.selectedItem = e;
    this.costFilter();
  };

}
