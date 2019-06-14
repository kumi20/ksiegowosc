import { Component, OnInit, ElementRef, Input, ViewChild, Output, EventEmitter, ViewChildren, AfterViewInit, OnDestroy} from '@angular/core';
import { EventService } from '../../event.service';
import { ApiService } from '../../api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-navbar-panel',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private CmsService: ApiService, private event: EventService, private route: ActivatedRoute, private _route: Router) { }

  ngOnInit() {
  }

  logOUT(){
        localStorage.removeItem('ksiegaQumiToken');
        localStorage.removeItem('user_nameKsiega');
        localStorage.removeItem('companyName');
        localStorage.removeItem('companyAdres');
        localStorage.removeItem('companyCity');
        localStorage.removeItem('companyNip');
        this._route.navigateByUrl('');
  }    
}
