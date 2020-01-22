import { Component, OnInit, ElementRef, Input, ViewChild, Output, EventEmitter, ViewChildren, AfterViewInit, OnDestroy} from '@angular/core';
import { EventService } from '../../../event.service';
import { ApiService } from '../../../api.service';
import { ActivatedRoute, Router } from '@angular/router';

import { internalEvidence } from '../internalEvidence';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
    
    @ViewChild('constructorList', {static: false}) constructorList;     

  evidence: internalEvidence = {
          data: "",
          number: "",
          description: "",
          sum: "",
          id: "",
          customerId:""
  }  
    contractor = [];
    idDocumnet;
    
  public myDatePickerOptions = {
    todayBtnTxt: "Dzisiaj",
    clearBtnTxt: "Wyczyść",
    closeBtnTxt: "Zamknij",  
    dayLabels: {su: 'Niedz.', mo: 'Pn.', tu: 'Wt.', we: 'Śr.', th: 'Czw.', fr: 'Pt.', sa: 'Sob.'},
    dayLabelsFull: {su: "Niedziela", mo: "Poniedziałek", tu: "Wtorek", we: "Środa", th: "Czwartek", fr: "Piątek", sa: "Sobota"},
    monthLabels: { 1: 'Sty', 2: 'Lut', 3: 'Mär', 4: 'Kwi', 5: 'Maj', 6: 'Cze', 7: 'Lip', 8: 'Sie', 9: 'Wrz', 10: 'Paź', 11: 'Lis', 12: 'Gru' },
    monthLabelsFull: { 1: "Styczeń", 2: "Luty", 3: "Marzec", 4: "Kwiecień", 5: "Maj", 6: "Czerwiec", 7: "Lipiec", 8: "Sierpień", 9: "Wrzesień", 10: "Październik", 11: "Listopad", 12: "Grudzień" }
    };     
    
  constructor(private CmsService: ApiService, private event: EventService, private route: ActivatedRoute, private _route: Router) {}

  ngOnInit() {
      
      this.route.params.subscribe(params => this.idDocumnet = parseInt(params['id']));
      
      this.CmsService.getAuthorization(`expenditure/getContractor.php`).subscribe(
            response =>{
                response.forEach(el=>{
                    this.contractor.push({value: el.id, label:el.name});
                })
                
                if (!isNaN(this.idDocumnet)){
                  this.CmsService.getAuthorization(`internal-evidence/getOne.php?id=${this.idDocumnet}`).subscribe(
                        response=>{
                            this.evidence.data = response[0].data;
                            this.evidence.number = response[0].number;
                            this.evidence.description = response[0].description;
                            this.evidence.sum = response[0].sum;
                            this.evidence.id = response[0].id;
                            this.evidence.customerId = response[0].customerId;
                        }
                  );
              }
            }    
      );
      
  }
    
    save(){
        this.evidence.sum = this.evidence.sum.replace(',','.');
        this.evidence.data = new Date(this.evidence.data).getFullYear()+'-'+this.event.formatMonth(new Date(this.evidence.data).getMonth())+'-'+this.event.formatDay(new Date(this.evidence.data).getDate());
        if (!isNaN(this.idDocumnet)){
            this.CmsService.postAuthorization(`internal-evidence/put.php`, this.evidence).subscribe(
                response =>{
                    this.event.showInfo('success', "Zapisano dowód");
                    this._route.navigate(['/panel/', { outlets: { 'panel-outlet': ['internal-evidence']}}]);
                }
            )
        }
        else{
            
            this.CmsService.postAuthorization(`internal-evidence/save.php`, this.evidence).subscribe(
                response =>{
                    this.event.showInfo('success', "Zapisano dowód");
                    this._route.navigate(['/panel/', { outlets: { 'panel-outlet': ['internal-evidence']}}]);
                }
            )
        }
        
    }

}
