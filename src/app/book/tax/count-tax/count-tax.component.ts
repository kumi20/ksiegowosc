import { Component, OnInit, ElementRef, Input, ViewChild, Output, EventEmitter, ViewChildren, AfterViewInit, OnDestroy} from '@angular/core';
import { EventService } from '../../../event.service';
import { ApiService } from '../../../api.service';
import { ActivatedRoute, Router } from '@angular/router';

import { tax } from './tax';

@Component({
  selector: 'app-count-tax',
  templateUrl: './count-tax.component.html',
  styleUrls: ['./count-tax.component.scss']
})
export class CountTaxComponent implements OnInit {
    
  @ViewChild('yearSelected', {static: false}) yearList; 
    
  actualYear; 
  year = [];  
  month;  
  actualMonth;
  actualDate; 
    
  tax: tax = {
      year: '',
      month: '',
      social: '',
      health: '',
      income: '',
      cost: '',
      tax: '',
      advance: '',
  }   
    
  showTax: boolean = false;    

  constructor(private CmsService: ApiService, private event: EventService, private route: ActivatedRoute, private _route: Router) {}

  ngOnInit() {
      this.month = this.CmsService.month;
      this.actualDate = new Date();
      this.actualYear = this.actualDate.getFullYear().toString();
      this.actualMonth = String(this.event.formatMonth(this.actualDate.getMonth()));
      
      this.CmsService.getYear().subscribe(
        response=>{
            response.forEach(el=>{
                this.year.push({value: el.year, label:el.year})
            });
            this.actualYear = String(new Date().getFullYear()); 
        }
      )
  }
    
    
    countTax(){
        this.CmsService.getAuthorization(`tax/calculateTax.php?year=${this.actualYear}&month=${this.actualMonth}`).subscribe(
            response =>{
                this.showTax = true;
                this.tax.year = response.rok;
                this.tax.month = response.miesiac;
                this.tax.social = response.spoleczne;
                this.tax.health = response.zdrowotne;
                this.tax.income = response.przychod;
                this.tax.cost = response.koszt;
                this.tax.tax = response.podatek;
                this.tax.advance = response.zaliczka;
            }
        )
    }
    
    save(){
        this.CmsService.postAuthorization(`tax/postTax.php`, this.tax).subscribe(
            response=>{
                this.event.showInfo('success', 'Zaliczka na podatek została dodana');
                this._route.navigate(['/panel/', {outlets: { 'panel-outlet': ['tax'] } }])
            }
        )
    }

}
