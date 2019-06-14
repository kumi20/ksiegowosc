import { Injectable } from '@angular/core';
import { ToastService } from './typescripts/pro/alerts'
import { MDBSpinningPreloader } from './typescripts/pro';
import { ApiService } from './api.service';
import { ActivatedRoute, Router } from '@angular/router';


@Injectable()
export class EventService {
    
  month: Array<any> = [
      {value:'01', label: 'styczeń'},
      {value:'02', label: 'luty'},
      {value:'03', label: 'marzec'},
      {value:'04', label: 'kwiecień'},
      {value:'05', label: 'maj'},
      {value:'06', label: 'czerwiec'},
      {value:'07', label: 'lipiec'},
      {value:'08', label: 'sierpień'},
      {value:'09', label: 'wrzesień'},
      {value:'10', label: 'październik'},
      {value:'11', label: 'listopad'},
      {value:'12', label: 'grudzień'}
    ];    
    
  constructor(private toastrService: ToastService, private _route: Router) {

  }
  
    
  showInfo(typ, tresc){
    switch(typ){
        case 'info': this.toastrService.info(tresc); break;
        case 'success': this.toastrService.success(tresc); break;
        case 'error': this.toastrService.error(tresc); break;
    }
  }
    
    klepsydraStart(){
        document.getElementById('klepsydra').style.display = 'block';
    }

    klepsydraStop(){
      document.getElementById('klepsydra').style.display = 'none';
    }
    
    formatMonth(month){
      month++;
      if (month < 10) month = '0'+month;
      return month;
      }    

      formatDay(day){
          if (day < 10) day = '0'+day;
          return day;
      }
    
    
      youCanVisit(){
          setTimeout(()=>{
              if(!localStorage.getItem("companyName")){
              this._route.navigate(['/panel/', {outlets: { 'panel-outlet': ['add-user-company'] } }])
            }
          },100)
          
      }
    
}