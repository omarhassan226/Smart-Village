import { Injectable, OnInit } from "@angular/core"
import { Router } from "@angular/router"
import { CookieService } from "ngx-cookie-service"
import { __await } from "tslib"
import { DataService } from "./shared/services/data-service/data.service"
@Injectable({
  providedIn: 'root'
})
export class servicefind implements OnInit {
  roles: any[]
  ngOnInit() {


    
  }

  constructor(private dataservice: DataService, private _router: Router, private cookieService: CookieService) {
    
  }

  moduleExisting(module): boolean {
    debugger
  
    this.roles = JSON.parse(localStorage.getItem('roles'));
    
    console.log(this.roles)
    let result=false
   this.roles.forEach(element => {


      element.permissions.forEach(item => {
        if (item.name === module) {

          result= true
          
          
         
        }

        console.log(item.name )





      })

    })


    return result

  }
}
