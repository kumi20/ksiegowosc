import { Component, OnInit, ElementRef, Input, ViewChild, Output, EventEmitter, ViewChildren, AfterViewInit, OnDestroy, enableProdMode} from '@angular/core';
import { EventService } from '../../event.service';
import { ApiService } from '../../api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DxDataGridModule } from 'devextreme-angular';
import CustomStore from 'devextreme/data/custom_store';

import { locale, loadMessages, formatMessage } from "devextreme/localization";
import "devextreme-intl";

import deMessages from "devextreme/localization/messages/de.json";
import ruMessages from "devextreme/localization/messages/ru.json";
import plMessages from "devextreme/localization/messages/pl.json";

if(!/localhost/.test(document.location.host)) {
    enableProdMode();
}

@Component({
  selector: 'app-company-book',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss'],
  preserveWhitespaces: true
})
export class CompanyComponentBook implements OnInit, OnDestroy{

  company;
  page;    
  onSearchCompanyServices
  date = {nip:'', name:''};
  pageSize = 10;

  

  
  constructor(private CmsService: ApiService, private event: EventService, private route: ActivatedRoute, private _route: Router) { 
    this.company = new CustomStore({
        key: "id",
        load: () => this.showCompany()
    });
  }

  ngOnInit() {
    if(localStorage.getItem('countCompanyPage')) this.pageSize = Number(localStorage.getItem('countCompanyPage'));
  }

  

  ngOnDestroy(){

  }

    showCompany(){
        return new Promise(resolve=>{
            this.CmsService.getAuthorization(`company/getList.php?nip=${this.date.nip}&name=${this.date.name}`).subscribe(
            response=>{
                this.company = response;
                resolve(this.company)
            }
        )})        
    }
    
    delete(id): Promise<boolean> {
        return new Promise(resolve=>{
            this.CmsService.delete(`company/delete.php?id=${id}`).subscribe(
                ()=>{
                    this.event.showInfo('info', 'Kontrahent został usunięty');
                    resolve(true);
                }
            )
        })
 
    }

    update(id){
        setTimeout(()=>{
            this.CmsService.postAuthorization(`company/update.php?id=${id.id}`, id).subscribe(
                ()=>{
                    this.event.showInfo('success','Zaktualizowano dane firmy')
                }
           )
        }, 0) 
    }

    pageChanged(page){
        //this._route.navigate(['/content-24',page]);
        return page;
      }

      selectionChangedHandler(event){
            console.log(event)
      }

      onClickPager(event){
        if(event.name === 'paging') localStorage.setItem('countCompanyPage', event.value);
      }
}
