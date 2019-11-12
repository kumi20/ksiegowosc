import { Component, OnInit, ElementRef, Input, ViewChild, Output, EventEmitter, ViewChildren, AfterViewInit, OnDestroy} from '@angular/core';
import { EventService } from '../../event.service';
import { ApiService } from '../../api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-vat',
  templateUrl: './vat.component.html',
  styleUrls: ['./vat.component.scss']
})
export class VatComponent implements OnInit {
    @ViewChild('yearSelected') yearList; 
    
    actualYear;
    year = [];
    month;  
    actualMonth;
    actualDate;
    
    vatDeclaration = [];
    
  constructor(private CmsService: ApiService, private event: EventService, private route: ActivatedRoute, private _route: Router) {}

  ngOnInit() {
      
      this.month = this.CmsService.month;
      this.actualDate = new Date();
      this.actualYear = this.actualDate.getFullYear().toString();
      this.actualMonth = this.event.formatMonth(this.actualDate.getMonth());
      
      this.CmsService.getYear().subscribe(
        response=>{
            response.forEach(el=>{
                this.year.push({value: el.year, label:el.year})
            });
            this.yearList.updateOptionsList();
            this.actualYear = String(new Date().getFullYear());
            
        }
      )
      
      this.getVat()
  }
    
    
    getVat(){
        return new Promise(resolve=>{
            this.CmsService.getAuthorization(`vat/get.php?year=${this.actualYear}`).subscribe(
                response=>{
                    this.vatDeclaration = response;
                    resolve(this.vatDeclaration);
                }                
            )
        })
    }
    
    delete(id){
        this.CmsService.delete(`vat/delete.php?id=${id}`).subscribe(
            response=>{
                this.event.showInfo('info', 'Deklaracja została usunięta została usunięta');
                this.getVat();
            }
        )
    }

}
