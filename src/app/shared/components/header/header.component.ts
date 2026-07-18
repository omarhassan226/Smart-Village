import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { NavigationHeaderService } from '../../navigation-header.service';
import { DataService } from '../../services/data-service/data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  headericon = 'menu';
  headerTitle= 'الرئيسية'

  @Output()
  menuToggle = new EventEmitter<boolean>();

  @Input()
  menuToggleEnabled = false;
  @Input()
  title= 'الرئيسية';

  user = '';
  notifications: any[] = [];
  unreadCount = 0;
  isNotificationBoxVisible = false;

  logOut = () => {
    this.cookiesService.deleteAll();
    this.router.navigate(['/login']);
  }

  userMenuItems = [{
    text: 'Logout',
    icon: 'runner',
    onClick: () => {
     
    }
  }];

 

 ngOnInit () {
  this.dataService.$loginDetails.subscribe(res => {
    if(res) {
      this.user = res ;
    } else {
this.user = this.cookiesService.get('userName')}
    }
)
     this.navigationHeaderService.headerObject$.subscribe(res => {
       this.headericon = res.headericon;
       this.headerTitle = res.headerTitle;
   });

    this.getNotifications();
 }

 getNotifications() {
   this.dataService.getNotifications().subscribe(
     res => {
       this.notifications = res.notifications || [];
       this.unreadCount = res.count || 0;
     },
     err => {
       console.error('Error fetching notifications', err);
     }
   );
 }

  toggleNotificationBox() {
    this.isNotificationBoxVisible = !this.isNotificationBoxVisible;
    if (this.isNotificationBoxVisible) {
      this.unreadCount = 0;
    }
  }

 viewDetails(orderId: any) {
   this.isNotificationBoxVisible = false;
   this.router.navigate([`/userNotification/${orderId}`]);
 }

  toggleMenu = () => {
    this.menuToggle.emit();
  }
  constructor(private navigationHeaderService: NavigationHeaderService,
     private router:Router,
     private cookiesService: CookieService,
     private dataService: DataService) {

  }
  }
