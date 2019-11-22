import { Component, OnInit, ElementRef, Input, ViewChild, Output, EventEmitter, ViewChildren, AfterViewInit, OnDestroy} from '@angular/core';
import { EventService } from '../../event.service';
import { ApiService } from '../../api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-company-book',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponentBook implements OnInit, OnDestroy{

  company;
  page;    
  onSearchCompanyServices
  date = {nip:'', name:''};
    
  constructor(private CmsService: ApiService, private event: EventService, private route: ActivatedRoute, private _route: Router) { 
      this.onSearchCompanyServices = this.event.onSearchCompany.subscribe((nip)=>this.showCompany(nip));
  }

  ngOnInit() {

  }

  ngOnDestroy(){
      this.onSearchCompanyServices.unsubscribe();
  }
    
    showCompany(nip){
        this.date.nip = nip.nip;
        this.date.name = nip.name;
        this.CmsService.getAuthorization(`company/getList.php?nip=${this.date.nip}&name=${this.date.name}`).subscribe(
            response=>{
                this.company = response;
            }
        )
    }
    
    delete(id){
        this.date = {nip:'', name: ''}; 
       this.CmsService.delete(`company/delete.php?id=${id}`).subscribe(
            response=>{
                this.event.showInfo('info', 'Kontrahent został usunięty');
                this.showCompany(this.date);
            }
       )
    }

    pageChanged(page){
        //this._route.navigate(['/content-24',page]);
        return page;
      }
}
