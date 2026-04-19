import { Input } from '@angular/core';
import { Component, OnInit, ViewChild, Output , EventEmitter } from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular';
import { DataService } from '../../../../shared/services/data-service/data.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  @ViewChild('gridRef') gridRef: DxDataGridComponent;
  @Output() showPopUp: EventEmitter<any> = new EventEmitter<any>();
  @Input() products: any []
  datasource = [
    { id: 1, name: 'Apple Watch series4 ساعة آبل الاًصدار الرابع', code: 'K345', price: '10$', category: 'أكسسوارات', quantity: 6, image: '' },
    { id: 2, name: 'Apple Watch series4 ساعة آبل الاًصدار الرابع', code: 'K345', price: '4$', category: 'الكترونيات', quantity: 6, image: '' },
    { id: 3, name: 'Apple Watch series4 ساعة آبل الاًصدار الرابع', code: 'K345', price: '9$', category: 'أكسسوارات', quantity: 6, image: '' },
    { id: 4, name: 'Apple Watch series4 ساعة آبل الاًصدار الرابع', code: 'K345', price: '10$', category: 'أكسسوارات', quantity: 6, image: '' },
    { id: 5, name: 'Apple Watch series4 ساعة آبل الاًصدار الرابع', code: 'K345', price: '4$', category: 'الكترونيات', quantity: 6, image: '' },
    { id: 6, name: 'Apple Watch series4 ساعة آبل الاًصدار الرابع', code: 'K345', price: '9$', category: 'أكسسوارات', quantity: 6, image: '' },
    { id: 1, name: 'Apple Watch series4 ساعة آبل الاًصدار الرابع', code: 'K345', price: '10$', category: 'أكسسوارات', quantity: 6, image: '' },
    { id: 2, name: 'Apple Watch series4 ساعة آبل الاًصدار الرابع', code: 'AW##', price: '4$', category: 'الكترونيات', quantity: 6, image: '' },
    { id: 3, name: 'Apple Watch series4 ساعة آبل الاًصدار الرابع', code: 'AW##', price: '9$', category: 'أكسسوارات', quantity: 6, image: '' },
    { id: 4, name: 'Apple Watch series4 ساعة آبل الاًصدار الرابع', code: 'AW##', price: '10$', category: 'الكترونيات', quantity: 6, image: '' },
    { id: 5, name: 'Apple Watch series4 ساعة آبل الاًصدار الرابع', code: 'AW##', price: '4$', category: 'الكترونيات', quantity: 6, image: '' },
    { id: 6, name: 'Apple Watch series4 ساعة آبل الاًصدار الرابع', code: 'AW##', price: '9$', category: 'أكسسوارات', quantity: 6, image: '' }
  ]
  constructor(private dataservice: DataService) { }

  changeText(id) {

    document.getElementById(id).innerText = "مضاف للسله"
    document.getElementById(id).style.backgroundColor = "#27c7bf"
    document.getElementById(id).style.color = "#fff"
  }
  ngOnInit(): void {
  
 
  }
  getProduct()
  {
    this.dataservice.getProducts().subscribe(res => {
      this.products = res.products.data
      console.log(this.products)

      this.products.forEach(item => {
        item.sliders= 'https://smartvillageapp.com/app/' + item.sliders[0].image 
        console.log(item.sliders)
      })
      console.log(this.products)
    })
  }
  onToolbarPreparing(e) {
    e.toolbarOptions.items.push({
      location: 'before',
      text: "قائمة المنتجات"
  })
}

  

}
