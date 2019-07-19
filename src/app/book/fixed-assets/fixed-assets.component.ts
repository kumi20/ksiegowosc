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

  constructor(private CmsService: ApiService, private event: EventService, private route: ActivatedRoute, private _route: Router) {this.event.youCanVisit();}

  fixedAssets = [];   
  page;    
    
  ngOnInit() {
      this.getList().then(
        response=>{console.log(this.fixedAssets)}
      )
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
}
