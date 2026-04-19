import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DataService } from '../../../../shared/services/data-service/data.service';
import { ToasterService } from '../../../../shared/services/toaster/toaster.service';

@Component({
  selector: 'app-orders-popup',
  templateUrl: './orders-popup.component.html',
  styleUrls: ['./orders-popup.component.css']
})
export class OrdersPopupComponent implements OnInit {
  deleteMessage = ''
  quantity=1
  @Input() popupTitle: string;
  @Input() showform: any
  @Input() isOrdersPopupVisible: boolean;
  @Input() productSelected: any;
  @Input() slider :any
  @Input() colors :any
  @Input() sizes: any
  @Input() users: any;
  @Output() OnHiding: EventEmitter<any> = new EventEmitter<any>();
  @Output() addProduct: EventEmitter<any> = new EventEmitter<any>();
  @Output() addCustomer: EventEmitter<any> = new EventEmitter<any>();
  @Output() cancelOrder: EventEmitter<any> = new EventEmitter<any>();
 sizeId:any
 colorId:any
 imagId: any
  addProductToCard
    () {
    this.addProduct.emit({ sizeId: this.sizeId, imagId: this.imagId, colorId: this.colorId, id: this.productSelected.id, quantity: this.quantity })
    this.imagId = null;
    this.quantity = 1;
    this.colorId = null
    this.sizeId=null

  }
  
  CancelOrderForAdmin() {
    this.cancelOrder.emit(this.deleteMessage)

    this.deleteMessage = '';
  }
  onhidden(
  ) {
    this.OnHiding.emit()
    this.imagId = null;
    this.quantity = 1;
    this.colorId = null
    this.sizeId = null
    this.deleteMessage=''
  }
  products = [
    {
    ID: 1,
    Name: "أحمد عصام محمد ",
    phone: '053566354'
}, {
    ID: 2,
    Name: "محمد محمود أحمد",
    phone: '053566354'
},
{
  ID: 3,
  Name: "أحمد عصام محمد ",
  phone: '053566354'
}, {
  ID: 4,
  Name: "محمد محمود أحمد",
  phone: '053566354'
},
{
  ID: 1,
  Name: "أحمد عصام محمد ",
  phone: '053566354'
}, {
  ID: 2,
  Name: "محمد محمود أحمد",
  phone: '053566354'
},
{
ID: 3,
Name: "أحمد عصام محمد ",
phone: '053566354'
}, {
ID: 4,
Name: "محمد محمود أحمد",
phone: '053566354'
},
{
  ID: 4,
  Name: "محمد محمود أحمد",
  phone: '053566354'
  },

  {
ID: 4,
Name: "محمد محمود أحمد",
phone: '053566354'
},

{
  ID: 4,
  Name: "محمد محمود أحمد",
  phone: '053566354'
  },
  
  {
    ID: 4,
    Name: "محمد محمود أحمد",
    phone: '053566354'
    },
    
    {
      ID: 4,
      Name: "محمد محمود أحمد",
      phone: '053566354'
      },
      
      {
        ID: 4,
        Name: "محمد محمود أحمد",
        phone: '053566354'
        },
        
        {
ID: 4,
Name: "محمد محمود أحمد",
phone: '053566354'
},

{
  ID: 4,
  Name: "محمد محمود أحمد",
  phone: '053566354'
  },
  
  {
    ID: 4,
    Name: "محمد محمود أحمد",
    phone: '053566354'
    },
    
    {
      ID: 4,
      Name: "محمد محمود أحمد",
      phone: '053566354'
      },
      
      {
        ID: 4,
        Name: "محمد محمود أحمد",
        phone: '053566354'
        },
        
        {
ID: 4,
Name: "محمد محمود أحمد",
phone: '053566354'
},

{
ID: 4,
Name: "محمد محمود أحمد",
phone: '053566354'
},

{
ID: 4,
Name: "محمد محمود أحمد",
phone: '053566354'
},

]

  constructor(private dataservice: DataService, private toaster: ToasterService) {

   

  }

  ngOnInit(): void {
  }
  add() {
    if (this.quantity < this.productSelected.stock)
    this.quantity = this.quantity + 1;
  }
  delete() {
    if (this.quantity > 1) {
      this.quantity = this.quantity - 1;
    }
  }
  updateProduct()
  {
  }
  selectImage(id) {

    this.imagId = id
    this.slider.forEach(item => {
      if (item.randam_key == id) {
        item.updated_at=true
      }
      else {
        item.updated_at = false
      }

    })
    console.log(this.imagId)
  }
}
