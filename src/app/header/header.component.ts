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

  passwordMode = 'password';
  passwordButton = {
    icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAB7klEQVRYw+2YP0tcQRTFz65xFVJZpBBS2O2qVSrRUkwqYfUDpBbWQu3ELt/HLRQ/Q8RCGxVJrRDEwj9sTATxZ/Hugo4zL/NmV1xhD9xi59177pl9986fVwLUSyi/tYC+oL6gbuNDYtyUpLqkaUmfJY3a+G9JZ5J2JW1J2ivMDBSxeWCfeBxYTHSOWMcRYLOAEBebxtEVQWPASQdi2jgxro4E1YDTQIJjYM18hszGbew4EHNq/kmCvgDnHtI7YBko58SWgSXg1hN/btyFBM0AlwExczG1YDZrMS4uLUeUoDmgFfjLGwXEtG05wNXyTc4NXgzMCOAIGHD8q0ATuDZrempkwGJ9+AfUQ4K+A/eEseqZ/UbgdUw4fqs5vPeW+5mgBvBAPkLd8cPju+341P7D/WAaJGCdOFQI14kr6o/zvBKZYz11L5Okv5KGA89Kzu9K0b0s5ZXt5PjuOL6TRV5ZalFP4F+rrnhZ1Cs5vN6ijmn7Q162/ThZq9+YNW3MbfvDAOed5cxdGL+RFaUPKQtjI8DVAr66/u9i6+jJzTXm+HFEVqxVYBD4SNZNKzk109HxoycPaG0bIeugVDTp4hH2qdXJDu6xOAAWiuQoQdLHhvY1aEZSVdInG7+Q9EvSz9RrUKqgV0PP3Vz7gvqCOsUj+CxC9LB1Dc8AAAASdEVYdEVYSUY6T3JpZW50YXRpb24AMYRY7O8AAAAASUVORK5CYII=",
    type: "default",
    onClick: () => {
        this.passwordMode = this.passwordMode === "text" ? "password" : "text";
        }
    };

    
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
            this.getCompanyDate().then(
                response=>{
                    if(response) this._route.navigateByUrl('panel');  
                    else this._route.navigate(['/panel/', {outlets: { 'panel-outlet': ['add-user-company'] } }]);
                }
            );  
                      
          }
        );
   }  
    
    
   getCompanyDate(){
       return new Promise(resolve=>{
            this.CmsService.getAuthorization('getCompanyDate.php').subscribe(
            response =>{
                if (response.kod === 0){
                    //this.companyNeme = response.name;
                    localStorage.setItem('companyName', response.name);
                    localStorage.setItem('companyAdres', response.adres);
                    localStorage.setItem('companyCity', response.city);
                    localStorage.setItem('companyNip', response.nip);
                    resolve(true);
                }
                else if (response.kod === -1) this.event.showInfo('error', response.description);
                else{
                    localStorage.removeItem('companyName');
                    localStorage.removeItem('companyAdres');
                    localStorage.removeItem('companyCity');
                    localStorage.removeItem('companyNip');
                    resolve(false);
                }
            })  
       })
   }    
}
