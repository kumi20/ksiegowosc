import { Injectable, Output, EventEmitter} from '@angular/core';
import { ToastService } from './typescripts/pro/alerts'
import { Router } from '@angular/router';


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
    
  @Output()	onSearchCompany: EventEmitter<any> = new EventEmitter<any>();
    
  constructor(private toastrService: ToastService, private _route: Router) {

  }
  
  public searchingCompany(nip){
		this.onSearchCompany.emit(nip);
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

      onControlValueChanged(from, formErrors, validationMsg){
        const form = from;
    
        for(let field in formErrors){
            formErrors[field] = '';
            let control = form.get(field);
            
            const validationMessages = validationMsg[field];
            for(const key in control.errors){
              formErrors[field] += validationMessages[key] + ' ';
            }
        }
    }
    
}