import { Component, OnInit, Injector, ElementRef, Input, ViewChild, Output, EventEmitter, ViewChildren, AfterViewInit, OnDestroy} from '@angular/core';
import { EventService } from '../../../event.service';
import { ApiService } from '../../../api.service';
import { ActivatedRoute, Router } from '@angular/router';

import { AddingComponent } from './adding/adding.component';

@Component({
  selector: 'app-user-password',
  templateUrl: './user-password.component.html',
  styleUrls: ['./user-password.component.scss'],
  providers:[AddingComponent]
})
export class UserPasswordComponent implements OnInit {
  
  customer_id;
  passwordList = [];
  popupVisible: Boolean = false;
  idSystem;

  constructor(private injector: Injector, private CmsService: ApiService, private event: EventService, 
    private route: ActivatedRoute, private _route: Router, public AddingComponent:AddingComponent) { 
       this.customer_id = this.injector.get('idCustomer', '');
    }

  ngOnInit() {
      this.onGetList();
  }

  onGetList(){
      this.CmsService.getAuthorization(`userPassword/getList.php?id=${this.customer_id.value}`).subscribe(response=>{
        this.passwordList = response;
      })
  }

  delete(id){
      this.CmsService.deleteAuthorization(`userPassword/delete.php?id=${id}`).subscribe(response=>{
          if(response.code === 200) this.event.showInfo('success', 'Usunięto system');
      })
  }
}
