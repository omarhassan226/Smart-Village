import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { DxValidatorComponent } from 'devextreme-angular';
import { NavigationHeaderService } from 'src/app/shared/navigation-header.service';
import { DataService } from 'src/app/shared/services/data-service/data.service';
import { ToasterService } from 'src/app/shared/services/toaster/toaster.service';
import { LoadingService } from 'src/app/shared/services/loading-service/loading.service';

@Component({
  selector: 'app-banks-shell',
  templateUrl: './banks-shell.component.html',
  styleUrls: ['./banks-shell.component.css']
})
export class BanksShellComponent implements OnInit {
  @ViewChildren(DxValidatorComponent) validatorViewChildren: QueryList<DxValidatorComponent>;

  banksList: any[] = [];
  
  // Add form fields
  name_ar = '';
  name_en = '';
  number = '';

  // Edit form fields
  edit_name_ar = '';
  edit_name_en = '';
  edit_number = '';
  editBankId: number | null = null;

  isEditPopupVisible = false;
  popTitle = 'تعديل بيانات البنك';

  constructor(
    private dataservice: DataService,
    private navigationHeaderService: NavigationHeaderService,
    private toaster: ToasterService,
    private loading: LoadingService
  ) { }

  ngOnInit(): void {
    this.navigationHeaderService.headerObject$.next({
      headericon: 'fas fa-university',
      headerTitle: 'البنوك',
    });
    this.getBanks();
  }

  showLoading = () => this.loading.showLoading();
  hideLoading = () => this.loading.hideLoading();

  clearDxValidators = () => {
    if (this.validatorViewChildren) {
      this.validatorViewChildren.toArray().map(ref => {
        ref.instance.reset();
      });
    }
  }

  getBanks() {
    this.showLoading();
    this.dataservice.getBanks().subscribe(
      res => {
        this.hideLoading();
        if (res && res.paymments) {
          this.banksList = res.paymments.data || [];
        }
      },
      err => {
        this.hideLoading();
        this.toaster.showErrorToast('حدث خطأ أثناء جلب البيانات');
      }
    );
  }

  addBank() {
    if (!this.name_ar || !this.name_en || !this.number) {
      this.toaster.showErrorToast('يرجى ملء جميع الحقول المطلوبة');
      return;
    }

    const payload = {
      name_ar: this.name_ar,
      name_en: this.name_en,
      number: this.number
    };

    this.showLoading();
    this.dataservice.addBank(payload).subscribe(
      res => {
        this.hideLoading();
        this.toaster.showSuccessToast('تم الإضافة بنجاح');
        this.name_ar = '';
        this.name_en = '';
        this.number = '';
        this.clearDxValidators();
        this.getBanks();
      },
      err => {
        this.hideLoading();
        if (err.error && err.error.errors) {
          for (const [key, value] of Object.entries(err.error.errors)) {
            this.toaster.showErrorToast(`${value}`);
          }
        } else {
          this.toaster.showErrorToast('حدث خطأ أثناء الإضافة');
        }
      }
    );
  }

  showEditPopup(data: any) {
    this.editBankId = data.id;
    this.edit_name_ar = data.name_ar;
    this.edit_name_en = data.name_en;
    this.edit_number = data.number.toString(); // Ensure string comparison/manipulation
    this.isEditPopupVisible = true;
  }

  hideEditPopup() {
    this.isEditPopupVisible = false;
    this.editBankId = null;
    this.edit_name_ar = '';
    this.edit_name_en = '';
    this.edit_number = '';
  }

  editBank() {
    if (!this.edit_name_ar || !this.edit_name_en || !this.edit_number || !this.editBankId) {
      this.toaster.showErrorToast('يرجى ملء جميع الحقول المطلوبة');
      return;
    }

    const payload = {
      name_ar: this.edit_name_ar,
      name_en: this.edit_name_en,
      number: this.edit_number
    };

    this.showLoading();
    this.dataservice.editBank(payload, this.editBankId).subscribe(
      res => {
        this.hideLoading();
        this.toaster.showSuccessToast('تم التعديل بنجاح');
        this.hideEditPopup();
        this.getBanks();
      },
      err => {
        this.hideLoading();
        if (err.error && err.error.errors) {
          for (const [key, value] of Object.entries(err.error.errors)) {
            this.toaster.showErrorToast(`${value}`);
          }
        } else {
          this.toaster.showErrorToast('حدث خطأ أثناء التعديل');
        }
      }
    );
  }
}
