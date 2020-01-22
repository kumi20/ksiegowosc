import { Component, OnInit, ElementRef, Input, ViewChild, Output, EventEmitter, ViewChildren, AfterViewInit, OnDestroy} from '@angular/core';
import { EventService } from '../../event.service';
import { ApiService } from '../../api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-km',
  templateUrl: './km.component.html',
  styleUrls: ['./km.component.scss']
})
export class KmComponent implements OnInit {

  kmList = [];
  popupVisible: Boolean = false;

  constructor(private CmsService: ApiService, private event: EventService, private route: ActivatedRoute, private _route: Router) { }

  ngOnInit() {
      this.onGetKmList();
  }

  onGetKmList(){
      this.CmsService.getAuthorization(`kilometrowka/getList.php`).subscribe(response=>{
        this.kmList = response;
      })
  }

  delete(id){
    this.CmsService.deleteAuthorization(`kilometrowka/delete.php?id=${id}`).subscribe(response=>{
        if(response.code === 200) this.event.showInfo('success', 'Usunięto wyjazd');
    })
  }

}
