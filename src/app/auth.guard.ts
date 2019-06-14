import { Injectable } from '@angular/core';
import { Router, CanActivate, CanLoad } from '@angular/router';
 
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


