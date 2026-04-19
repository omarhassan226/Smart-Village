import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KeywordsAddComponent } from './keywords-add/keywords-add.component';
import { RouterModule, Routes } from '@angular/router';
import { KeywordsListComponent } from './keywords-list/keywords-list.component';
import { DxSharedModule } from 'src/app/shared/dx-shared/dx-shared.module';

const KeyWordsRoutes: Routes = [ {
  path: 'Keywords-add',
  component: KeywordsAddComponent
}
,
{
  path: 'Keywords',
  component: KeywordsListComponent
}];


@NgModule({
  declarations: [KeywordsAddComponent,KeywordsListComponent],
  imports: [
    CommonModule,
    DxSharedModule,
    RouterModule.forChild(KeyWordsRoutes)
  
  ]
})
export class KeywordsModule { }
