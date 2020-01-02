import { Component, OnInit, Injector, ElementRef, Input, ViewChild, Output, EventEmitter, ViewChildren, AfterViewInit, OnDestroy} from '@angular/core';
import { EventService } from '../../../event.service';
import { ApiService } from '../../../api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-customer-file-list',
  templateUrl: './customer-file-list.component.html',
  styleUrls: ['./customer-file-list.component.scss']
})
export class CustomerFileListComponent implements OnInit {

  customer_id;

  customerFileList = [];

  constructor(private injector: Injector, private CmsService: ApiService, private event: EventService, 
    private route: ActivatedRoute, private _route: Router) { 
       this.customer_id = this.injector.get('idCustomer', '');
    }

  ngOnInit() {
      this.onGetFileList();
  }

  onGetFileList(){
    this.CmsService.getAuthorization(`customer/read_customer_fv.php?id=${this.customer_id.value}`).subscribe(response=>{
        this.customerFileList = response.records;
    })
  }
}
