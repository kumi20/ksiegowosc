import { Component, OnInit } from '@angular/core';
import { EventService } from '../../../event.service';
import { ApiService } from '../../../api.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  onSearchingCompanyServices;
  date = {nip:'', name:''}


  constructor(private CmsService: ApiService, private event: EventService) { }

  ngOnInit() {
     // this.event.searchingCompany(this.date);
  }

  onSearch(){
   // this.event.searchingCompany(this.date);
  }

}
