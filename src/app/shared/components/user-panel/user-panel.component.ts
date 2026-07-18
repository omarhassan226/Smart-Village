import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.scss']
})
export class UserPanelComponent implements OnInit {
  @Input()
  menuItems: any;

  @Input()
  menuMode: string;

  @Input()
  user: string;

  constructor(private cookieService: CookieService,
    private router: Router
  ) { }
  logOut = () => {
    console.log('test');
    this.cookieService.deleteAll();
    this.router.navigate(['/login'])
  }

  ngOnInit(): void {
  }

}
