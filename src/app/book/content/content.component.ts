import { Component, OnInit, ElementRef, Input, ViewChild, Output, EventEmitter, ViewChildren, AfterViewInit, OnDestroy} from '@angular/core';
import { EventService } from '../../event.service';
import { ApiService } from '../../api.service';
import { ActivatedRoute, Router } from '@angular/router';

import { yearStatistic } from './content';


@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

  @ViewChild('yearList') yearList;    
  dataChart: number[] = []    
  chartDatasets:Array<any> = []; 
  yearStatistic: yearStatistic = {incomeYear:'',expenditureYear:'',revenueYear:''} ;
  actualYear;
  year: Array<any> = [];  
  incomeYear: number[] = [];
  expenditureYear: number[] = [];    
    
    
  constructor(private CmsService: ApiService, private event: EventService, private route: ActivatedRoute, private _route: Router) { }

  ngOnInit() {
      this.actualYear = String(new Date().getFullYear());
      
      this.CmsService.getYear().subscribe(
        response=>{
            response.forEach(el=>{
                this.year.push({value: el.year, label:el.year})
            });
            this.yearList.updateOptionsList();
            this.actualYear = String(new Date().getFullYear());
        }
      )
      //console.log('konsola', routesObject)
      this.getYearStatistic();
      this.getMonthStatistic();
  }

    
    public chartType:string = 'bar';
        
    chartHovered(event){}

    public chartLabels:Array<any> = ["STY", "LUT", "MAR", "KWI", "MAJ", "CZE", "LIP", "SIE", "WRZ", "PAŹ", "LIS", "GRU"];

    public chartColors:Array<any> = [
        {
            backgroundColor: 'rgba(220,220,220,0.2)',
            fontColor: '#fff',
            borderColor: 'rgba(220,220,220,1)',
            borderWidth: 2,
            pointBackgroundColor: 'rgba(220,220,220,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(220,220,220,1)'
        },
        {
            backgroundColor: 'rgba(151,187,205,0.2)',
            borderColor: 'rgba(151,187,205,1)',
            borderWidth: 2,
            pointBackgroundColor: 'rgba(151,187,205,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(151,187,205,1)'
        },
        {
            backgroundColor: 'rgba(151,187,205,0.2)',
            borderColor: 'rgba(151,187,205,1)',
            borderWidth: 2,
            pointBackgroundColor: 'rgba(151,187,205,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(151,187,205,1)'
        }
    ];
    
     public chartOptions:any = { 
        responsive: true,
        legend: {
            labels:{
                fontColor: 'white'
            }
        },
        scales: {
            yAxes: [{
                ticks: {
                    fontColor: "white",

                }
            }],
            xAxes: [{
                ticks: {
                    fontColor: "white",

                }
            }]
        }
    }
    
    getYearStatistic(){
        this.CmsService.getAuthorization(`content/getList.php?year=${this.actualYear}`).subscribe(
            response=>{
                if (response.kod === 0) this.yearStatistic = {incomeYear: response.przychod_rok ,expenditureYear: response.wydatki_rok, revenueYear:response.dochod_rok};
                else this.event.showInfo('error', response.description)
            }
        )
    }
    
    getMonthStatistic(){
        this.CmsService.getAuthorization(`content/getMounth.php?year=${this.actualYear}`).subscribe(
           response=>{
               if (response != null) {
                   if(response.description === -1) this.event.showInfo('error', response.description);
                   else{
                       this.incomeYear.length = 0;
                        this.expenditureYear.length = 0;
                        response.forEach(el=>{
                            this.incomeYear.push(Number(el.razem_przychod));
                        });
                       
                       this.CmsService.getAuthorization(`content/getRozchod.php?year=${this.actualYear}`).subscribe(
                            response =>{
                                response.forEach(el=>{
                                    this.expenditureYear.push(Number(el.razem_przychod));
                                })

                                this.chartDatasets = [
                                    {data: this.incomeYear, label: 'Przychód'},
                                    {data: this.expenditureYear, label: 'koszt uzyskania przychodu'}
                                ];
                            }
                        )
                   }
                    
                }
           }            
        )
    }
    
    
    changeYear(year){
        this.getYearStatistic();
        this.getMonthStatistic();
    }
}
