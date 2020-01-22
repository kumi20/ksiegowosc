import { Component, OnInit, ElementRef, Input, ViewChild, Output, EventEmitter, ViewChildren, AfterViewInit, OnDestroy} from '@angular/core';
import { EventService } from '../../event.service';
import { ApiService } from '../../api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

  historyList = [];

  constructor(private CmsService: ApiService, private event: EventService, private route: ActivatedRoute, private _route: Router) { }

  ngOnInit() {
      this.getHistoryList();
  }

  getHistoryList(){
      this.CmsService.getAuthorization(`history/getList.php`).subscribe(response=>{
        console.log('historia', response);
        this.historyList = response;
      })
  }
}
