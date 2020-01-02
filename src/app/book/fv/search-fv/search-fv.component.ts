import { Component, OnInit } from '@angular/core';
import { EventService } from '../../../event.service';
import { ApiService } from '../../../api.service';

@Component({
  selector: 'app-search-fv',
  templateUrl: './search-fv.component.html',
  styleUrls: ['./search-fv.component.scss']
})
export class SearchFvComponent implements OnInit {

  date = {number:''}

  constructor(private CmsService: ApiService, private event: EventService) { }

  ngOnInit() {
  }

  onSearch(){
    //this.event.searchingCompany(this.date);
  }
}
