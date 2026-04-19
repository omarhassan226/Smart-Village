import { QueryList } from '@angular/core';
import { ViewChildren } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { DxValidatorComponent } from 'devextreme-angular';
import { NavigationHeaderService } from '../../../../shared/navigation-header.service';
import { DataService } from '../../../../shared/services/data-service/data.service';
import { ToasterService } from '../../../../shared/services/toaster/toaster.service';

@Component({
  selector: 'app-shell-notification',
  templateUrl: './shell-notification.component.html',
  styleUrls: ['./shell-notification.component.css']
})
export class ShellNotificationComponent implements OnInit {
  @ViewChildren(DxValidatorComponent) validatorViewChildren: QueryList<DxValidatorComponent>;
  imgSrc2 = "../../../../../assets/images/upload.png"
  quality: ''
  description: ''

  file:any
  products:any []
  constructor(private navigationHeaderService: NavigationHeaderService, private dataservice:
    DataService ,private toaster: ToasterService) { }

  ngOnInit(): void {
    this.navigationHeaderService.headerObject$.next({
      headericon: '../../../../assets/images/notification.svg',
      headerTitle: 'الاشعارات',
    });
    this.getNotification()
   

  }
  showPreview1 = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.imgSrc2 = e.target.result;
      reader.readAsDataURL(e.target.files[0]);
      this.file = e.target.files[0];

    }
    else {
      this.imgSrc2 = "../../../../../assets/images/upload.png";

      this.file = null;
    }
  }
  clearDxValidators = () => {
    this.validatorViewChildren.toArray().map(ref => {
      ref.instance.reset();
    })
  }
  addNotification() {
    if (!this.quality || !this.description) { return }
    else {
      const addnotif = new FormData();
      addnotif.append('title', this.quality)
      addnotif.append('Body', this.description)
      addnotif.append('file', this.file)

      //let body = { title: this.quality, Body: this.description }
      this.dataservice.sendNotification(addnotif).subscribe
        (res => {

   
          this.resetForm()
          this.clearDxValidators()
          this.getNotification()
          this.toaster.showSuccessToast('تم الاضافه بنجاح')

        })

    }
  }
  resetForm() {
    this.quality = '';
    this.description = ''
    this.file = null
   this.imgSrc2 = "../../../../../assets/images/upload.png"


  }
  getNotification() {

    this.dataservice.showNotifications(


    ).subscribe(res => { this.products = res.notifications })
  }
}
