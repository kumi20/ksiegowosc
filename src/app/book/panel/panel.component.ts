import { Component, OnInit, ElementRef, Input, ViewChild, Output, EventEmitter, ViewChildren, AfterViewInit, OnDestroy} from '@angular/core';
import { EventService } from '../../event.service';
import { ApiService } from '../../api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit {

  companyNeme: string = '';
    
  constructor(private CmsService: ApiService, private event: EventService, private route: ActivatedRoute, private _route: Router) { }

  ngOnInit() {
      
      this.CmsService.getAuthorization('getCompanyDate.php').subscribe(
            response =>{
                if (response.kod === 0){
                    this.companyNeme = response.name;
                    localStorage.setItem('companyName', response.name);
                    localStorage.setItem('companyAdres', response.adres);
                    localStorage.setItem('companyCity', response.city);
                    localStorage.setItem('companyNip', response.nip);
                }
                else if (response.kod === -1) this.event.showInfo('error', response.description)
            }
        )
  }

}
