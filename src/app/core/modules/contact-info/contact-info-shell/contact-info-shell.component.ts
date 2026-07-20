import { Component, OnInit } from '@angular/core';
import { NavigationHeaderService } from 'src/app/shared/navigation-header.service';
import { DataService } from 'src/app/shared/services/data-service/data.service';
import { ToasterService } from 'src/app/shared/services/toaster/toaster.service';
import { LoadingService } from 'src/app/shared/services/loading-service/loading.service';

@Component({
  selector: 'app-contact-info-shell',
  templateUrl: './contact-info-shell.component.html',
  styleUrls: ['./contact-info-shell.component.css']
})
export class ContactInfoShellComponent implements OnInit {
  email = '';
  address = '';
  work_hour = '';
  locations = '';

  constructor(
    private dataService: DataService,
    private navigationHeaderService: NavigationHeaderService,
    private toaster: ToasterService,
    private loading: LoadingService
  ) { }

  ngOnInit(): void {
    this.navigationHeaderService.headerObject$.next({
      headericon: 'card',
      headerTitle: 'معلومات الاتصال',
    });
    this.getContactInfo();
  }

  showLoading = () => this.loading.showLoading();
  hideLoading = () => this.loading.hideLoading();

  getContactInfo() {
    this.showLoading();
    this.dataService.getContactInfo().subscribe(
      res => {
        this.hideLoading();
        if (res) {
          const data = res.contact_info || res.data || res;
          this.email = data.email || '';
          this.address = data.address || '';
          this.work_hour = data.work_hour || '';
          this.locations = data.locations || '';
        }
      },
      err => {
        this.hideLoading();
        this.toaster.showErrorToast('حدث خطأ أثناء جلب البيانات');
      }
    );
  }

  saveContactInfo() {
    if (!this.email || !this.address || !this.work_hour || !this.locations) {
      this.toaster.showErrorToast('يرجى ملء جميع الحقول المطلوبة');
      return;
    }

    const payload = {
      email: this.email,
      address: this.address,
      work_hour: this.work_hour,
      locations: this.locations
    };

    this.showLoading();
    this.dataService.updateContactInfo(payload).subscribe(
      res => {
        this.hideLoading();
        this.toaster.showSuccessToast('تم الحفظ بنجاح');
        this.getContactInfo();
      },
      err => {
        this.hideLoading();
        this.toaster.showErrorToast('حدث خطأ أثناء حفظ البيانات');
      }
    );
  }
}
