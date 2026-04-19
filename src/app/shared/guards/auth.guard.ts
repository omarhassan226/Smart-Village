import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  state:any;
  constructor(private router: Router,private cookieService: CookieService ) {


    
   }

   
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {


      if (this.cookieService.get('user_token')) {
      
      return true;
      } else {
        this.router.navigate(['/login'], {
          queryParams: {
            return: state.url
          }
        });
        return false;
      }

    }
  }