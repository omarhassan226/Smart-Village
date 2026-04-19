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
