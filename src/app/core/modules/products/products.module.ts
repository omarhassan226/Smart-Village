import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductsShellComponent } from './products-shell/products-shell.component';
import { DxSharedModule } from 'src/app/shared/dx-shared/dx-shared.module';
import { Routes,RouterModule } from '@angular/router';
import { ProductsTabShellComponent } from './products-tab-shell/products-tab-shell.component';
import { ProductsMainDataFormComponent } from './products-main-data-form/products-main-data-form.component';
import { AdvancedChoicesComponent } from './advanced-choices/advanced-choices.component';
import { ProductsPipe } from './products.pipe';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';


const PorductsRoutes: Routes = [ {
  path: 'products',
  component: ProductsShellComponent
}
];

@NgModule({
  declarations: [ProductsListComponent,
     ProductsShellComponent, ProductsTabShellComponent,
      ProductsMainDataFormComponent, AdvancedChoicesComponent, ProductsPipe],
  imports: [
    CommonModule,
    CKEditorModule,
    DxSharedModule,
    RouterModule.forChild(PorductsRoutes)
  ]
})
export class ProductsModule {
 }
