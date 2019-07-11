import { Component, OnInit, ElementRef, Input, ViewChild, Output, EventEmitter, ViewChildren, AfterViewInit, OnDestroy} from '@angular/core';
import { EventService } from '../../../event.service';
import { ApiService } from '../../../api.service';
import { ActivatedRoute, Router } from '@angular/router';

import { vatDeclaration } from './declaration';

@Component({
  selector: 'app-count-vat',
  templateUrl: './count-vat.component.html',
  styleUrls: ['./count-vat.component.scss']
})
export class CountVatComponent implements OnInit {
    @ViewChild('yearSelected') yearList; 
    actualYear;
    year = [];
    month;  
    actualMonth;
    actualDate;
    
    vatDeclaration: vatDeclaration = {
        'coast5': 0,
        'coast5Vat': 0,
        'cost8': 0,
        'cost8Vat': 0,
        'cost23': 0,
        'cost23Vat': 0,
        'income5': 0,
        'income8': 0,
        'income23': 0,
        'vat5': 0,
        'vat8': 0,
        'vat23': 0,
        'vatCoastAll': 0,
        'vatDue': 0,
        'vatIncomeAll': 0,
        incomeAll: 0,
        coastAll: 0,
        vatToNextMonth: 0,
    }
    
  constructor(private CmsService: ApiService, private event: EventService, private route: ActivatedRoute, private _route: Router) {this.event.youCanVisit();}

  ngOnInit() {
      this.month = this.CmsService.month;
      this.actualDate = new Date();
      this.actualYear = this.actualDate.getFullYear().toString();
      this.actualMonth = this.event.formatMonth(this.actualDate.getMonth());
      
      this.CmsService.getYear().subscribe(
        response=>{
            response.forEach(el=>{
                this.year.push({value: el.year, label:el.year})
            });
            this.yearList.updateOptionsList();
            this.actualYear = String(new Date().getFullYear());
            
        }
      )
      this.counfTax();
  }
    
    
    counfTax(){
        this.CmsService.getAuthorization(`vat/calkulateVat.php?year=${this.actualYear}&month=${this.actualMonth}`).subscribe(
            response=>{
                this.vatDeclaration = response;
            }
        )
    }
    
    save(){
        this.CmsService.postAuthorization(`vat/post.php?year=${this.actualYear}&month=${this.actualMonth}`, this.vatDeclaration).subscribe(
            response=>{
                this.event.showInfo('success', 'Deklaracja została zapisana');
                this._route.navigate(['/panel/', {outlets: { 'panel-outlet': ['vat'] } }])
            }
        )
    }

}
