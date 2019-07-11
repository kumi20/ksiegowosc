import { Component, OnInit, ElementRef, Input, ViewChild, Output, EventEmitter, ViewChildren, AfterViewInit, OnDestroy} from '@angular/core';
import { EventService } from '../../event.service';
import { ApiService } from '../../api.service';
import { ActivatedRoute, Router } from '@angular/router';

import { user, password } from './myprofil';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {
    
  user: user = {
      user_email: '',
      user_login: '',
      user_status_id: '',
      user_name: ''
  }    

  password: password = {
      old_psw: '',
      new_psw: '',
      repeat_psw: ''
  }
    
  status=[
      {value: '1', label:'aktywny'},
      {value: '2', label:'zablokowany'},
      {value: '3', label:'usunięty'}
  ];
    
  showError: boolean = false;  
  textError; 
    
  disabled = false;    
    
  showErrorPsw: boolean = false;
  textErrorPsw: string = '';    
    
  constructor(private CmsService: ApiService, private event: EventService, private route: ActivatedRoute, private _route: Router) { }

  ngOnInit() {
      this.getUserData();
  }
    
   getUserData(){
        return new Promise(resolve=>{
            this.CmsService.getAuthorization(`myProfile/getLogin.php`).subscribe(
                response=>{
                    if(response.length !== 0) this.user = response[0];
                    else this.disabled = true;
                    resolve(this.user);
                }
            )
        })
    } 
    
    save(){
        let checkMail = /^[a-z\d]+[\w\d.-]*@(?:[a-z\d]+[a-z\d-]+\.){1,5}[a-z]{2,6}$/i;

        this.showError = false;
        
        if(this.user.user_login === '' ||
           this.user.user_email === '' ||
           this.user.user_name === ''
          ){
            this.showError = true;
            this.textError = 'Wszystkie pola muszą być uzupełnione';
        }
        if(!checkMail.test(this.user.user_email)){
            this.showError = true;
            this.textError = 'Podaj poprawny adres email'
        }
        
        if(!this.showError){
            this.CmsService.postAuthorization(`myProfile/putLogin.php`, this.user).subscribe(
                response =>{
                    if(response.code < 0){
                        this.showError = true;
                        this.textError = response.description;
                    }
                    else{
                        this.event.showInfo('success', 'Dane zaktualizowane');
                    }
                }
            )
        }
    }
    
    savePsw(){
        this.showErrorPsw = false;
        if(this.password.new_psw !== this.password.repeat_psw){
            this.showErrorPsw = true;
            this.textErrorPsw = 'Podane nowe hasła nie są identyczne';
        }
        else{
            this.CmsService.postAuthorization(`myProfile/putPsw.php`, this.password).subscribe(
                response=>{
                    if (response.code < 0){
                        this.showErrorPsw = true;
                        this.textErrorPsw = response.description;
                    }
                    else this.event.showInfo('success', 'Hasło zostało zmienione');
                }
            )
        }
    }
}
