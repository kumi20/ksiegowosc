import { Component, OnInit, ElementRef, Input, ViewChild, Output, EventEmitter, ViewChildren, AfterViewInit, OnDestroy} from '@angular/core';
import { EventService } from '../../../event.service';
import { ApiService } from '../../../api.service';
import { ActivatedRoute, Router } from '@angular/router';

import { company } from './company';


@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.scss']
})
export class AddCompanyComponent implements OnInit {

  company: company = {
        city: '',
        home_number: '',
        local_number: '',
        name: '',
        nip: '',
        post_code: '',
        street: '',
        supplier: true
      
  };  
    
  supiler;    
    
  admissibleScenario: boolean = false;
  disableInput: boolean = true; 
  idCompany;    
    
  constructor(private CmsService: ApiService, private event: EventService, private route: ActivatedRoute, private _route: Router) {this.event.youCanVisit();}

  ngOnInit() {
      this.route.params.subscribe(params => this.supiler = parseInt(params['id']));
      this.route.params.subscribe(params => this.idCompany = parseInt(params['company']));
      
      if(this.idCompany){
          this.disableInput = false;
          this.CmsService.getAuthorization(`company/get.php?id=${this.idCompany}`).subscribe(
                response=>{
                    this.company.city = response[0].city;
                    this.company.home_number = response[0].home_number;
                    this.company.local_number = response[0].local_number;
                    this.company.name = response[0].name;
                    this.company.nip = response[0].nip;
                    this.company.post_code = response[0].post_code;
                    this.company.street = response[0].street;
                }
          )
      }
  }
    
  onEnterNip(event){
        this.CmsService.post('company/getCompany.php', event.target.value).subscribe(
            response=>{
                if (response.kod === '0'){
                    let post_code = response.post_code.substr(0, 2)+'-'+response.post_code.substr(2, 5);
                    this.company = {
                            city: response.city,
                            home_number: response.home_number,
                            local_number: response.local_number,
                            name: response.name,
                            nip: response.nip,
                            post_code: post_code,
                            street: response.street,
                            supplier: this.supiler
                      };
                }
                else{
                    this.company = {
                            city: '',
                            home_number: '',
                            local_number: '',
                            name: '',
                            nip: this.company.nip,
                            post_code: '',
                            street: '',
                            supplier: this.supiler
                      };
                      this.event.showInfo('error', response.opis)
                }
            }
        )
   }
    
   save(){
       if(this.idCompany){
           this.CmsService.postAuthorization(`company/update.php?id=${this.idCompany}`, this.company).subscribe(
                response=>{
                    this._route.navigate(['/panel/', {outlets: { 'panel-outlet': ['company'] } }])
                }
           )
       }
       else{
            if(this.company.name != '' && this.company.name != null){
            this.CmsService.postAuthorization('company/save.php', this.company).subscribe(
                response =>{
                    if (response.kod === 0 ){
                        this._route.navigate(['/panel/', {outlets: { 'panel-outlet': ['company'] } }]);
                        this.event.showInfo('success', response.opis);
                    } 
                    else this.event.showInfo('error', response.opis)
                }
           );
           
       }    
       }      
   }    

}
