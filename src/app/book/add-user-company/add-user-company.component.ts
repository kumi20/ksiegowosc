import { Component, OnInit, ElementRef, Input, ViewChild, Output, EventEmitter, ViewChildren, AfterViewInit, OnDestroy} from '@angular/core';
import { EventService } from '../../event.service';
import { ApiService } from '../../api.service';
import { ActivatedRoute, Router } from '@angular/router';

import { company } from './company';

@Component({
  selector: 'app-add-user-company',
  templateUrl: './add-user-company.component.html',
  styleUrls: ['./add-user-company.component.scss']
})
export class AddUserCompanyComponent implements OnInit {

  @Input() label;
    
  myCompany: company = {
      id: null,
      name: '',
      city: '',
      post_code: '',
      street: '',
      home_number: '',
      local_number: null,
      nip: null,
      regon: null,
      email: ''
  };   
    
    
  showError: boolean = false; 
  textError: string = '';    
    
  constructor(private CmsService: ApiService, private event: EventService, private route: ActivatedRoute, private _route: Router) { }

  ngOnInit() {
      this.getCompanyData();
      if (!this.label) this.label = 'Dodaj firmę';
  }

    save(){
        let codeReg = /[0-9]{2}-[0-9]{3}/g;
        let checkMail = /^[a-z\d]+[\w\d.-]*@(?:[a-z\d]+[a-z\d-]+\.){1,5}[a-z]{2,6}$/i;
        
        if(this.myCompany.name === '' ||
            this.myCompany.city === '' ||
            !codeReg.test(this.myCompany.post_code) ||
            this.myCompany.street === '' ||
            this.myCompany.home_number === '' ||
            this.myCompany.nip === null ||
            this.myCompany.regon === null ||
            !checkMail.test(this.myCompany.email) 
        ){
            this.showError = true;
            this.textError = 'Uzupełnij poprawnie wszystkie wymagane pola';    
        }
        else{
            this.showError = false;
            this.CmsService.postAuthorization(`myProfile/post.php`, this.myCompany).subscribe(
                response=>{
                    if(response.code < 0){
                        this.showError = true;
                        this.textError = response.description;
                    }
                    else{
                        this.event.showInfo('success', 'Dane zapisane');
                        if(this.myCompany.id === null){
                            this._route.navigate(["panel"]);
                        }
                        localStorage.setItem('companyName', this.myCompany.name);                        
                    }
                }
                
            )
        }
    }
    
    getCompanyData(){
        return new Promise(resolve=>{
            this.CmsService.getAuthorization(`myProfile/get.php`).subscribe(
                response=>{
                    if(response.length !== 0){
                        this.myCompany = response[0];
                    }                    
                    resolve(this.myCompany);
                }
            )
        })
    }
    
    
}

//bedziecie wyruszac
//angazowac sie w sprawy zawodowe
//uwazajcie na nieuczicwych ludzi
//spodziewajcie sie niespodziewanego