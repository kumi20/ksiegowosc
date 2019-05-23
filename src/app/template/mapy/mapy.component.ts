import { Component, OnInit, ElementRef, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { ApiService } from '../../api.service';
import { EventService } from '../../event.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-mapy',
  templateUrl: './mapy.component.html',
  styleUrls: ['./mapy.component.scss'],
  inputs: ['idtresci','pageElement']
})
export class MapyComponent implements OnInit {

  idtresci;
  pageElement;
    
  markerList: any[] = [];
  public map: any = { lat: 50.40340273848367, lng: 22.30135560035683 };
    
  constructor(private CmsService: ApiService, private route: ActivatedRoute, private _route: Router, private event: EventService) { }

  ngOnInit() {
      this.event.klepsydraStart();
      this.CmsService.get(`template/mapy/getList.php?id=${this.idtresci}`).subscribe(
        response=>{
            
            if (response != null){
                response.forEach(el=>{
                    this.markerList.push({
                          lat: Number(el.map_szer),
                          lng: Number(el.map_dlug),
                          draggable: false,
                          title: '',
                          description: el.map_content
                      });
                })    
                
            }
            this.event.klepsydraStop();
        },
          error=>{
              this.event.klepsydraStop();
              this.event.showInfo('error','Błąd pobierania danych');
          }
      )
  }

}
