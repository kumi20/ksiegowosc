import { Component, OnInit, ElementRef, Input, ViewChild, Output, EventEmitter, ViewChildren, AfterViewInit, OnDestroy} from '@angular/core';
import { EventService } from '../../event.service';
import { ApiService } from '../../api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {

  @Output() onClosemodat = new EventEmitter<boolean>();

  customerList = [];
  page;
  idCustomer: number = 0;
  popupVisible = false;

  constructor(private CmsService: ApiService, private event: EventService, private route: ActivatedRoute, private _route: Router,
  ) { }

  ngOnInit() {
    this.onGetListCustomer();
  }

  onGetListCustomer(){
    return new Promise(resolve=>{
        this.CmsService.getAuthorization(`customer/read.php`).subscribe(response=>{
            this.customerList = response.records;
            resolve(this.customerList);
        })
    })
}  

closeOnOutsideClickChange(){
    this.event.searchingCompany();
}

onSelectionChange(id){
  this.idCustomer = id[0];
  //this._route.navigate(['/panel/', { outlets: { 'panel-outlet': ['customer',id[0]]}}]);
}

}
