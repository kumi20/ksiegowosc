import { Component, OnInit, ElementRef, Input, ViewChild, Output, EventEmitter, ViewChildren, AfterViewInit, OnDestroy} from '@angular/core';
import { EventService } from '../../event.service';
import { ApiService } from '../../api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-fixed-assets',
  templateUrl: './fixed-assets.component.html',
  styleUrls: ['./fixed-assets.component.scss']
})
export class FixedAssetsComponent implements OnInit {

  constructor(private CmsService: ApiService, private event: EventService, private route: ActivatedRoute, private _route: Router) {}

  fixedAssets = [];   
  page;
  pageSize = 10;
    
  ngOnInit() {
      this.getList();
      if(localStorage.getItem('countFixedPage')) this.pageSize = Number(localStorage.getItem('countFixedPage'));

  }

    
  getList(){
      return new Promise(resolve=>{
          this.CmsService.getAuthorization(`fixed-assets/get.php`).subscribe(
                response=>{
                    this.fixedAssets = response;
                    resolve(this.fixedAssets);
                }
          )
      })
  }  
    
  pageChanged(page){
      //this._route.navigate(['/content-24',page]);
      return page;
  }

  onClickPager(event){
    if(event.name === 'paging') localStorage.setItem('countFixedPage', event.value);
  }

  onSelectionChange(id){
    this._route.navigate(['/panel/', { outlets: { 'panel-outlet': ['add-fixxed-assets',id[0]]}}]);
  }
}
