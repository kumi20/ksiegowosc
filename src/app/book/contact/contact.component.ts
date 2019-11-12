import { Component, OnInit, ElementRef, Input, ViewChild, Output, EventEmitter, ViewChildren, AfterViewInit, OnDestroy} from '@angular/core';
import { EventService } from '../../event.service';
import { ApiService } from '../../api.service';
import { ActivatedRoute, Router } from '@angular/router';

import { mail } from './contact';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
    
  email: mail = {subject:'', message:'', email: ''};
  showError: boolean = false;

  constructor(private CmsService: ApiService, private event: EventService, private route: ActivatedRoute, private _route: Router) {}

  ngOnInit() {
  }

  save(){
      let checkMail = /^[a-z\d]+[\w\d.-]*@(?:[a-z\d]+[a-z\d-]+\.){1,5}[a-z]{2,6}$/i;
      
      if(this.email.subject === '' || this.email.message === '' || !checkMail.test(this.email.email)){
          this.showError = true;
      }
      else{
          this.showError = false;
          this.CmsService.postAuthorization(`contact/send.php`, this.email).subscribe(
            response=>{
                this.event.showInfo('success', 'Wiadomość wysłana');
                this.email.subject = '';
                this.email.message = '';
                this.email.email = ''
            }
          )
      }
      
  }    
}
