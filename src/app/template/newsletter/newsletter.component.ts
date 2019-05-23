import { Component, OnInit, ElementRef, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { ApiService } from '../../api.service';
import { EventService } from '../../event.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-newsletter',
  templateUrl: './newsletter.component.html',
  styleUrls: ['./newsletter.component.scss'],
  inputs: ['idtresci','pageElement']
})
export class NewsletterComponent implements OnInit {

  idtresci;
  pageElement;
  email: string = ''; 
  infoVisible: boolean = false;
  info: string = '';
    
  constructor(private CmsService: ApiService, private route: ActivatedRoute, private _route: Router, private event: EventService) { }

  ngOnInit() {
  }

  save(){
     if (this.email == '') this.event.showInfo('info', 'Podaj adres email');
      else{
          this.event.klepsydraStart();
          this.CmsService.get(`template/newsletter/post.php?email=${this.email}`).subscribe(
                response=>{
                    this.event.klepsydraStop();
                    this.info = response[0].status;
                    this.infoVisible= true;
                },
                error =>{
                    this.event.klepsydraStop();
                    this.event.showInfo('error','Błąd zapisu danych');
                }
          )
      }
  }    
}
