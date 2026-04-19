import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { DxValidatorComponent } from 'devextreme-angular';
import { NavigationHeaderService } from 'src/app/shared/navigation-header.service';
import { DataService } from 'src/app/shared/services/data-service/data.service';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler/error-handler.service';
import { LoadingService } from 'src/app/shared/services/loading-service/loading.service';
import { ToasterService } from 'src/app/shared/services/toaster/toaster.service';
import { SubSink } from 'subsink';
import { SettingPopComponent } from '../setting-pop/setting-pop.component';
import { AngularEditorConfig } from '@kolkov/angular-editor';

import * as Editor from '../../../../../../src/ckeditor5-31.0.0-ygi80ogtwnzf/build/ckeditor';


@Component({
  selector: 'app-setting-shell',
  templateUrl: './setting-shell.component.html',
  // styleUrls: ['./setting-shell.component.css'],
})
export class SettingShellComponent implements OnInit {
  public Editor = Editor;
  public config= {
    toolbar: {
      items: [
          'heading', '|',
          'alignment', '|',
          'bold', 'italic', 'strikethrough', 'underline', 'subscript', 'superscript', '|',
          'link', '|',
          'bulletedList', 'numberedList', 'todoList',
          '-', // break point
          'fontfamily', 'fontsize', 'fontColor', 'fontBackgroundColor', '|',
          'code', 'codeBlock', '|',
          'insertTable', '|',
          'outdent', 'indent', '|',
          'uploadImage', 'blockQuote', '|',
          'undo', 'redo'
      ],
      shouldNotGroupWhenFull: true
  }
}
  @ViewChildren(DxValidatorComponent) validatorViewChildren: QueryList<DxValidatorComponent>;
  @ViewChild('popup')popup: SettingPopComponent;
  @ViewChild('companyImg') companyImg: ElementRef;
  isConfirmDeletePopupVisible = false;
  isSettingsPopupVisible = false;
  editingCompanystate = false;
  deleteType;
  deletedId;
  facebookLink = '';
  youtubeLink = '';
  instgramLink = '';
  twitterLink = '';
  whatsupLink = '';
  phoneNumber = '';
  popTitle = '';
  name_ar = '';
  name_en = '';
  image = '';
  shipping = ''
  quality = ''
  terms_of_use=''
  selectedId ;
  companyId;
  Questions;
  Companies;
  imgSrc = '../../../../../assets/images/upload.png'
  activeSaveSocila = false;
  private subs = new SubSink();
 

  constructor(
    public dataService: DataService,
    private navigationHeaderService: NavigationHeaderService,
     private loading: LoadingService,private errorService: ErrorHandlerService,
     private toaster: ToasterService) {}

  ngOnInit(): void {
    this.navigationHeaderService.headerObject$.next({
      headericon: 'settings-icon',
      headerTitle: 'الأعدادت',
    });
    this.getSocila();
    this.getQuestions();
    this.getCompanies();
  }
  resetCompany = () => {
    this.name_ar = '';
    this.name_en = '';
    this.imgSrc = '../../../../../assets/images/upload.png';
    this.companyImg.nativeElement.value = "";
   
  }
  showPreview(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.imgSrc = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.image = event.target.files[0];
      
    }
    else {
      this.imgSrc ="../../../../../assets/images/upload.png" ;
      
      this.image = null;
    }
  }
  EditSocialLinks = () => {
    let socialObj = {
      facebook : this.facebookLink,
      instragram : this.instgramLink,
      twitter : this.twitterLink,
      whatsapp : this.whatsupLink,
      phone: this.phoneNumber,
      youtube: this.youtubeLink
    }
    this.showLoading();
    this.subs.sink = this.dataService.updateSocial(socialObj).subscribe(res => {
      if( res['status']) {
        this.getSocila();
      }
      this.hideLoading();
    }, err => {
      this.hideLoading();
      this.handleError(err);
    });
  }

 
    getCompanies = () => {
    this.showLoading();
    this.subs.sink = this.dataService.getCompanies().subscribe(res => {
     
      this.Companies = res.companies;
      this.hideLoading();
    }, err => {
      this.hideLoading();
      this.handleError(err);
    });
  }
  getCompanyById = (id) => {
    this.showLoading();
    this.subs.sink = this.dataService.getCompanyById(id).subscribe(res => {
      this.name_ar = res.company.name_ar;
      this.name_en = res.company.name_en;
      this.imgSrc = 'https://smartvillageapp.com/app/'+res.company.logo;
      this.editingCompanystate = true;
      this.companyId =res.company.id;
      this.hideLoading();
    }, err => {
      this.hideLoading();
      this.handleError(err);
    });
  }

  editCompany = (id) => {
    const formData: FormData = new FormData();
    formData.append('name_ar',this.name_ar);
    formData.append('name_en', this.name_en);
    formData.append('image',this.image);
    if(!this.name_en || !this.name_ar) {
      return
    } if (!this.image) {
      this.toaster.showErrorToast('الصورة مطلوبة');
    } else {
      this.showLoading();
      this.subs.sink = this.dataService.editCompany(formData,id).subscribe(res => {
        if(res['status']== true) {
          this.getCompanies();
          this.resetCompany();
          this.clearDxValidators();
          this.toaster.showSuccessToast('تم التعديل بنجاح');
          this.editingCompanystate = false;
         
        }
        
        this.hideLoading();
      }, err => {
        this.hideLoading();
        this.handleError(err);
      });
    }
   
  }
  addCompany = () => {
    if(!this.name_en || !this.name_ar) {
      return
    } if (!this.image) {
      this.toaster.showErrorToast('الصورة مطلوبة');
    } else {
      const formData: FormData = new FormData();
      formData.append('name_en',this.name_en);
      formData.append('name_ar', this.name_ar);
      formData.append('image',this.image);
    
      this.showLoading();
      this.subs.sink = this.dataService.addcompany(formData).subscribe(res => {
        if(res['status']== true) {
          this.getCompanies();
          this.resetCompany();
          this.clearDxValidators();
          this.toaster.showSuccessToast('تم الأضافة بنجاح')
        }
        
        this.hideLoading();
      }, err => {
        this.hideLoading();
        this.handleError(err);
      });
    }
    
  }
  submitCompany = () => {
    if(this.editingCompanystate) {
      this.editCompany(this.companyId);
    } else {
      this.addCompany();
    }
  }
  deletecompany = (id) => {
    this.showLoading();
    this.subs.sink = this.dataService.deletecompany(id).subscribe(res => {
      if(res['status']== true) {
        this.getCompanies();
        this.toaster.showSuccessToast('تم الحذف بنجاح');
        this.resetCompany();
        this.clearDxValidators();
        this.editingCompanystate = false;
      }
      
      this.hideLoading();
    }, err => {
      this.hideLoading();
      this.handleError(err);
    });
  }
  getQuestions = () => {
    this.showLoading();
    this.subs.sink = this.dataService.getQuestions().subscribe(res => {
     
      this.Questions = res.questions.data;
      this.hideLoading();
    }, err => {
      this.hideLoading();
      this.handleError(err);
    });
  }
  getQuestionById = (id) => {
    this.showLoading();
    this.subs.sink = this.dataService.getQuestionById(id).subscribe(res => {
      
     this.popup.patchform(res.question)     
      this.hideLoading();
    }, err => {
      this.hideLoading();
      this.handleError(err);
    });
  }

  editQuestion = (body) => {
    this.showLoading();
    this.subs.sink = this.dataService.editQuestion(body,this.selectedId).subscribe(res => {
      if(res['status']== true) {
        this.getQuestions();
        this.popup.resetForm();
        this.popup.clearDxValidators();
        this.clearDxValidators();
        this.hidePopUp();
        
      }
      
      this.hideLoading();
    }, err => {
      this.hideLoading();
      this.handleError(err);
    });
  }

  saveUse() {
    let socialObj = {

      terms_of_use: this.terms_of_use

    }
    this.showLoading();
    this.subs.sink = this.dataService.updateShipping(socialObj).subscribe(res => {

      this.getSocila();

    }, err => {

    });
  }
  addQuestion = (body) => {
    
    this.showLoading();
    this.subs.sink = this.dataService.addQuestion(body).subscribe(res => {
      if(res['status']== true) {
        this.getQuestions();
        this.popup.resetForm();
        
        this.hidePopUp();
        this.popup.clearDxValidators();
        this.clearDxValidators();
      }
      
      this.hideLoading();
    }, err => {
      this.hideLoading();
      this.handleError(err);
    });
  }
  deleteQuestion = (id) => {
    this.showLoading();
    this.subs.sink = this.dataService.deleteQuestion(id).subscribe(res => {
      if(res['status']== true) {
        this.getQuestions();
        this.toaster.showSuccessToast('تم الحذف بنجاح')
      }
      
      this.hideLoading();
    }, err => {
      this.hideLoading();
      this.handleError(err);
    });
  }
 
  getSocila = (): void => {
    this.showLoading();
    this.subs.sink = this.dataService.getSocial().subscribe(res => {
      console.log(res)
      this.youtubeLink= res['socail'].youtube;
   
      this.facebookLink =  res['socail'].facebook;
      this.twitterLink = res['socail'].twitter;
      this.whatsupLink = res['socail'].whatsapp;
      this.instgramLink = res['socail'].instragram;
      this.phoneNumber = res['socail'].phone;
      this.shipping = res['socail'].shipping;
      this.quality = res['socail'].secure;
      this.terms_of_use = res['socail'].terms_of_use;
      this.hideLoading();
    }, err => {
      this.hideLoading();
      this.handleError(err);
    });
  }
  whenDeletePopupConfirm = (e) => {
    if (e && this.deleteType == 1) {
        this.deleteQuestion(this.deletedId);
        this.hideDeletePopup();
      }
      else  if (e && this.deleteType == 2) {
        this.deletecompany(this.deletedId);
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
   savequality()


  {


    let socialObj = {

      secure: this.quality
    }
     this.showLoading();
     this.subs.sink = this.dataService.updateSecure(socialObj).subscribe(res => {
   
        this.getSocila();
    
    }, err => {
      
    });

  }
  saveshipping() {
    let socialObj = {

      shipping: this.shipping
      
    }
    this.showLoading();
    this.subs.sink = this.dataService.updateShipping(socialObj).subscribe(res => {
      
        this.getSocila();
      
    }, err => {
      
    });}
  showLoading = () => this.loading.showLoading();
  hideLoading = () => this.loading.hideLoading();
  showDeletePopup = (id, deleteType) =>{ this.isConfirmDeletePopupVisible = true; this.deletedId = id;
  this.deleteType = deleteType}
  hideDeletePopup = (): boolean => this.isConfirmDeletePopupVisible = false;
  handleError = (error: any) => this.errorService.handleError(error);
  hidePopUp = () => (this.isSettingsPopupVisible = false);
  showPopUp = (title,id) => {
    this.popup.resetForm();
    this.popTitle = title;
    this.isSettingsPopupVisible = true;
    this.selectedId = id;
    if(title == 'تعديل السوال') {
      this.getQuestionById(id);
    }
  };
}
