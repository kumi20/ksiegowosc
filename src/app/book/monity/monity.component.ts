import { Component, OnInit, ElementRef, Input, ViewChild, Output, EventEmitter, ViewChildren, AfterViewInit, OnDestroy} from '@angular/core';
import { EventService } from '../../event.service';
import { ApiService } from '../../api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-monity',
  templateUrl: './monity.component.html',
  styleUrls: ['./monity.component.scss']
})
export class MonityComponent implements OnInit {

  monitList: Array<monit>;
  isShowMsg: boolean = false;
  text_msg;

  constructor(private CmsService: ApiService, private event: EventService, private route: ActivatedRoute, private _route: Router) { }

  ngOnInit() {
    this.onGetListMonit();
  }

  onGetListMonit():Promise<Array<monit>>{
    return new Promise(resolve=>{
        this.CmsService.getAuthorization(`monity/getList.php`).subscribe(response=>{
            this.monitList = response;
            resolve(this.monitList);
        })
    })
  }

  selectionChangedHandler(event){
      this.text_msg = '';
      this.isShowMsg = true;
      this.CmsService.getAuthorization(`monity/getMonit.php?id=${event[0]}`).subscribe(response=>{
         this.text_msg = response[0].text_msg;
      })
  }

  closeMsg(){
    this.text_msg = '';
    this.isShowMsg = false;
  }
}



export interface monit{
  id: string;
  customer_name: string;
  date: string;
  maile_to_send: string;
  text_msg: string;
}
