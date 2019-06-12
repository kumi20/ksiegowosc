import { Component, OnInit, ElementRef, Input, ViewChild, Output, EventEmitter, ViewChildren, AfterViewInit, OnDestroy} from '@angular/core';
import { EventService } from '../../event.service';
import { ApiService } from '../../api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-income-not-paid',
  templateUrl: './income-not-paid.component.html',
  styleUrls: ['./income-not-paid.component.scss']
})
export class IncomeNotPaidComponent implements OnInit {
    
  idMonth;  
  fv;   
    
  public myDatePickerOptions = {
    todayBtnTxt: "Dzisiaj",
    clearBtnTxt: "Wyczyść",
    closeBtnTxt: "Zamknij",  
    dayLabels: {su: 'Niedz.', mo: 'Pn.', tu: 'Wt.', we: 'Śr.', th: 'Czw.', fr: 'Pt.', sa: 'Sob.'},
    dayLabelsFull: {su: "Niedziela", mo: "Poniedziałek", tu: "Wtorek", we: "Środa", th: "Czwartek", fr: "Piątek", sa: "Sobota"},
    monthLabels: { 1: 'Sty', 2: 'Lut', 3: 'Mär', 4: 'Kwi', 5: 'Maj', 6: 'Cze', 7: 'Lip', 8: 'Sie', 9: 'Wrz', 10: 'Paź', 11: 'Lis', 12: 'Gru' },
    monthLabelsFull: { 1: "Styczeń", 2: "Luty", 3: "Marzec", 4: "Kwiecień", 5: "Maj", 6: "Czerwiec", 7: "Lipiec", 8: "Sierpień", 9: "Wrzesień", 10: "Październik", 11: "Listopad", 12: "Grudzień" }
    };    
    

  constructor(private CmsService: ApiService, private event: EventService, private route: ActivatedRoute, private _route: Router) { }

  ngOnInit() {
      
      this.route.params.subscribe(params => this.idMonth = parseInt(params['id']));
      
      this.idMonth = this.event.formatMonth(this.idMonth);
      
      this.showList();
  }
    
  showList(){
      this.CmsService.getAuthorization(`noPay/getListIncome.php?month=${this.idMonth}`).subscribe(
          response=>{
              this.fv = response;
          }
      )
  }    
    
  pay(id, date){
      
      this.CmsService.getAuthorization(`noPay/pay.php?date=${date}&id=${id}`).subscribe(
        response=>{
            this.showList();
        }
      )
      
  }    

}
