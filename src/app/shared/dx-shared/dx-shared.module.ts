import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {
  DxButtonModule,
  DxListModule,
  DxNavBarModule,
  DxTemplateModule,
  DxCheckBoxModule,
  DxSelectBoxModule,
  DxMenuModule,
  DxFormModule,
  DxNumberBoxModule,
  DxPopupModule,
  DxToolbarModule,
  DxTreeListModule,
  DxLoadIndicatorModule,
  DxSlideOutModule,
  DxSwitchModule,
  DxDropDownBoxModule,
  DxDataGridModule,
  DxTextBoxModule,
  DxRangeSliderModule,
  DxLookupModule,
  DxTreeViewModule,
  DxDateBoxModule,
  DxRadioGroupModule,
  DxHtmlEditorModule,
  DxTextAreaModule,
  DxDrawerModule,
  DxDropDownButtonModule,
  DxChartModule,
  DxSchedulerModule,
  DxLoadPanelModule,
  DxProgressBarModule,
  DxFileUploaderModule,
  DxSpeedDialActionModule,
  DxPivotGridModule,
  DxTabsModule,
  DxTabPanelModule,
  DxValidatorModule,
  DxValidationSummaryModule,
  DxTagBoxModule,
  DxMapModule,
  DxValidationGroupModule,
  DxAutocompleteModule,
  DxScrollViewModule,
  DxAccordionModule,
  DxColorBoxModule
} from 'devextreme-angular';
import { DeletePopUpComponent } from '../components/delete-pop-up/delete-pop-up.component';

const DX_SHARED_MODULES = [
  DxButtonModule,
  DxListModule,
  DxNavBarModule,
  DxTemplateModule,
  DxCheckBoxModule,
  DxSelectBoxModule,
  DxMenuModule,
  DxFormModule,
  DxNumberBoxModule,
  DxPopupModule,
  DxToolbarModule,
  DxTreeListModule,
  DxLoadIndicatorModule,
  DxSlideOutModule,
  DxSwitchModule,
  DxDropDownBoxModule,
  DxDataGridModule,
  DxTextBoxModule,
  DxRangeSliderModule,
  DxLookupModule,
  DxTreeViewModule,
  DxDateBoxModule,
  DxRadioGroupModule,
  DxHtmlEditorModule,
  DxTextAreaModule,
  DxDrawerModule,
  DxDropDownButtonModule,
  DxChartModule,
  DxSchedulerModule,
  DxLoadPanelModule,
  DxProgressBarModule,
  DxFileUploaderModule,
  DxSpeedDialActionModule,
  DxPivotGridModule,
  DxTabsModule,
  DxTabPanelModule,
  DxValidatorModule,
  DxValidationSummaryModule,
  DxTagBoxModule,
  DxMapModule,
  DxValidationGroupModule,
  DxAutocompleteModule,
  DxScrollViewModule,
  DxAccordionModule,
  DxColorBoxModule
];

const SHARED_MODULES = [
  ReactiveFormsModule,
  FormsModule
];
@NgModule({
  declarations: [DeletePopUpComponent],
  imports: [
    CommonModule,
    DX_SHARED_MODULES,
    SHARED_MODULES
  ],
   exports: [
    DX_SHARED_MODULES,
    SHARED_MODULES,
    DeletePopUpComponent
  ]
})
export class DxSharedModule { }
