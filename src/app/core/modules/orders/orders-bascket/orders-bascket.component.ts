import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { DataService } from '../../../../shared/services/data-service/data.service';

@Component({
  selector: 'app-orders-bascket',
  templateUrl: './orders-bascket.component.html',
  styleUrls: ['./orders-bascket.component.css'],
})
export class OrdersBascketComponent implements OnInit {
  @Output() showPopUp: EventEmitter<any> = new EventEmitter<any>();
  @Output() companyShipping: EventEmitter<any> = new EventEmitter<any>();
  @Output() showCompleteOrder: EventEmitter<any> = new EventEmitter<any>();
  @Output() way_Payment: EventEmitter<any> = new EventEmitter<any>();
  @Output() deleteProduct: EventEmitter<any> = new EventEmitter<any>();
  @Output() deleteUser: EventEmitter<any> = new EventEmitter<any>();
  @Output() addressUser: EventEmitter<any> = new EventEmitter<any>();
  @Input() iscustomer = false;
  @Input() products = [];
  @Input() customerInfo;
  @Input() totalprice;
  @Input() addresslist = [];

  @Input() costShipping
  @Input() Shippings: any[];
  @Input() ishidden = false;
  payments: any[];
  companyId = '';
  addressId = '';
  way_Pay: any

  users: any[]

  //   products =  [{
  //     ID: 1,
  //     Name: "HD Video Player",
  //     Price: 330,
  //     Current_Inventory: 225,
  //     Backorder: 0,
  //     Manufacturing: 10,
  //     Category: "Video Players",
  //     ImageSrc: "images/products/1.png"
  // }, {
  //     ID: 3,
  //     Name: "SuperPlasma 50",
  //     Price: 2400,
  //     Current_Inventory: 0,
  //     Backorder: 0,
  //     Manufacturing: 0,
  //     Category: "Televisions",
  //     ImageSrc: "images/products/3.png"
  // },
  // {
  //   ID: 4,
  //   Name: "HD Video Player",
  //   Price: 330,
  //   Current_Inventory: 225,
  //   Backorder: 0,
  //   Manufacturing: 10,
  //   Category: "Video Players",
  //   ImageSrc: "images/products/1.png"
  // }, {
  //   ID: 5,
  //   Name: "SuperPlasma 50",
  //   Price: 2400,
  //   Current_Inventory: 0,
  //   Backorder: 0,
  //   Manufacturing: 0,
  //   Category: "Televisions",
  //   ImageSrc: "images/products/3.png"
  // },{
  //   ID: 1,
  //   Name: "HD Video Player",
  //   Price: 330,
  //   Current_Inventory: 225,
  //   Backorder: 0,
  //   Manufacturing: 10,
  //   Category: "Video Players",
  //   ImageSrc: "images/products/1.png"
  // }, {
  //   ID: 3,
  //   Name: "SuperPlasma 50",
  //   Price: 2400,
  //   Current_Inventory: 0,
  //   Backorder: 0,
  //   Manufacturing: 0,
  //   Category: "Televisions",
  //   ImageSrc: "images/products/3.png"
  // },
  // {
  // ID: 4,
  // Name: "HD Video Player",
  // Price: 330,
  // Current_Inventory: 225,
  // Backorder: 0,
  // Manufacturing: 10,
  // Category: "Video Players",
  // ImageSrc: "images/products/1.png"
  // }, {
  // ID: 5,
  // Name: "SuperPlasma 50",
  // Price: 2400,
  // Current_Inventory: 0,
  // Backorder: 0,
  // Manufacturing: 0,
  // Category: "Televisions",
  // ImageSrc: "images/products/3.png"
  // }];

  constructor(private dataservice: DataService) { }
  resetForm = () => {

    this.companyId = '';
    this.addressId = '';


  }

  ngOnInit(): void {
    this.getPaymet();
    this.getShopping()
    this.getUsers()
  }
  getPaymet() {

    this.dataservice.getPayments().subscribe(
      res => {
        console.log(res)
        this.payments = res.PaymentMethods
      }

    )


  }
  getShopping() {

    this.dataservice.getShippings().subscribe(res => {
      console.log(res)
      this.Shippings = res.shipping.data;

    })
  }
  getUsers() {
    this.dataservice.getUsers().subscribe(res => {
      console.log(res.users.data)
      this.users = res.users.data
    })
  }
}



function input() {
  throw new Error('Function not implemented.');
}
