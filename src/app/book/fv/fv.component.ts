import { Component, OnInit, ElementRef, Input, ViewChild, Output, EventEmitter, ViewChildren, AfterViewInit, OnDestroy, } from '@angular/core';
import { EventService } from '../../event.service';
import { ApiService } from '../../api.service';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'app-fv',
  templateUrl: './fv.component.html',
  styleUrls: ['./fv.component.scss']
})
export class FvComponent implements OnInit, OnDestroy{

  onSearchFv
  constructor(private CmsService: ApiService, private event: EventService, private route: ActivatedRoute, private _route: Router) {
    this.onSearchFv = this.event.onSearchCompany.subscribe((number)=>this.getFv(number.number));
  }

  number = '';
  fv;
  page;
    
  ngOnInit() {
      this.getFv(this.number);
  }
    

  getFv(number){ 
      this.CmsService.getAuthorization(`fv/getList.php?number=${number}`).subscribe(
        response =>{
            this.fv = response;
        }
      )
  } 

  ngOnDestroy(){
    this.onSearchFv.unsubscribe();
  }
    
  delete(id){
      this.number = '';
      this.CmsService.delete(`fv/delete.php?id=${id}`).subscribe(
            response=>{
                this.getFv(this.number);
            }
      )
  }

    pageChanged(page){
        //this._route.navigate(['/content-24',page]);
        return page;
      }
}
