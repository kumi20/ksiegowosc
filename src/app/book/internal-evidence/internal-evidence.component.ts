import { Component, OnInit, ElementRef, Input, ViewChild, Output, EventEmitter, ViewChildren, AfterViewInit, OnDestroy} from '@angular/core';
import { EventService } from '../../event.service';
import { ApiService } from '../../api.service';
import { ActivatedRoute, Router } from '@angular/router';

import { internalEvidence } from './internalEvidence';

@Component({
  selector: 'app-internal-evidence',
  templateUrl: './internal-evidence.component.html',
  styleUrls: ['./internal-evidence.component.scss']
})
export class InternalEvidenceComponent implements OnInit {
   
  @ViewChild('yearSelected') yearList;   
    
  year = [];
  month;    
  actualDate;
  actualYear;
  actualMonth;  
  internalEvidence = []

  constructor(private CmsService: ApiService, private event: EventService, private route: ActivatedRoute, private _route: Router) {this.event.youCanVisit();}

  ngOnInit() {
      
      this.CmsService.getYear().subscribe(
        response=>{
            response.forEach(el=>{
                this.year.push({value: el.year, label:el.year})
            });
            this.yearList.updateOptionsList();
            this.actualYear = String(new Date().getFullYear());
        }
      )
      
      this.month = this.CmsService.month;
      this.actualDate = new Date();
      this.actualYear = this.actualDate.getFullYear().toString();
      this.actualMonth = this.event.formatMonth(this.actualDate.getMonth());
      
      
      this.showInternalEvidence();
      
      
  }
    
    showInternalEvidence(){
        this.CmsService.getAuthorization(`internal-evidence/get.php?month=${this.actualMonth}&year=${this.actualYear}`).subscribe(
            response=>{
                this.internalEvidence = response;
            }
        );
    }
    
    delete(id){
        this.CmsService.delete(`internal-evidence/delete.php?id=${id}`).subscribe(
            response =>{
                if(response.kod < 0) this.event.showInfo('error', response.description);
                this.showInternalEvidence();
            }
        )
    }
    
    addInternal(){
        this._route.navigate(['/(panel-outlet:internal-evidence-add)']);
        console.log('gggg')
    }

}
