import { Component, OnInit, ElementRef, Input, ViewChild, Output, EventEmitter, ViewChildren, AfterViewInit, OnDestroy} from '@angular/core';
import { EventService } from '../../event.service';
import { ApiService } from '../../api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-company-book',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponentBook implements OnInit {

  company;
  page;    
    
  constructor(private CmsService: ApiService, private event: EventService, private route: ActivatedRoute, private _route: Router) { }

  ngOnInit() {
      this.showCompany();
  }
    
    showCompany(){
        this.CmsService.getAuthorization(`company/getList.php`).subscribe(
            response=>{
                this.company = response;
            }
        )
    }
    
    delete(id){
       this.CmsService.delete(`company/delete.php?id=${id}`).subscribe(
            response=>{
                this.event.showInfo('info', 'Kontrahent został usunięty');
                this.showCompany();
            }
       )
    }

    pageChanged(page){
        //this._route.navigate(['/content-24',page]);
        return page;
      }
}
