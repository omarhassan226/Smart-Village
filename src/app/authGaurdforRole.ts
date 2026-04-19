import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { servicefind } from "./servicefind";
import { DataService } from "./shared/services/data-service/data.service";
@Injectable({
  providedIn: 'root'
})

export class authGaurdUser implements CanActivate {


  constructor(private dataservice: DataService, private _router: Router, private servicefind: servicefind) { }
  canActivate() {
    if (this.servicefind.moduleExisting('user')) {
      return true
    }
    else {
      this._router.navigate(['']);
      return false
    }
  }


}
@Injectable({
  providedIn: 'root'
})
export class authGaurdCategory implements CanActivate {


  constructor(private dataservice: DataService, private _router: Router, private servicefind: servicefind) { }
  canActivate() {
    if (this.servicefind.moduleExisting('category')) {
      return true
    }
    else {
      this._router.navigate(['']);
      return false
    }
  }


}
@Injectable({
  providedIn: 'root'
})
export class authGaurdRole implements CanActivate {


  constructor(private dataservice: DataService, private _router: Router, private servicefind: servicefind) { }
  canActivate() {
    if (this.servicefind.moduleExisting('role')) {
      return true
    }
    else {
      this._router.navigate(['']);
      return false
    }
  }


}
@Injectable({
  providedIn: 'root'
})
export class authGaurdProduct implements CanActivate {


  constructor(private dataservice: DataService, private _router: Router, private servicefind: servicefind) { }
  canActivate() {
    if (this.servicefind.moduleExisting('product')) {
      return true
    }
    else {
      this._router.navigate(['']);
      return false
    }
  }


}
@Injectable({
  providedIn: 'root'
})
export class authGaurdCost implements CanActivate {


  constructor(private dataservice: DataService, private _router: Router, private servicefind: servicefind) { }
  canActivate() {
    if (this.servicefind.moduleExisting('cost')) {
      return true
    }
    else {
      this._router.navigate(['']);
      return false
    }
  }


}
@Injectable({
  providedIn: 'root'
})
export class authGaurdReport implements CanActivate {


  constructor(private dataservice: DataService, private _router: Router, private servicefind: servicefind) { }
  canActivate() {
    if (this.servicefind.moduleExisting('report')) {
      return true
    }
    else {
      this._router.navigate(['']);
      return false
    }
  }


}
@Injectable({
  providedIn: 'root'
})
export class authGaurdAdmin implements CanActivate {


  constructor(private dataservice: DataService, private _router: Router, private servicefind: servicefind) { }
  canActivate() {
    if (this.servicefind.moduleExisting('admin')) {
      return true
    }
    else {
      this._router.navigate(['']);
      return false
    }
  }


}
@Injectable({
  providedIn: 'root'
})

export class authGaurdOrder implements CanActivate {


  constructor(private dataservice: DataService, private _router: Router, private servicefind: servicefind) { }
  canActivate() {
    if (this.servicefind.moduleExisting('order')) {
      return true
    }
    else {
      this._router.navigate(['']);
      return false
    }
  }


}
@Injectable({
  providedIn: 'root'
})
export class authGaurdSetting implements CanActivate {


  constructor(private dataservice: DataService, private _router: Router, private servicefind: servicefind) { }
  canActivate() {
    if (this.servicefind.moduleExisting('setting')) {
      return true
    }
    else {
      this._router.navigate(['']);
      return false
    }
  }


}
@Injectable({
  providedIn: 'root'
})

export class authGaurdDelivery implements CanActivate {


  constructor(private dataservice: DataService, private _router: Router, private servicefind: servicefind) { }
  canActivate() {
    if (this.servicefind.moduleExisting('delivery')) {
      return true
    }
    else {
      this._router.navigate(['']);
      return false
    }
  }


}
@Injectable({
  providedIn: 'root'
})
export class authGaurdBaner implements CanActivate {


  constructor(private dataservice: DataService, private _router: Router, private servicefind: servicefind) { }
  canActivate() {
    if (this.servicefind.moduleExisting('baner')) {
      return true
    }
    else {
      this._router.navigate(['']);
      return false
    }
  }


}



@Injectable({
  providedIn: 'root'
})
export class authGaurdbill implements CanActivate {


  constructor(private dataservice: DataService, private _router: Router, private servicefind: servicefind) { }
  canActivate() {
    if (this.servicefind.moduleExisting('bill')) {
      return true
    }
    else {
      this._router.navigate(['']);
      return false
    }
  }


}
@Injectable({
  providedIn: 'root'
})
export class authGaurdbudget implements CanActivate {


  constructor(private dataservice: DataService, private _router: Router, private servicefind: servicefind) { }
  canActivate() {
    
    if (this.servicefind.moduleExisting('budget')) {
      return true
    }
    else {
      this._router.navigate(['']);
      return false
    }
  }


}
