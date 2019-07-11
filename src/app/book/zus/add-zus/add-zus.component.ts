import { Component, OnInit, ElementRef, Input, ViewChild, Output, EventEmitter, ViewChildren, AfterViewInit, OnDestroy} from '@angular/core';
import { EventService } from '../../../event.service';
import { ApiService } from '../../../api.service';
import { ActivatedRoute, Router } from '@angular/router';

import { zus } from './zus';

@Component({
  selector: 'app-add-zus',
  templateUrl: './add-zus.component.html',
  styleUrls: ['./add-zus.component.scss']
})
export class AddZusComponent implements OnInit {

  @ViewChild('yearSelected') yearList; 
    
  actualYear; 
  year = [];  
  month;  
  actualMonth;
  actualDate;
    
  zus: zus = {
        year: '',
        month: '',
        paymentDeadline: '', 
        socialContribution: '',
        dateSocial: '',
        healthContribution: '',
        dateHealth: '',
        workContribution: '',
        dateWork: ''
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
            
            this.setDataPayment();
            this.setContribution();
        }
      )
      
  }
    
    setDataPayment(){
        let monthPeyment;
            let yearPayment = this.actualYear;
            
            switch(this.actualMonth){
                case '01': monthPeyment = '02'; break; 
                case '02': monthPeyment = '03'; break; 
                case '03': monthPeyment = '04'; break; 
                case '04': monthPeyment = '05'; break; 
                case '05': monthPeyment = '06'; break; 
                case '06': monthPeyment = '07'; break; 
                case '07': monthPeyment = '08'; break; 
                case '08': monthPeyment = '09'; break; 
                case '09': monthPeyment = '10'; break; 
                case '10': monthPeyment = '11'; break; 
                case '11': monthPeyment = '12'; break; 
                case '12': monthPeyment = '01'; yearPayment++; break; 
            }
            
            this.zus.paymentDeadline = yearPayment + '-' + monthPeyment + '-' + '10';
            this.zus.dateSocial = yearPayment + '-' + monthPeyment + '-' + '10';
            this.zus.dateHealth = yearPayment + '-' + monthPeyment + '-' + '10';
            this.zus.dateWork = yearPayment + '-' + monthPeyment + '-' + '10';
            this.zus.month = this.actualMonth;
            this.zus.year = this.actualYear;
        
            this.setContribution();
    }
    
    setContribution(){
        this.CmsService.getAuthorization(`zus/getWysokoscSkladek.php?year=${this.actualYear}&month=${this.actualMonth}`).subscribe(
            response=>{
                  this.zus.socialContribution = response.zus_sp;
                  this.zus.healthContribution = response.zus_zdr;
                  this.zus.workContribution = response.zus_fp;    
            }
        );
    }
    
    save(){
        this.CmsService.postAuthorization(`zus/post.php`, this.zus).subscribe(
            response=>{
                this.event.showInfo('success', "Składka została zapisana");
                this._route.navigate(['/panel/', {outlets: { 'panel-outlet': ['zus'] } }])
            }
        )
    }

}
