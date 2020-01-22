import { Component, OnInit, ElementRef, Input, ViewChild, Output, EventEmitter, ViewChildren, AfterViewInit, OnDestroy} from '@angular/core';
import { EventService } from '../../event.service';
import { ApiService } from '../../api.service';
import { ActivatedRoute, Router } from '@angular/router';

import { invoice, company, fv } from './income';
import DataSource from "devextreme/data/data_source";

 const currentDate = new Date();
    
    
@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.scss']
})
export class IncomeComponent implements OnInit {
    
  @ViewChild('constructorList', {static: false}) constructorList;    

  invoice: invoice = {number: 1+'/'+currentDate.getFullYear(), documentData:'', dataSales:'', customerId:0,servicesList:[], 
            toPay:0, toPayNetto:0, vat50: false, dataToPay:'', boolPay: false, description:''};  
  company: company = {name:'', street: '',city: '', nip: ''};
  constractorSelected: company = {name:'', street:'', city:'', nip:''};    
  contractor = [];    
  contractorList; 
  suma = []; //suma netto z podziałem na stawki vat   
    
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
    
  currencyFormat = "PLN #.##";   

  editableProducts = new DataSource({
    store: []});
    
  constructor(private CmsService: ApiService, private event: EventService, private route: ActivatedRoute, private _route: Router) {}

  ngOnInit() {  
        this.company.name = localStorage.getItem('companyName');
        this.company.street = localStorage.getItem('companyAdres');
        this.company.city = localStorage.getItem('companyCity');
        this.company.nip = localStorage.getItem('companyNip');
      
        this.getListServices();
        let services = {name:'', jm: '', count: 0 ,netto:'0.00' ,countNetto:0.00, vat:'23', countVat:0.00,brutto:0.00}; 
        this.invoice.servicesList.push(services);
      
       this.CmsService.getAuthorization(`income/getNumberInvoice.php`).subscribe(
            response=>{
                if (response != null){
                    let number = Number(response.number) + 1;
                    this.invoice.number = number + '/' + currentDate.getFullYear();     
                }
            }
       );
      
      this.CmsService.getAuthorization(`income/getContractor.php`).subscribe(
            response =>{
                this.contractorList = response;
                response.forEach(el=>{
                    this.contractor.push({value: el.id, label:el.name});
                })
                //this.constructorList.updateOptionsList();
            }    
      );
      
  }

    changeConstructor(event){
        this.contractorList.forEach(el=>{
            if (el.id === event.selectedItem.value ){
                let street = (el.local_number !='')?'/'+el.local_number: '';
                this.constractorSelected = {name: el.name, street: el.street + ' ' + el.home_number + street, city: el.post_code + ' ' + el.city, nip:el.nip};
            }    
        })
    }

    save(){      
        if (this.invoice.customerId === "undefined" ||
            this.invoice.customerId === "" ||
            this.invoice.customerId === null ||
            this.invoice.dataSales === "" ||
            this.invoice.dataToPay === "" ||
            this.invoice.documentData === "" ||
            this.invoice.toPay === 0 
           ) this.event.showInfo('error', 'Uzupełnij wszystkie wymagane pola');
        else{
            this.invoice.documentData = new Date(this.invoice.documentData).getFullYear()+'-'+this.event.formatMonth(new Date(this.invoice.documentData).getMonth())+'-'+this.event.formatDay(new Date(this.invoice.documentData).getDate());
            this.invoice.dataSales = new Date(this.invoice.dataSales).getFullYear()+'-'+this.event.formatMonth(new Date(this.invoice.dataSales).getMonth())+'-'+this.event.formatDay(new Date(this.invoice.dataSales).getDate());
            this.invoice.dataToPay = new Date(this.invoice.dataToPay).getFullYear()+'-'+this.event.formatMonth(new Date(this.invoice.dataToPay).getMonth())+'-'+this.event.formatDay(new Date(this.invoice.dataToPay).getDate());
            this.invoice.dataPay = new Date(this.invoice.dataPay).getFullYear()+'-'+this.event.formatMonth(new Date(this.invoice.dataPay).getMonth())+'-'+this.event.formatDay(new Date(this.invoice.dataPay).getDate());
            this.CmsService.postAuthorization(`income/postFV.php`, this.invoice).subscribe(
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
    
    changeNumber(i){
        let vat = 0;
        if(!isNaN(this.invoice.servicesList[i].vat)) vat = this.invoice.servicesList[i].vat;
        this.invoice.servicesList[i].netto = this.invoice.servicesList[i].netto.replace(',','.');
        this.invoice.servicesList[i].countNetto = this.invoice.servicesList[i].netto * this.invoice.servicesList[i].count;
        this.invoice.servicesList[i].countVat = (this.invoice.servicesList[i].countNetto * vat)/100;
        this.invoice.servicesList[i].brutto = this.invoice.servicesList[i].countNetto + this.invoice.servicesList[i].countVat;
        this.sumVatServices();
    }
    
    addServices(){
        let services = {name:'', jm: '', count: 0 ,netto:'0.00' ,countNetto:0.00, vat:'23', countVat:0.00,brutto:0.00}; 
        this.invoice.servicesList.push(services);
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
        
        this.invoice.servicesList.forEach(el=>{
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
        
        this.invoice.toPay = 0;
        this.invoice.toPayNetto = 0;
        this.suma.forEach(el=>{
            this.invoice.toPay += (el.count + el.vatCount);
            this.invoice.toPayNetto += el.count;
        })
    }
    
    deleted(i){
        this.invoice.servicesList.splice(i, 1);
        this.sumVatServices();
    }

    onCustomItemCreating(event, i){

        event.customItem = { value: event.text, label: event.text };
        // Adds the entry to the data source
        this.editableProducts.store().insert(event.customItem);
        // Reloads the data source
        this.editableProducts.reload();
        
        this.CmsService.postAuthorization(`services/create.php`, JSON.stringify(event.text)).subscribe(()=>{});

    }


    getListServices(){
        this.CmsService.getAuthorization(`services/getList.php`).subscribe(response=>{
            response.forEach(field => {
                 field.customItem = { value: field.name, label: field.name };
                 this.editableProducts.store().insert(field.customItem);
                 this.editableProducts.reload();
            });
        })
    }
}
