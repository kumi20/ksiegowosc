import { Component, OnInit, ElementRef, Input, ViewChild, Output, EventEmitter, ViewChildren, AfterViewInit, OnDestroy} from '@angular/core';
import { EventService } from '../event.service';
import { ApiService } from '../api.service';
import { ActivatedRoute, Router } from '@angular/router';

import { FormGroup, FormControl, Validators} from '@angular/forms';
import { JwtHelper} from 'angular2-jwt'


import {
    AuthService,
    FacebookLoginProvider,
    GoogleLoginProvider
} from 'angular-6-social-login';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    

  userAuthorization;
    
  errorLogin: string = '';
  jwtHelper: JwtHelper = new JwtHelper();    
    
  constructor(private CmsService: ApiService, private event: EventService, private route: ActivatedRoute, private _route: Router,  private socialAuthService: AuthService) { }

  ngOnInit() {
      this.userAuthorization = new FormGroup({
          email: new FormControl("", Validators.required),
          psw: new FormControl("", Validators.required)
      })
  }
    
  logON(value){
      
      this.CmsService.logOn(value.email, value.psw).subscribe(
          response => {
              let tokenExpDate = this.jwtHelper.decodeToken(response);
              if (tokenExpDate.kod != 0 ) this.errorLogin = tokenExpDate.opis;
              else {
                  this.errorLogin = '';
                  localStorage.setItem('ksiegaQumiToken', response);
                  localStorage.setItem('user_nameKsiega', tokenExpDate.name);
                  document.getElementById('btn_close_login').click();
                  this.getCompanyDate();
                  this._route.navigateByUrl('panel');
              }
          }
      )
  }
    
    
  public socialSignIn(socialPlatform : string) {
        let socialPlatformProvider;
    
        if(socialPlatform == "facebook"){
          socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
        }
    
        this.socialAuthService.signIn(socialPlatformProvider).then(
          (userData) => {
            localStorage.setItem('ksiegaQumiToken', userData.id);
            localStorage.setItem('user_nameKsiega', userData.name);
            document.getElementById('btn_close_login').click();
            this.getCompanyDate();  
            this._route.navigateByUrl('panel');            
          }
        );
   }  
    
    
   getCompanyDate(){
       this.CmsService.getAuthorization('getCompanyDate.php').subscribe(
            response =>{
                console.log(response)
                if (response.kod === 0){
                    //this.companyNeme = response.name;
                    localStorage.setItem('companyName', response.name);
                    localStorage.setItem('companyAdres', response.adres);
                    localStorage.setItem('companyCity', response.city);
                    localStorage.setItem('companyNip', response.nip);
                }
                else if (response.kod === -1) this.event.showInfo('error', response.description);
                else{
                    localStorage.removeItem('companyName');
                    localStorage.removeItem('companyAdres');
                    localStorage.removeItem('companyCity');
                    localStorage.removeItem('companyNip');
                }
            }
        )
   }    
}
