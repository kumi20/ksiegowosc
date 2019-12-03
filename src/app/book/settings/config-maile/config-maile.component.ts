import { Component, OnInit, ElementRef, Input, ViewChild, Output, EventEmitter, ViewChildren, AfterViewInit, OnDestroy} from '@angular/core';
import { EventService } from '../../../event.service';
import { ApiService } from '../../../api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-config-maile',
  templateUrl: './config-maile.component.html',
  styleUrls: ['./config-maile.component.scss']
})
export class ConfigMaileComponent implements OnInit {

  configEmail = {id: 0, host:'', email:'', user: '', psw: '', smtpPort: ''};
  
  constructor(private CmsService: ApiService, private event: EventService, private route: ActivatedRoute, private _route: Router) { }

  ngOnInit() {
      this.onGetConfigEmail();
  }

  onGetConfigEmail(){
    return new Promise(resolve=>{
        this.CmsService.getAuthorization(`settings/getEmailConfig.php`).subscribe(response=>{
            if(response.length > 0) this.configEmail = response[0];
            resolve(this.configEmail);
        })
    })
  }

  save(){
      this.CmsService.postAuthorization(`settings/postEmailConfig.php`, this.configEmail).subscribe(response=>{
          if(response.code === 200){
              this.event.showInfo('success', "Udany zapis");
              this.onGetConfigEmail();
          }
      })
  }

}
