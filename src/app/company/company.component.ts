import { Component, OnInit, ElementRef, Input, ViewChild, Output, EventEmitter, ViewChildren, AfterViewInit, OnDestroy} from '@angular/core';
import { EventService } from '../event.service';
import { ApiService } from '../api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { company } from './company';
import { view } from './company.scenerio';

const viewControl = Object.keys(view).map(key => ({name: view[key]}));

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})


export class CompanyComponent implements OnInit {

  @Input() supplier: boolean;
  @Input() scenerio: string;
    
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
    
  admissibleScenario: boolean = false;
  disableInput: boolean = true;    
    
  constructor(private CmsService: ApiService, private event: EventService, private route: ActivatedRoute, private _route: Router) { }

  ngOnInit() {
      for(let i = 0; i < viewControl.length; i++){
         if (this.scenerio === viewControl[i].name){
            this.admissibleScenario = true;
            break;
         }
      }
      
      if(!this.admissibleScenario) this.scenerio = view.adding;
      if(this.scenerio === view.editing) this.disableInput = false;
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
                            supplier: this.supplier
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
                            supplier: this.supplier
                      };
                      this.event.showInfo('error', response.opis)
                }
            }
        )
   }
    
   save(){
       if(this.company.name != '' && this.company.name != null){
            this.CmsService.postAuthorization('company/save.php', this.company).subscribe(
                response =>{
                    if (response.kod === 0 ) this.event.showInfo('success', response.opis);
                    else this.event.showInfo('error', response.opis)
                }
           );
           
       }       
   }    
}
