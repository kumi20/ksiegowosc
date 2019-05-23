import { Component, OnInit, ElementRef, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { ApiService } from '../../../api.service';
import { EventService } from '../../../event.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  inputs: ['idtresci','pageElement']
})
export class MenuParent implements OnInit {

  tresc;
  idtresci;
  pageElement;
  idModal;
  menu;    
    
  constructor(private CmsService: ApiService, private route: ActivatedRoute, private _route: Router, private event: EventService) { }

  ngOnInit() {
      this.event.klepsydraStart();
      this.CmsService.get(`template/menu/getParent.php?id=${this.idtresci}&node=0&parent=0`).subscribe(
        response =>{
            if(response != null) this.menu = response;
            this.event.klepsydraStop();
        },
          error=>{
              this.event.showInfo('error', 'Błąd pobierania danych');
              this.event.klepsydraStop();
          }
      )
  }

}
