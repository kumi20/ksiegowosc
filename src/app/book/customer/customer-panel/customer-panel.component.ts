import { Component, OnInit, ElementRef, Input, ViewChild, Output, EventEmitter, ViewChildren, AfterViewInit, OnDestroy} from '@angular/core';
import { EventService } from '../../../event.service';
import { ApiService } from '../../../api.service';
import { ActivatedRoute, Router } from '@angular/router';

import { FileUploader } from 'ng2-file-upload';

const URL = '';

@Component({
  selector: 'app-customer-panel',
  templateUrl: './customer-panel.component.html',
  styleUrls: ['./customer-panel.component.scss']
})
export class CustomerPanelComponent implements OnInit {
  @ViewChild('selectedYear') selectedYear;    

  idCustomer;
  customerFVList = []; 
  month;
  year = [];
  actualYear;  
  countFV;
  sendMail;
    
  myDatePickerOptions = {
    todayBtnTxt: "Dzisiaj",
    clearBtnTxt: "Wyczyść",
    closeBtnTxt: "Zamknij",  
    dayLabels: {su: 'Niedz.', mo: 'Pn.', tu: 'Wt.', we: 'Śr.', th: 'Czw.', fr: 'Pt.', sa: 'Sob.'},
    dayLabelsFull: {su: "Niedziela", mo: "Poniedziałek", tu: "Wtorek", we: "Środa", th: "Czwartek", fr: "Piątek", sa: "Sobota"},
    monthLabels: { 1: 'Sty', 2: 'Lut', 3: 'Mär', 4: 'Kwi', 5: 'Maj', 6: 'Cze', 7: 'Lip', 8: 'Sie', 9: 'Wrz', 10: 'Paź', 11: 'Lis', 12: 'Gru' },
    monthLabelsFull: { 1: "Styczeń", 2: "Luty", 3: "Marzec", 4: "Kwiecień", 5: "Maj", 6: "Czerwiec", 7: "Lipiec", 8: "Sierpień", 9: "Wrzesień", 10: "Październik", 11: "Listopad", 12: "Grudzień" }
    };        
    
  public uploader:FileUploader = new FileUploader({url: URL});
  public hasBaseDropZoneOver:boolean = false;
  public hasAnotherDropZoneOver:boolean = false;
  
  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }
  
  public fileOverAnother(e:any):void {
    this.hasAnotherDropZoneOver = e;
  }   

  constructor(private CmsService: ApiService, private event: EventService, private route: ActivatedRoute, private _route: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => this.idCustomer = parseInt(params['id']));  
      
      this.month = this.event.month;
      this.onGetYear()
      .then(()=>this.onGetCustomerFV());    
      
      this.configFileUploud();
  }

  onGetCustomerFV(){
    return new Promise(resolve=>{
        this.CmsService.getAuthorization(`customer/read_customer_fv.php?id=${this.idCustomer}&year=${this.actualYear}`).subscribe(response=>{
            this.customerFVList = response.records;
            resolve(this.customerFVList);
        })
    })
  } 
 
  onGetYear(){
      return new Promise(resolve=>{
        this.CmsService.getAuthorization(`customer/read_year.php`).subscribe(response=>{
            response.records.forEach(field=>{
                this.year.push({value: Number(field.year_name), label: field.year_name})
            })
            this.selectedYear.updateOptionsList();
            this.actualYear = new Date().getFullYear().toString();
            resolve(this.year);
        })                       
      })
  }
    
  onPay(id){
      this.CmsService.putAuthorization(`customer/update_fv_pay.php?id=${id}`, id).subscribe(response=>{
          if(response.code === 200) {
              this.event.showInfo('success', 'Faktura opłacona');
              this.onGetCustomerFV();
          }
      })
  }
    
    upload(){
        for (let item of this.uploader.queue){   
            let fvName = item.file.name;
            let name = new Date().getTime() + Math.round(Math.random() * 10000000);
            item.file.name = name+'.pdf';
            let datapay = (<any>item.file).datapay;
            item.url = `${this.CmsService.uri}customer/create_fv.php?idUser=${this.idCustomer}&name=${fvName}&year=${(<any>item.file).year}&mounth=${(<any>item.file).month}&datapay=${datapay}&countFV=${this.countFV}&sendMail=${this.sendMail}`;
            item.upload();
        }
    }
    
     public configFileUploud(){
        this.uploader = new FileUploader({
            url: URL,
            authTokenHeader: 'Authorizationtoken',
            authToken: localStorage.getItem('ksiegaQumiToken'),
            autoUpload: false,
            allowedMimeType: ['application/pdf'],
        });

        this.uploader.onAfterAddingFile  = (item) => {
            item.withCredentials = false;   
        }
        
        this.uploader.onWhenAddingFileFailed = () =>{
            this.event.showInfo('error', 'Niedozwolony plik');
        }
        
        this.uploader.onCompleteAll = () =>{
            this.event.showInfo('success', 'zapisano faktury');
            this.uploader.queue.length = 0;
            this.onGetCustomerFV();
        }
     }

}
