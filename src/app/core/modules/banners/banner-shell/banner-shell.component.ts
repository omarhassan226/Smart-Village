import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { DxValidatorComponent } from 'devextreme-angular';
import { NavigationHeaderService } from 'src/app/shared/navigation-header.service';
import { DataService } from 'src/app/shared/services/data-service/data.service';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler/error-handler.service';
import { LoadingService } from 'src/app/shared/services/loading-service/loading.service';
import { ToasterService } from 'src/app/shared/services/toaster/toaster.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-banner-shell',
  templateUrl: './banner-shell.component.html',
  styleUrls: ['./banner-shell.component.css']
})
export class BannerShellComponent implements OnInit {
  @ViewChild('imageAr') imageAr: ElementRef;
  @ViewChild('imageEn') imageEn: ElementRef;
  @ViewChildren(DxValidatorComponent) validatorViewChildren: QueryList<DxValidatorComponent>;

  private subs = new SubSink();
  imgSrc1 = '../../../../../assets/images/upload.png';
  imgSrc2 = '../../../../../assets/images/upload.png';
  image_ar = '';
  image_en = '';
  banner_type = '';
  isConfirmDeletePopupVisible = false;
  banners;
  deletedId;
  selectedId;
  editState = false;

  ngOnInit(): void {
    this.getBanners();
    this.navigationHeaderService.headerObject$.next({
      headericon: 'image',
      headerTitle: 'ألبنرات',
    });
  }

  showPreview2 = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.imgSrc2 = e.target.result;
      reader.readAsDataURL(e.target.files[0]);
      this.image_en = e.target.files[0];

    }
    else {
      this.imgSrc2 = "../../../../../assets/images/upload.png";

      this.image_en = null;
    }
  }

  showPreview1(e) {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.imgSrc1 = e.target.result;
      reader.readAsDataURL(e.target.files[0]);
      this.image_ar = e.target.files[0];

    }
    else {
      this.imgSrc1 = "../../../../../assets/images/upload.png";

      this.image_ar = null;
    }
  }

  getBanners = (): void => {
    this.showLoading();
    this.subs.sink = this.dataService.getBanners().subscribe(res => {
      this.banners = res.banners;
      this.hideLoading();
    }, err => {
      this.hideLoading();
      this.handleError(err);
    });
  }

  handleBanner = () => {
    const formData = new FormData();
    formData.append('banner_type', this.banner_type.toString());
    formData.append('image_en', this.image_en);
    formData.append('image_ar', this.image_ar);
    if (!this.banner_type) {
      return;
    } else {
      if (this.editState) {

        let ob = { image_en: this.image_en, image_ar: this.image_ar, banner_type: this.banner_type }
        this.editBanner(ob);
        this.editBanner(formData);

      } else {
        if (!this.image_ar) {
          this.toaster.showErrorToast("بنر اللغة العربية مطلوب");
          return;
        } else if (!this.image_en) {
          this.toaster.showErrorToast("بنر اللغة الانجليزية مطلوب");
          return;
        } else {
          this.addBanner(formData)
        }

      }
    }

  }
  addBanner = (body) => {

    this.showLoading();

    this.subs.sink = this.dataService.addBanner(body).subscribe(res => {

      if (res['status'] == true) {
        this.getBanners();
        this.clearDxValidators();
        this.imageAr.nativeElement.value = '';
        this.imageEn.nativeElement.value = '';
        this.resetForm();
        this.toaster.showSuccessToast('تم الأضافة بنجاح');

      }

      this.hideLoading();
    }, err => {
      this.hideLoading();
      this.handleError(err);
    });
  }
  editBanner = (body) => {
    this.showLoading();
    this.subs.sink = this.dataService.editBanner(body, this.selectedId).subscribe(res => {
      if (res['status'] == true) {
        this.getBanners();
        this.resetForm();
        this.clearDxValidators();
        this.toaster.showSuccessToast('تم التعديل بنجاح');
        this.editState = false;
      }

      this.hideLoading();
    }, err => {
      this.hideLoading();
      this.handleError(err);
    });
  }
  patchForm = (data) => {
    this.imgSrc1 = 'https://smartvillageapp.com/app/' + data.image_en;
    this.imgSrc2 = 'https://smartvillageapp.com/app/' + data.image_ar;
    this.banner_type = data.banner_type;
  }
  getBannerById = (id) => {
    this.showLoading();
    this.subs.sink = this.dataService.getBannerById(id).subscribe(res => {
      this.patchForm(res.banner);
      this.editState = true;
      this.selectedId = id;
      this.hideLoading();
    }, err => {
      this.hideLoading();
      this.handleError(err);
    });
  }
  deleteBanner = (id) => {
    this.showLoading();
    this.subs.sink = this.dataService.deleteBanner(id).subscribe(res => {
      if (res['status'] == true) {
        this.getBanners();
        this.toaster.showSuccessToast('تم الحذف بنجاح');
        this.resetForm();
      }

      this.hideLoading();
    }, err => {
      this.hideLoading();
      this.handleError(err);
    });
  }

  whenDeletePopupConfirm = (e) => {
    if (e) {
      this.deleteBanner(this.deletedId);
      this.hideDeletePopup();
    }
    else {
      this.hideDeletePopup();
    }
  }
  clearDxValidators = () => {
    this.validatorViewChildren.toArray().map(ref => {
      ref.instance.reset();
    })
  }
  resetForm = () => {
    this.imgSrc1 = "../../../../../assets/images/upload.png";
    this.imgSrc2 = "../../../../../assets/images/upload.png";
    this.banner_type = "";

  }
  constructor(private dataService: DataService,
    private navigationHeaderService: NavigationHeaderService,
    private loading: LoadingService, private errorService: ErrorHandlerService,
    private toaster: ToasterService) {

  }
  showLoading = () => this.loading.showLoading();
  hideLoading = () => this.loading.hideLoading();
  handleError = (error: any) => this.errorService.handleError(error);
  showDeletePopup = (id) => { this.isConfirmDeletePopupVisible = true; this.deletedId = id }
  hideDeletePopup = (): boolean => this.isConfirmDeletePopupVisible = false;
}
