import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { DxDrawerComponent, DxScrollViewComponent } from 'devextreme-angular';
import { ProjectRoutes } from '../../routes/naviagation';
import { ScreenService } from '../../services/screen.service';
import { ToasterService } from '../../services/toaster/toaster.service';
import { NavigationService } from '../../services/navigation.service';
import { DataService } from '../../services/data-service/data.service';

import { CookieService } from 'ngx-cookie-service';
import { ConstantPool } from '@angular/compiler';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css'],
})
export class SideNavComponent implements OnInit {

  @ViewChild(DxDrawerComponent, { static: false }) drawer: DxDrawerComponent;
  @ViewChild(DxScrollViewComponent, { static: true })
  scrollView: DxScrollViewComponent;
  selectedRoute = '';

  menuOpened: boolean;
  temporaryMenuOpened = false;

  @Input()
  title: string;
  ProjectRoutes2: any[] = [{
    id: '1',
    text: 'الرئيسية',
    icon: 'home-icon',
    route: 'home'
  },

  {
    id: '14',
    text: 'السياسات',
    icon: '../../../../assets/images/padlock.svg',
    route: 'policy'
  },
  {
    id: '15',
    text: 'الموردين ',
    icon: '../../../../assets/images/supplier.svg',
    route: 'supplier'
  },

  {

    id: '19',
    text: 'البائعين',
    icon: '../../../../assets/images/supplier.svg',
    route: 'seller'
  },
  {
    id: '20',
    text: 'الكلمات الدالة',
    icon: 'assets/images/keywords.svg',
    items: [

      {
        id: '8_9',
        text: 'كل الكلمات ',
        route: 'Keywords',
      },
      {
        id: '9_8',
        text: ' اضافة كلمات ',
        route: 'Keywords-add',
      },

    ],
  },
  {
    id: '21',
    text: 'اعدادت العرض',
    icon: 'home-icon',
    route: 'OfferSetting'
  },
  {
    id: '22',
    text: 'البنوك',
    icon: 'fas fa-university',
    route: 'banks'
  }

  ]


  navigation = this.ProjectRoutes2;
  text: string;
  selectedOpenMode: string = 'shrink';
  selectedPosition: string = 'left';
  selectedRevealMode: string = 'slide';
  isDrawerOpen: Boolean = true;
  elementAttr: any;

  toolbarContent = [
    {
      widget: 'dxButton',
      location: 'after',
      options: {
        icon: 'menu',
        onClick: () => (this.menuOpened = !this.menuOpened),
      },
    },
  ];

  async ngOnInit() {
    await this.dataservice.authAdmins().subscribe(
      res => {

        localStorage.setItem('roles', JSON.stringify(res.admin.roles));


        console.log(res.admin.roles.permissions);
        res.admin.roles.forEach(element => {


          element.permissions.forEach(item => {
            if (item.name == 'user') {

              this.ProjectRoutes2.push({
                id: '4',
                text: 'العملاء',
                icon: 'customers-icon',
                route: 'customers',

                items: [
                  {
                    id: '7_7',
                    text: ' كل العملاء ',
                    route: 'customers',
                  },
                  {
                    id: '8_8',
                    text: ' عناوبن العملاء',
                    route: 'customers-address',
                  },

                ],
              })

            }

            if (item.name == 'order') {

              this.ProjectRoutes2.push({
                id: '5',
                text: 'الطلبات',
                icon: 'far fa-shopping-cart',
                items: [
                  {
                    id: '2_1',
                    text: 'طلبات العميل',
                    route: 'orders',
                  },
                  {
                    id: '2_2',
                    text: 'كل الطلبات',
                    route: 'orders-status',
                  },
                  {
                    id: '6_6',
                    text: ' الطلبات المرتجعه',
                    route: 'orders-review',
                  },
                  {
                    id: '6_7',
                    text: 'منتجات تم ارجاعها',
                    route: 'return-orders',
                  },
                ],
              })

            }
            if (item.name == 'setting') {

              this.ProjectRoutes2.push({
                id: '9',
                text: 'الإعدادت',
                icon: 'settings-icon',
                route: 'settings',
              })

            }
            if (item.name == 'report') {

              this.ProjectRoutes2.push({
                id: '7',
                text: 'التقارير',
                icon: 'reports-icon',
                items: [
                  {
                    id: '3_9',
                    text: 'التقارير الرئسيه',
                    route: 'reports-main',
                  },
                  {
                    id: '4_9',
                    text: 'التقارير ',
                    route: 'reports',
                  },

                ]
              })

            }
            if (item.name == 'delivery') {

              this.ProjectRoutes2.push({
                id: '6',
                text: 'التوصيل',
                icon: 'delivery-icon',
                route: 'delivering',
              })

            }
            if (item.name == 'category') {

              this.ProjectRoutes2.push({
                id: '3',
                text: 'التصنيفات',
                icon: 'categories',
                route: 'categories',
              })

            }

            if (item.name == 'baner') {

              this.ProjectRoutes2.push({
                id: '11',
                text: 'البنرات',
                icon: 'image',
                route: 'banners',
              })

            }

            if (item.name == 'cost') {

              this.ProjectRoutes2.push({
                id: '8',
                text: 'التكاليف',
                icon: 'costs',
                route: 'costs',
              })

            }

            if (item.name == 'role') {

              this.ProjectRoutes2.push({
                id: '12',
                text: 'الصلاحيات',
                icon: 'key',
                route: 'roles',
              })

            }

            if (item.name == 'product') {

              this.ProjectRoutes2.push({
                id: '2',
                text: 'المنتجات',
                icon: 'products-icon',
                route: 'products',
              })

            }

            if (item.name == 'admin') {

              this.ProjectRoutes2.push({
                id: '10',
                text: 'المشرفين',
                icon: 'user',
                route: 'admin',
              })

            }
            if (item.name == 'bill') {

              this.ProjectRoutes2.push(
                {
                  id: '16',
                  text: 'الفواتير',
                  icon: '../../../../assets/images/receipt.svg',
                  items: [
                    {
                      id: '3_2',
                      text: 'اضافه فاتوره',
                      route: 'bills',
                    },
                    {
                      id: '3_3',
                      text: ' فواتير الشراء',
                      route: 'SalesBills',
                    },
                    // {
                    //   id: '4_4',
                    //   text: ' فواتير المرتجع',
                    //   route: 'ReturnBills',
                    // },
                    {
                      id: '5_5',
                      text: ' فواتير التالف',
                      route: 'DamageBills',
                    },
                    {
                      id: '8_6',
                      text: ' دفع فواتير  ',
                      route: 'PayBills',
                    },



                  ],
                })

            }
            if (item.name == 'budget') {
              this.ProjectRoutes2.push({

                id: '17',
                text: 'المحفظة',
                icon: '../../../../assets/images/budget.svg',
                route: 'budget'
              })


            }








          })

        }



        )
        this.ProjectRoutes2.push(

          {
            id: '13',
            text: 'الاشعارات',
            icon: '../../../../assets/images/notification.svg',
            route: 'Notification'
          })

        this.ProjectRoutes2.sort(function (a, b) {
          return a.id - b.id;
        });
        console.log(this.ProjectRoutes2);
      }

    )

    this.menuOpened = this.screen.sizes['screen-large'];
    this.ProjectRoutes2

    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.selectedRoute = val.urlAfterRedirects.split('?')[0];
      }
    });

    this.screen.changed.subscribe(() => this.updateDrawer());

    this.updateDrawer();
  }
  constructor(
    public showNavigation: NavigationService,
    private screen: ScreenService,
    private router: Router,
    private dataservice: DataService,
    public toaster: ToasterService,
    private cookieService: CookieService
  ) { }

  get hideMenuAfterNavigation() {
    return this.selectedOpenMode === 'overlap' || this.temporaryMenuOpened;
  }

  get showMenuAfterClick() {
    return !this.menuOpened;
  }
  updateDrawer() {
    const isXSmall = this.screen.sizes['screen-x-small'];
    const isLarge = this.screen.sizes['screen-large'];
    this.menuOpened = isLarge ? true : false;
    this.selectedOpenMode = isLarge ? 'shrink' : 'overlap';
    this.selectedRevealMode = isXSmall ? 'slide' : 'expand';
  }
  onItemClick(event) {
    const path = event.itemData.route;
    const pointerEvent = event.event;

    if (path && this.menuOpened) {
      this.router.navigate([path]);

      if (this.hideMenuAfterNavigation) {
        this.temporaryMenuOpened = false;
        this.menuOpened = false;
        pointerEvent.stopPropagation();
      }
    } else {
      pointerEvent.preventDefault();
    }
  }
  navigationClick() {
    if (this.showMenuAfterClick) {
      this.temporaryMenuOpened = true;
      this.menuOpened = true;
    }
  }
}
