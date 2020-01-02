import { fv } from './../../income/income';
import { Component, OnInit, OnChanges } from '@angular/core';
import { EventService } from '../../../event.service';
import { ApiService } from '../../../api.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss'],
  inputs:['id']
})
export class ServicesComponent implements OnInit, OnChanges{

  id;
  fvServicesList = [];

  constructor(private CmsService: ApiService, private event: EventService) { }

  ngOnInit() {
    this.onGetServicesFV();
  }

  ngOnChanges(){
    this.onGetServicesFV();
  }
  onGetServicesFV(){
    this.CmsService.getAuthorization(`fv/getListServices.php?id=${this.id}`).subscribe(response=>{
        this.fvServicesList = response;
    })
  }

}
