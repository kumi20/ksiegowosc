import { Component, OnInit, ElementRef, Input, ViewChild, Output, EventEmitter, ViewChildren, AfterViewInit, OnDestroy} from '@angular/core';
import { EventService } from '../../event.service';
import { ApiService } from '../../api.service';
import { ActivatedRoute, Router } from '@angular/router';

import { invoice, company, fv } from '../income/income';


@Component({
  selector: 'app-expenditure',
  templateUrl: './expenditure.component.html',
  styleUrls: ['./expenditure.component.scss']
})
export class ExpenditureComponent implements OnInit {

  @ViewChild('constructorList') constructorList;     
  expenditure: invoice = {number: '', documentData:'', dataSales:'', customerId:0,servicesList:[], toPay:0, toPayNetto:0, vat50: false, dataToPay:'', boolPay: false, description:'', cost75: false};  
  company: company = {name:'', street: '',city: '', nip: ''};    
    
  public myDatePickerOptions = {
    todayBtnTxt: "Dzisiaj",
    clearBtnTxt: "Wyczyść",
    closeBtnTxt: "Zamknij",  
    dayLabels: {su: 'Niedz.', mo: 'Pn.', tu: 'Wt.', we: 'Śr.', th: 'Czw.', fr: 'Pt.', sa: 'Sob.'},
    dayLabelsFull: {su: "Niedziela", mo: "Poniedziałek", tu: "Wtorek", we: "Środa", th: "Czwartek", fr: "Piątek", sa: "Sobota"},
    monthLabels: { 1: 'Sty', 2: 'Lut', 3: 'Mär', 4: 'Kwi', 5: 'Maj', 6: 'Cze', 7: 'Lip', 8: 'Sie', 9: 'Wrz', 10: 'Paź', 11: 'Lis', 12: 'Gru' },
    monthLabelsFull: { 1: "Styczeń", 2: "Luty", 3: "Marzec", 4: "Kwiecień", 5: "Maj", 6: "Czerwiec", 7: "Lipiec", 8: "Sierpień", 9: "Wrzesień", 10: "Październik", 11: "Listopad", 12: "Grudzień" }
    };    
    
    
  vat = [
      {value: '0', label: '0%'},
      {value: '23', label: '23%'},
      {value: '5', label: '5%'},
      {value: '8', label: '8%'},
      {value: 'zw', label: 'zw'},
      {value: 'np', label: 'np'},
  ];
    
  jm = [
      {value: 'szt.', label: 'szt.'},
      {value: 'kg', label: 'kg'},
      {value: 'tona', label: 'tona'},
      {value: 'm', label: 'm'},
      {value: 'm2', label: 'm2'},
      {value: 'm3', label: 'm3'},
      {value: 'mb', label: 'mb'},
      {value: 'km', label: 'km'},
      {value: 'opak', label: 'opak'},
      {value: 'kpl', label: 'kpl'},
      {value: 'godz.', label: 'godz.'},
      {value: 'min.', label: 'min.'},
      {value: 'litr.', label: 'litr.'},
      {value: 'usługa', label: 'usługa'},
  ];       
    
  constractorSelected: company = {name:'', street:'', city:'', nip:''};    
  contractor = [];    
  contractorList; 
    
  suma = []; //suma netto z podziałem na stawki vat       
    
  constructor(private CmsService: ApiService, private event: EventService, private route: ActivatedRoute, private _route: Router) {}

  ngOnInit() {
      this.company.name = localStorage.getItem('companyName');
      this.company.street = localStorage.getItem('companyAdres');
      this.company.city = localStorage.getItem('companyCity');
      this.company.nip = localStorage.getItem('companyNip');
      
      this.CmsService.getAuthorization(`expenditure/getContractor.php`).subscribe(
            response =>{
                this.contractorList = response;
                response.forEach(el=>{
                    this.contractor.push({value: el.id, label:el.name});
                })
                this.constructorList.updateOptionsList();
            }    
      );
      
      let services = {name:'', jm: '', count: 0 ,netto:'0.00' ,countNetto:0.00, vat:'23', countVat:0.00,brutto:0.00}; 
      this.expenditure.servicesList.push(services);
      
  }
    
    
    changeConstructor(event){
        this.contractorList.forEach(el=>{
            if (el.id === event.value ){
                let street = (el.local_number !='')?'/'+el.local_number: '';
                this.constractorSelected = {name: el.name, street: el.street + ' ' + el.home_number + street, city: el.post_code + ' ' + el.city, nip:el.nip};
            }    
        })
    }
    
    addServices(){
        let services = {name:'', jm: '', count: 0 ,netto:'0.00' ,countNetto:0.00, vat:'23', countVat:0.00,brutto:0.00}; 
        this.expenditure.servicesList.push(services);
    }

    deleted(i){
        this.expenditure.servicesList.splice(i, 1);
        this.sumVatServices();
    }
    
    changeNumber(i){
        let vat = 0;
        if(!isNaN(this.expenditure.servicesList[i].vat)) vat = this.expenditure.servicesList[i].vat;
        this.expenditure.servicesList[i].netto = this.expenditure.servicesList[i].netto.replace(',','.');
        this.expenditure.servicesList[i].countNetto = this.Round(this.expenditure.servicesList[i].netto * this.expenditure.servicesList[i].count, 2);
        this.expenditure.servicesList[i].countVat = this.Round((this.expenditure.servicesList[i].countNetto * vat)/100,2);
        this.expenditure.servicesList[i].brutto = this.Round(this.expenditure.servicesList[i].countNetto + this.expenditure.servicesList[i].countVat,2);
        this.sumVatServices();
    }
    
    inputVat(i){
        this.expenditure.servicesList[i].countVat = Number(this.expenditure.servicesList[i].countVat);
        this.expenditure.servicesList[i].brutto = this.Round(this.expenditure.servicesList[i].countNetto + this.expenditure.servicesList[i].countVat,2);
        this.sumVatServices();
        
    }
    
    sumVatServices(){
        let vat0 = 0;
        let vat23 = 0;
        let vat5 = 0;
        let vat8 = 0;
        let vatZw = 0;
        let vatNp = 0;
        
        let netto0 = 0;
        let netto23 = 0;
        let netto5 = 0;
        let netto8 = 0;
        let nettoZw = 0;
        let nettoNp = 0;
        
        this.expenditure.servicesList.forEach(el=>{
            switch (el.vat){
                case '0': vat0 += el.countVat;
                          netto0 += el.countNetto;    
                        break;
                case '23': vat23 += el.countVat;
                          netto23 += el.countNetto;
                        break;
                case '5': vat5 += el.countVat;
                          netto5 += el.countNetto;
                        break;
                case '8': vat8 += el.countVat;
                          netto8 += el.countNetto;
                        break;
                case 'zw': vatZw += el.countVat;
                          nettoZw += el.countNetto;
                        break;
                case 'np': vatNp += el.countVat;
                          nettoNp += el.countNetto;
                        break;
            }
        });
        
        this.suma.length = 0;
        
        if(netto0 != 0){            
            this.suma.push({vat: '0', count: netto0, vatCount: vat0});
        }
        
        if(netto23 != 0){
            this.suma.push({vat: '23', count: netto23, vatCount: vat23});
        }
        
        if(netto5 != 0){
            this.suma.push({vat: '5', count: netto5, vatCount: vat5});
        }
        
        if(netto8 != 0){
            this.suma.push({vat: '8', count: netto8, vatCount: vat8});
        }
        
        if(nettoZw != 0){
            this.suma.push({vat: 'zw', count: nettoZw, vatCount: vatZw});
        }
        
        if(nettoNp != 0){
            this.suma.push({vat: 'np', count: nettoNp, vatCount: vatNp});
        }
        
        this.expenditure.toPay = 0;
        this.expenditure.toPayNetto = 0;
        this.suma.forEach(el=>{
            this.expenditure.toPay += (el.count + el.vatCount);
            this.expenditure.toPayNetto += el.count;
        })
    }
    
    save(){      
        if (this.expenditure.customerId === "undefined" ||
            this.expenditure.number === ""||
            this.expenditure.customerId === "" ||
            this.expenditure.customerId === null ||
            this.expenditure.dataSales === "" ||
            this.expenditure.dataToPay === "" ||
            this.expenditure.documentData === "" ||
            this.expenditure.toPay === 0 
           ) this.event.showInfo('error', 'Uzupełnij wszystkie wymagane pola');
        else{
            this.CmsService.postAuthorization(`expenditure/postFV.php`, this.expenditure).subscribe(
                response =>{
                    if (response.kod != "0") this.event.showInfo('error', response.description);
                    else{
                        this.event.showInfo('success', 'Faktura zapisana');
                        this._route.navigate(["panel"]);
                    }
                }
            )
        }
    }
    
    Round(n, k)
    {
        var factor = Math.pow(10, k);
        return Math.round(n*factor)/factor;
    }
}
