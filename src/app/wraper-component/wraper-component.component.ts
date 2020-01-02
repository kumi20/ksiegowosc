import { Component, OnInit, ElementRef, Input, ViewChild, Output, EventEmitter, OnChanges } from '@angular/core';
import { ApiService } from '../api.service';
import { EventService } from '../event.service';
import { ActivatedRoute, Router } from '@angular/router';

import { DynamicComponentComponent } from '../dynamic-component/dynamic-component.component';

import { AddCutomerComponent } from '../book/customer/add-cutomer/add-cutomer.component';
import { AddUserCustomerComponent } from '../book/customer/add-user-customer/add-user-customer.component';
import { ContactCustomerListComponent } from '../book/customer/contact-customer-list/contact-customer-list.component';
import { CustomerFileComponent } from '../book/customer/customer-file/customer-file.component';
import { CustomerFileListComponent } from '../book/customer/customer-file-list/customer-file-list.component';

@Component({
  selector: 'app-wraper-component',
  templateUrl: './wraper-component.component.html',
  styleUrls: ['./wraper-component.component.scss'],
  inputs:['idCustomer']
})
export class WraperComponentComponent implements OnInit ,OnChanges{

  kontrolki = [];
  kontrolkiDoWyswietlenia = [];
  idCustomer;

  constructor(private ref: ElementRef, private CmsService: ApiService, private event: EventService, private route: ActivatedRoute, private _route: Router) { }

  ngOnInit() {  
        this.pobierzKontrolki(this.idCustomer);

  }

  ngOnChanges(){
    this.pobierzKontrolki(this.idCustomer);
  }

  pobierzKontrolki(idCustomer?){
        this.CmsService.getAuthorization(`customer/getContainerElement.php`).subscribe(
            response => {
                this.kontrolki = response.records;
                this.wyswietlKontrolki();
            }
        )
  
  }
  
  wyswietlKontrolki(){
      this.kontrolkiDoWyswietlenia.length = 0;
      this.kontrolki.forEach((value, index)=> {
          let k = null;
          
          switch(value.name_component){                
              case 'AddUserCustomerComponent': k = AddUserCustomerComponent; break;
              case 'ContactCustomerListComponent': k = ContactCustomerListComponent; break;
              case 'CustomerFileComponent': k = CustomerFileComponent; break;
              case 'CustomerFileListComponent': k = CustomerFileListComponent; break;
          }
  
          this.kontrolkiDoWyswietlenia[index] = {
              component: k,
              idCustomer: this.idCustomer,
          };
      }
      
    )
    
}

}
