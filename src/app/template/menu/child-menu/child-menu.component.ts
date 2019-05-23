import { Component, OnInit, ElementRef, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { ApiService } from '../../../api.service';
import { EventService } from '../../../event.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-child-menu',
  templateUrl: './child-menu.component.html',
  styleUrls: ['./child-menu.component.scss'],
  inputs: ['parent','level','idtresci']
})
export class ChildMenuComponent implements OnInit {
  
  parent;
  level;
  submenu;
  idtresci;
    
  constructor(private CmsService: ApiService, private route: ActivatedRoute, private _route: Router, private event: EventService) { }

  ngOnInit() {
      this.event.klepsydraStart();
      this.CmsService.get(`template/menu/getParent.php?id=${this.idtresci}&node=${this.level}&parent=${this.parent}`).subscribe(
        response =>{
            if(response != null) this.submenu = response;
            this.event.klepsydraStop();
        },
          error=>{
              this.event.showInfo('error', 'Błąd pobierania danych');
              this.event.klepsydraStop();
          }
      )
  }

}
