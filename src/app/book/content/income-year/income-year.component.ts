import { Component, OnInit, ElementRef, Input, ViewChild, Output, EventEmitter, ViewChildren, AfterViewInit, OnDestroy} from '@angular/core';
import { EventService } from '../../../event.service';
import { ApiService } from '../../../api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-income-year',
  templateUrl: './income-year.component.html',
  styleUrls: ['./income-year.component.scss']
})
export class IncomeYearComponent implements OnInit {

  dataChart = [];
  constructor(private CmsService: ApiService, private event: EventService, private route: ActivatedRoute, private _route: Router) { }

  ngOnInit() {
    this.getDate();
  }

  getDate(){
      this.CmsService.getAuthorization(`content/incomeYear.php`).subscribe(response=>{
          this.dataChart = response;
          this.dataChart.forEach(field=>{
            field.przychod = Number(field.przychod);
            field.rozchod = Number(field.rozchod);
          })
      })
  }

  customizeTooltip(arg: any) {
    return {        
        text: arg.seriesName + ': ' + arg.value + 'zł'
    };
  }

}
