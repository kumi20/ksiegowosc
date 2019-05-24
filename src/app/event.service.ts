import { Injectable } from '@angular/core';
import { ToastService } from './typescripts/pro/alerts'
import { MDBSpinningPreloader } from './typescripts/pro';
import { ApiService } from './api.service';


@Injectable()
export class EventService {
    
  constructor(private toastrService: ToastService) {

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
    
}