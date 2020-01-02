import { Component, OnInit, Injector, ElementRef, Input, ViewChild, Output, EventEmitter, ViewChildren, AfterViewInit, OnDestroy} from '@angular/core';
import { EventService } from '../../../event.service';
import { ApiService } from '../../../api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-contact-customer-list',
  templateUrl: './contact-customer-list.component.html',
  styleUrls: ['./contact-customer-list.component.scss']
})
export class ContactCustomerListComponent implements OnInit {

  customer_id;

  contactList: Array<Contact> = [];
  popupVisible;

  constructor(private injector: Injector, private CmsService: ApiService, private event: EventService, private route: ActivatedRoute, private _route: Router) {
      this.customer_id = this.injector.get('idCustomer', '');
   }

  ngOnInit() {
      this.getContactList();
  }

  getContactList():Promise<Array<Contact>>{
      return new Promise(resolve=>{
          this.CmsService.getAuthorization(`customer/getContactList.php?idCustomer=${this.customer_id.value}`).subscribe(response=>{
              if(response.code === 200) this.contactList = response.records;
              resolve(this.contactList);
          })
      })
  }

  delete(id){
      this.CmsService.deleteAuthorization(`customer/deleteContact.php?id=${id}`).subscribe(response=>{
          if(response.code === 200) this.event.showInfo('success', 'Kontakt usunięty');
      })
  }

  closeOnOutsideClickChange(){
    this.event.searchingCompany();
  }
}

export interface Contact{
  contact_name: string,
  contact_email: string
}