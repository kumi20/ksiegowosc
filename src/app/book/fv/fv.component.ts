import { Component, OnInit, ElementRef, Input, ViewChild, Output, EventEmitter, ViewChildren, AfterViewInit, OnDestroy, } from '@angular/core';
import { EventService } from '../../event.service';
import { ApiService } from '../../api.service';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'app-fv',
  templateUrl: './fv.component.html',
  styleUrls: ['./fv.component.scss']
})
export class FvComponent implements OnInit {

  constructor(private CmsService: ApiService, private event: EventService, private route: ActivatedRoute, private _route: Router) {this.event.youCanVisit();}

  fv;
  page;
    
  ngOnInit() {
      this.getFv();
  }
    

  getFv(){
      
      
      
      this.CmsService.getAuthorization(`fv/getList.php`).subscribe(
        response =>{
            this.fv = response;
        }
      )
  } 
    
  delete(id){
      this.CmsService.delete(`fv/delete.php?id=${id}`).subscribe(
            response=>{
                this.getFv();
            }
      )
  }

    pageChanged(page){
        //this._route.navigate(['/content-24',page]);
        return page;
      }
}
