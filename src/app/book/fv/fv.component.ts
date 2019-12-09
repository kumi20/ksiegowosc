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

  onSearchFv;
  actualDate: Date = new Date();

  constructor(private CmsService: ApiService, private event: EventService, private route: ActivatedRoute, private _route: Router) {
    this.onSearchFv = this.event.onSearchCompany.subscribe((number)=>this.getFv(number.number));
  }

  number = '';
  fv;
  page;
  pageSize = 10;
    
  ngOnInit() {
      this.getFv(this.number);
      
      if(localStorage.getItem('countFvPage')) this.pageSize = Number(localStorage.getItem('countFvPage'));
  }
    

  getFv(number){ 
      this.CmsService.getAuthorization(`fv/getList.php?number=${number}`).subscribe(
        response =>{
            this.fv = response;
            this.fv.forEach(field => {
                (field.nazwa===null)?field.nazwa=field.name:field.nazwa=field.nazwa;
            });
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
                this.event.showInfo('success', 'Usunięto fakturę');
            }
      )
  }

    pageChanged(page){
        //this._route.navigate(['/content-24',page]);
        return page;
      }

      onClickPager(event){
        if(event.name === 'paging') localStorage.setItem('countFvPage', event.value);
      }
}
