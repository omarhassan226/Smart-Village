import { Route } from '@angular/compiler/src/core';
import { Injectable } from '@angular/core';
import { NgModule, OnInit } from '@angular/core';
import { CanActivate, Router, RouterModule, Routes } from '@angular/router';
import { authGaurdAdmin, authGaurdBaner, authGaurdbill, authGaurdbudget, authGaurdCategory, authGaurdCost, authGaurdDelivery, authGaurdOrder, authGaurdProduct, authGaurdReport, authGaurdRole, authGaurdSetting, authGaurdUser } from './authGaurdforRole';
import { OfferSettingComponent } from './core/modules/offerImage/offer-setting.component';

import { LoginFormComponent } from './shared/components/login-form/login-form.component';
import { SideNavComponent } from './shared/components/side-nav/side-nav.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { DataService } from './shared/services/data-service/data.service';



export const AppRoutes: Routes = [
  {
    path: '',
     canActivate: [AuthGuard],
     component: SideNavComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('../app/core/modules/home/home.module').then(
            (m) => m.HomeModule
          ),
      },
      {
        path: '',
        loadChildren: () =>
          import('../app/core/modules/keywords/keywords.module').then(
            (m) => m.KeywordsModule
          ),
      },
      
      {
        path: '',
      
        
        loadChildren: () =>
          import('../app/core/modules/policy/policy.module').then(
            (m) => m.PolicyModule
          )
      },
      {
        path: '',
      
        
        loadChildren: () =>
          import('../app/core/modules/seller/seller.module').then(
            (m) => m.SellerModule
          )
      },
      {
        path: '',
      
        canActivate:[authGaurdbudget],
        loadChildren: () =>
          import('../app/core/modules/budget/budget.module').then(
            (m) => m.BudgetModule
          )
      },
      {
        path: '',
      canActivate:[authGaurdbill],
        
        loadChildren: () =>
          import('../app/core/modules/Bills/bills.module').then(
            (m) => m.BillsModule
          )
      },
      {
        path: '',
      
        
        loadChildren: () =>
          import('../app/core/modules/Supplier/supplier.module').then(
            (m) => m.SupplierModule
          )
      },
      {
        path: '',
        canActivate: [authGaurdUser],
        
        loadChildren: () =>
          import('../app/core/modules/customers/customers.module').then(
            (m) => m.CustomersModule
          )
      },
      {
        path: '',
        canActivate: [authGaurdRole],
        loadChildren: () =>
          import('../app/core/modules/roles/roles.module').then(
            (m) => m.RolesModule
          ),
      },
      {
        path: '',
        canActivate: [authGaurdProduct],
        loadChildren: () =>
          import('../app/core/modules/products/products.module').then(
            (m) => m.ProductsModule
          ),
      },
      {
        path: '',
        canActivate: [authGaurdDelivery],
        loadChildren: () =>
          import('../app/core/modules/delivering/delivering.module').then(
            (m) => m.DeliveringModule
          ),
      },
      {
        path: '',
        canActivate: [authGaurdOrder],
        loadChildren: () =>
          import('../app/core/modules/orders/orders.module').then(
            (m) => m.OrdersModule
          ),
      },
      {
        path: '',
        canActivate: [authGaurdCost],
        loadChildren: () =>
          import('../app/core/modules/costs/costs.module').then(
            (m) => m.CostsModule
          ),
      },
      {
        path: '',
        canActivate: [authGaurdSetting],
        loadChildren: () =>
          import('../app/core/modules/settings/settings.module').then(
            (m) => m.SettingsModule
          ),
      },
      {
        path: '',
        canActivate: [authGaurdReport],
        loadChildren: () =>
          import('../app/core/modules/reports/reports.module').then(
            (m) => m.ReportsModule
          ),
      },
      {
        path: '',
        canActivate: [authGaurdAdmin],
        loadChildren: () =>
          import('../app/core/modules/admin-panel/admin-panel.module').then(
            (m) => m.AdminPanelModule
          ),
      },
      {
        path: '',
        canActivate: [authGaurdCategory],
        loadChildren: () =>
          import('../app/core/modules/categories/categories.module').then(
            (m) => m.CategoriesModule
          ),
      },
      {
        path: '',
       
        loadChildren: () =>
          import('../app/core/modules/notification/notification.module').then(
            (m) => m.NotificationModule
          ),
      },
      {
        path: '',
        canActivate: [authGaurdBaner],
        loadChildren: () =>
          import('../app/core/modules/banners/banners.module').then(
            (m) => m.BannersModule
          ),
      },
      {
        path: 'OfferSetting',
        component:OfferSettingComponent,
      
      },
      {
        path: '',
        loadChildren: () =>
          import('./core/modules/banks/banks.module').then(
            (m) => m.BanksModule
          ),
      },
    ],
  },

  {
    path: 'login',
    component: LoginFormComponent,
    // canActivate: [AuthGuardService],
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(AppRoutes, {
      useHash: true,
    }),
   ],
  exports: [RouterModule],
})
export class AppRoutingModule { }


         

     



  

  


