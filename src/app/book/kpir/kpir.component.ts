import { Component, OnInit, ElementRef, Input, ViewChild, Output, EventEmitter, ViewChildren, AfterViewInit, OnDestroy} from '@angular/core';
import { EventService } from '../../event.service';
import { ApiService } from '../../api.service';
import { ActivatedRoute, Router } from '@angular/router';

import { statistic } from './kpir';

@Component({
  selector: 'app-kpir',
  templateUrl: './kpir.component.html',
  styleUrls: ['./kpir.component.scss']
})
export class KpirComponent implements OnInit {

  @ViewChild('yearSelected') yearList;
    
  kpir;
  year = [];
  month;    
  actualDate;
  actualYear;
  actualMonth;  
    
  statistic: statistic = {
      przychod_miesiac: '',
      przychod_rok: '',
      wydatki_miesiac: '',
      wydatki_rok:'',
      dochod_miesiac:'',
      dochod_rok:''
  }    
    
  constructor(private CmsService: ApiService, private event: EventService, private route: ActivatedRoute, private _route: Router) { }

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
    
      this.showKPiR();
  }

    
    showKPiR(){
        this.CmsService.getAuthorization(`kpir/getKpir.php?month=${this.actualMonth}&year=${this.actualYear}`).subscribe(
            response =>{
                this.kpir = response;
            },
            error=>{
                this.event.showInfo('error','Błąd pobierania danych');
            }
        );
        
        
        this.CmsService.getAuthorization(`kpir/statystyka.php?month=${this.actualMonth}&year=${this.actualYear}`).subscribe(
            response =>{
                this.statistic = response;
            },
            error =>{
                this.event.showInfo('error','Błąd pobierania danych');
            }
        )
    }
    
    delete(id){
        this.CmsService.delete(`kpir/delete.php?id=${id}`).subscribe(
            response =>{
                if(response.kod < 0) this.event.showInfo('error', response.description);
                this.showKPiR();
            }
        )
    }
}
