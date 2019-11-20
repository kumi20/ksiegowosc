import { Component, OnInit, ElementRef, Input, ViewChild, Output, EventEmitter, ViewChildren, AfterViewInit, OnDestroy} from '@angular/core';
import { EventService } from '../../event.service';
import { ApiService } from '../../api.service';
import { ActivatedRoute, Router } from '@angular/router';

import { settings } from './settings';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  @ViewChild('yearList', {static: false}) yearList;
    
  vat = [
      {value: 1, label: 'Tak'},
      {value: 0, label: 'Nie'}
  ];
    
  periodVat = [
      {value: '0', label: 'Miesięczny'},
      {value: '1', label: 'Kwartalny'}
  ]   
    
  year = [];
  month;
  settings: settings = {
        smallZus: false,
        monthSmallZus: '',
        yearSmallZus: '',
        uop: false,
        monthUop: '',
        yearUop: '',
        disease: false,
        monthDisease: '',
        yearDisease: '',
        vatDeclaration: 1,
        periodVat: '0',
        indywidualZus: false
  }

  indywidualZus = [];
    
  constructor(private CmsService: ApiService, private event: EventService, private route: ActivatedRoute, private _route: Router) {}

  ngOnInit() {
      this.CmsService.getYear().toPromise()
      .then(
          res=>{
              res.forEach(el=>{
                this.year.push({value: el.year, label:el.year})
            });
            this.yearList.updateOptionsList();
          }
      )
      .then(
            res=>{
               this.getSetting().then(res=>{console.log(this.settings)})
            }
      )
      
      this.month = this.CmsService.month;      
      this.getIndywidaulZus();
  }
    
    
  getSetting(){
      return new Promise(resolve=>{
          this.CmsService.getAuthorization(`settings/get.php`).subscribe(respnse=>{       
              if (respnse.length !== 0){
                  if(respnse[0].smallZus === "1") this.settings.smallZus = true;
                  else this.settings.smallZus = false;              
                  this.settings.monthSmallZus = respnse[0].monthSmallZus;              
                  this.settings.yearSmallZus = respnse[0].yearSmallZus;

                  if(respnse[0].uop === "1") this.settings.uop = true;
                  else this.settings.uop = false;
                  this.settings.monthUop = respnse[0].monthUop;              
                  this.settings.yearUop = respnse[0].yearUop;

                  if(respnse[0].disease === "1") this.settings.disease = true;
                  else this.settings.disease = false;
                  this.settings.monthDisease = respnse[0].monthDisease;              
                  this.settings.yearDisease = respnse[0].yearDisease;

                  if(respnse[0].vatDeclaration === "1") this.settings.vatDeclaration = 1;
                  else this.settings.vatDeclaration = 0;
                  this.settings.periodVat = respnse[0].periodVat; 

                  if(respnse[0].indywidualZus === "1") this.settings.indywidualZus = true;
                  else this.settings.indywidualZus = false;
              } 
              resolve(this.settings);
          })
      })
  }
    
    save(){
        this.CmsService.postAuthorization(`settings/post.php`, this.settings).subscribe(
            response=>{
                this.event.showInfo('success', 'Zapisano dane');
            }
        )
    }

    getIndywidaulZus(){
        this.CmsService.getAuthorization(`indywidual_zus/get.php`).subscribe(response=>{
            if(response.length > 0){
                this.indywidualZus = response;
            }
        })
    }

    delete(id){
        this.CmsService.delete(`indywidual_zus/delete.php?id=${id}`).subscribe(response=>{
            if(response.kod == 0){
                this.indywidualZus = [];
                this.event.showInfo('success', 'Usunięto składki');
                this.getIndywidaulZus();
            }
        })
    }
}
