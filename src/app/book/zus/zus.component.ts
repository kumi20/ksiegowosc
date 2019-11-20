import { Component, OnInit, ElementRef, Input, ViewChild, Output, EventEmitter, ViewChildren, AfterViewInit, OnDestroy} from '@angular/core';
import { EventService } from '../../event.service';
import { ApiService } from '../../api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-zus',
  templateUrl: './zus.component.html',
  styleUrls: ['./zus.component.scss']
})
export class ZusComponent implements OnInit {
    
  @ViewChild('yearSelected', {static: false}) yearList; 
    
  zus;
  actualYear; 
  year = [];    
    
  constructor(private CmsService: ApiService, private event: EventService, private route: ActivatedRoute, private _route: Router) {}

  ngOnInit() {
      this.CmsService.getYear().subscribe(
        response=>{
            response.forEach(el=>{
                this.year.push({value: el.year, label:el.year})
            });
            this.yearList.updateOptionsList();
            this.actualYear = String(new Date().getFullYear());
            this.showZus();
            
        }
      )
      
      
      
      
  }
    
    showZus(){
        this.CmsService.getAuthorization(`zus/get.php?year=${this.actualYear}`).subscribe(
            response=>{
                if (response != null){
                    this.zus = response;
                }
            }
           );
    }
    
    delete(id){
        this.CmsService.getAuthorization(`zus/delete.php?id=${id}`).subscribe(
            response=>{
                this.event.showInfo('info', 'Składka została usunięta');
                this.showZus();
            }
        );
    }

}
