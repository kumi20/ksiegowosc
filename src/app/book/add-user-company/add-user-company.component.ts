import { Component, OnInit, ElementRef, Input, ViewChild, Output, EventEmitter, ViewChildren, AfterViewInit, OnDestroy} from '@angular/core';
import { EventService } from '../../event.service';
import { ApiService } from '../../api.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-add-user-company',
  templateUrl: './add-user-company.component.html',
  styleUrls: ['./add-user-company.component.scss']
})
export class AddUserCompanyComponent implements OnInit {

  constructor(private CmsService: ApiService, private event: EventService, private route: ActivatedRoute, private _route: Router) { }

  ngOnInit() {
  }

}
