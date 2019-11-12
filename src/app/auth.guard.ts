import { Injectable } from '@angular/core';
import { Router, CanActivate, CanLoad, CanActivateChild } from '@angular/router';
 
@Injectable()
export class AuthGuard implements CanActivate{
 
    constructor(private _router: Router) { }
 
    canActivate() {
        if (window.localStorage.getItem('ksiegaQumiToken')) {
            return true;
        }
 
        this._router.navigate(['/']);
        return false;
    }

}


@Injectable()
export class AlwaysAuthChildrenGuard implements CanActivate {

  constructor(private _router: Router) { }
    
  canActivate() {
//    setTimeout(()=>{
              if(!window.localStorage.getItem("companyName")){
                  this._router.navigate(['/panel/', {outlets: { 'panel-outlet': ['add-user-company'] } }])
                  return false;      
              }else return true;
//          },100);
  }
}


