import { Component, OnInit, ElementRef, Input, ViewChild, Output, EventEmitter, ViewChildren, AfterViewInit, OnDestroy} from '@angular/core';
import { EventService } from '../../../event.service';
import { ApiService } from '../../../api.service';
import { ActivatedRoute, Router } from '@angular/router';

import { FileUploader } from 'ng2-file-upload';

import { CustomerFileListComponent } from '../customer-file-list/customer-file-list.component';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

const URL = '';

@Component({
  selector: 'app-customer-panel',
  templateUrl: './customer-panel.component.html',
  styleUrls: ['./customer-panel.component.scss'],
  inputs:['idCustomer'],
  providers: [CustomerFileListComponent]
})
export class CustomerPanelComponent implements OnInit {
  @ViewChild('selectedYear', {static: false}) selectedYear;    

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

  constructor(private CmsService: ApiService, private event: EventService, private route: ActivatedRoute, private _route: Router, private CustomerFileListComponent:CustomerFileListComponent) { }

  ngOnInit() {
    this.CmsService.getYear().toPromise()
      .then(
          res=>{
              res.forEach(el=>{
                this.year.push({value: el.year, label:el.year})
            });
            this.actualYear = String(new Date().getFullYear());
          }
      )

      
      this.month = this.CmsService.month;
      this.actualYear = new Date().getFullYear().toString();

      
      this.configFileUploud();
  }

 
  onGetYear(){
      return new Promise(resolve=>{
        this.CmsService.getYear().subscribe(
          response=>{
              response.forEach(el=>{
                  this.year.push({value: el.year, label:el.year})
              });
              this.actualYear = String(new Date().getFullYear());
              
              resolve(this.year)
          }
        )
      })
  }
    
  onPay(id){
      this.CmsService.putAuthorization(`customer/update_fv_pay.php?id=${id}`, id).subscribe(response=>{
          if(response.code === 200) {
              this.event.showInfo('success', 'Faktura opłacona');
          }
      })
  }
    
    upload(){
        for (let item of this.uploader.queue){   
            let fvName = item.file.name;
            let name = new Date().getTime() + Math.round(Math.random() * 10000000);
            item.file.name = name+'.pdf';
            let datapay = (<any>item.file).datapay;            
            datapay = new Date(datapay).getFullYear()+'-'+this.event.formatMonth(new Date(datapay).getMonth())+'-'+this.event.formatDay(new Date(datapay).getDate());
            item.url = `${this.CmsService.uri}customer/create_fv.php?idUser=${this.idCustomer.value}&name=${fvName}&year=${(<any>item.file).year}&mounth=${(<any>item.file).month}&datapay=${datapay}&countFV=${this.countFV}`;
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
            this.CustomerFileListComponent.onGetFileList();
            this.uploader.queue.length = 0;
        }
     }

}
