import { Component, OnInit, ElementRef, Input, ViewChild, Output, EventEmitter, ViewChildren, AfterViewInit, OnDestroy} from '@angular/core';
import { EventService } from '../../event.service';
import { ApiService } from '../../api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-tax',
  templateUrl: './tax.component.html',
  styleUrls: ['./tax.component.scss']
})
export class TaxComponent implements OnInit {
    
  @ViewChild('yearSelected', {static: false}) yearList; 
    
  actualYear; 
  year = []; 
  tax;    
    
  constructor(private CmsService: ApiService, private event: EventService, private route: ActivatedRoute, private _route: Router) {}

  ngOnInit() {
      
      this.CmsService.getYear().subscribe(
        response=>{
            response.forEach(el=>{
                this.year.push({value: el.year, label:el.year})
            });
            this.actualYear = String(new Date().getFullYear());
            
            this.getTax();
        }
      )
  }
    
    
  getTax(){
      this.CmsService.getAuthorization(`tax/getList.php?year=${this.actualYear}`).subscribe(
            response=>{
                this.tax = response;
                this.tax.forEach(field => {
                    field.dochod = (field.suma_przychodow - field.suma_kosztow).toFixed(2);
                });
            }
      )
  } 
    
    delete(id){
        this.CmsService.delete(`tax/delete.php?id=${id}`).subscribe(
            response=>{
                this.event.showInfo('info', 'Zaliczka na podatek została usunięta');
                this.getTax();
            }
        )
    }

}
