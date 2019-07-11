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
  incomeWait: number = 0;
  expenditureWait: number = 0;
  incomeAfterDeadLine: number = 0;
  expenditureAfterDeadLine: number = 0; 
  
  incomeWaitChart:Array<any> = [];   
  expenditureWaitChart: Array<any> = [];
    
    
  constructor(private CmsService: ApiService, private event: EventService, private route: ActivatedRoute, private _route: Router) {this.event.youCanVisit();}

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
      this.unpaidInvoicesGet();
      this.incomeWaitChartGet();
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
                        
                       for(let i = 0; i < 12; i++){
                            this.incomeYear.push(Number(0));
                        } 
                       
                       for(let i = 0; i < 12; i++){
                                    this.expenditureYear.push(Number(0));
                        } 
                       
                        response.forEach(el=>{
                            switch (el.miesiac){
                                        case '01': this.incomeYear[0] = Number(el.razem_przychod);
                                                    break;
                                        case '02': this.incomeYear[1] = Number(el.razem_przychod);
                                                    break;
                                        case '03': this.incomeYear[2] = Number(el.razem_przychod);
                                                    break;
                                        case '04': this.incomeYear[3] = Number(el.razem_przychod);
                                                    break;
                                        case '05': this.incomeYear[4] = Number(el.razem_przychod);
                                                    break;
                                        case '06': this.incomeYear[5] = Number(el.razem_przychod);
                                                    break;
                                        case '07': this.incomeYear[6] = Number(el.razem_przychod);
                                                    break;
                                        case '08': this.incomeYear[7] = Number(el.razem_przychod);
                                                    break;
                                        case '09': this.incomeYear[8] = Number(el.razem_przychod);
                                                    break;
                                        case '10': this.incomeYear[9] = Number(el.razem_przychod);
                                                    break;
                                        case '11': this.incomeYear[10] = Number(el.razem_przychod);
                                                    break;
                                        case '12': this.incomeYear[11] = Number(el.razem_przychod);
                                                    break;    

                                    }
                        });
                       
                       this.CmsService.getAuthorization(`content/getRozchod.php?year=${this.actualYear}`).subscribe(
                            response =>{
                                                               
                                
                                response.forEach(el=>{
                                    switch (el.miesiac){
                                        case '01': this.expenditureYear[0] = Number(el.razem_przychod);
                                                    break;
                                        case '02': this.expenditureYear[1] = Number(el.razem_przychod);
                                                    break;
                                        case '03': this.expenditureYear[2] = Number(el.razem_przychod);
                                                    break;
                                        case '04': this.expenditureYear[3] = Number(el.razem_przychod);
                                                    break;
                                        case '05': this.expenditureYear[4] = Number(el.razem_przychod);
                                                    break;
                                        case '06': this.expenditureYear[5] = Number(el.razem_przychod);
                                                    break;
                                        case '07': this.expenditureYear[6] = Number(el.razem_przychod);
                                                    break;
                                        case '08': this.expenditureYear[7] = Number(el.razem_przychod);
                                                    break;
                                        case '09': this.expenditureYear[8] = Number(el.razem_przychod);
                                                    break;
                                        case '10': this.expenditureYear[9] = Number(el.razem_przychod);
                                                    break;
                                        case '11': this.expenditureYear[10] = Number(el.razem_przychod);
                                                    break;
                                        case '12': this.expenditureYear[11] = Number(el.razem_przychod);
                                                    break;    

                                    }
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
        this.unpaidInvoicesGet();
        this.incomeWaitChartGet();
    }
    
    unpaidInvoicesGet(){
        this.CmsService.getAuthorization(`content/unpaidInvoicesGet.php?year=${this.actualYear}`).subscribe(
            response=>{
                if(response.kod === 0){
                    this.incomeWait = response.przychod;
                    this.expenditureWait = response.wydatki;
                    this.incomeAfterDeadLine = response.przychod_po_terminie;
                    this.expenditureAfterDeadLine = response.wydatki_po_terminie;
                }
                else this.event.showInfo('error', response.description)
            }
        )
    }
    
    incomeWaitChartGet(){
        this.CmsService.getAuthorization(`content/incomeWaitChart.php?year=${this.actualYear}`).subscribe(
            response =>{
                
                this.incomeWaitChart.length = 0;
                this.expenditureWaitChart.length = 0;
                
                            
                for(let i = 0; i < 12; i++){
                    this.incomeWaitChart.push(Number(0));
                    this.expenditureWaitChart.push(Number(0));
                }
                
                response.forEach(el=>{                    
                    switch (el.miesiac){
                        case '01': this.incomeWaitChart[0] = Number(el.przychod);
                                    this.expenditureWaitChart[0] = Number(el.rozchod);
                                    break;
                        case '02': this.incomeWaitChart[1] = Number(el.przychod);
                                    this.expenditureWaitChart[1] = Number(el.rozchod);
                                    break;
                        case '03': this.incomeWaitChart[2] = Number(el.przychod);
                                    this.expenditureWaitChart[2] = Number(el.rozchod);
                                    break;
                        case '04': this.incomeWaitChart[3] = Number(el.przychod);
                                    this.expenditureWaitChart[3] = Number(el.rozchod);
                                    break;
                        case '05': this.incomeWaitChart[4] = Number(el.przychod);
                                    this.expenditureWaitChart[4] = Number(el.rozchod);
                                    break;
                        case '06': this.incomeWaitChart[5] = Number(el.przychod);
                                    this.expenditureWaitChart[5] = Number(el.rozchod);
                                    break;
                        case '07': this.incomeWaitChart[6] = Number(el.przychod);
                                    this.expenditureWaitChart[6] = Number(el.rozchod);
                                    break;
                        case '08': this.incomeWaitChart[7] = Number(el.przychod);
                                    this.expenditureWaitChart[7] = Number(el.rozchod);
                                    break;
                        case '09': this.incomeWaitChart[8] = Number(el.przychod);
                                    this.expenditureWaitChart[8] = Number(el.rozchod);
                                    break;
                        case '10': this.incomeWaitChart[9] = Number(el.przychod);
                                    this.expenditureWaitChart[9] = Number(el.rozchod);
                                    break;
                        case '11': this.incomeWaitChart[10] = Number(el.przychod);
                                    this.expenditureWaitChart[10] = Number(el.rozchod);
                                    break;
                        case '12': this.incomeWaitChart[11] = Number(el.przychod);
                                    this.expenditureWaitChart[11] = Number(el.rozchod);
                                    break;    
                            
                    }
                })
                this.incomeWaitChart = [{data: this.incomeWaitChart, label: 'Oczekujące na zapłatę'}];
                this.expenditureWaitChart = [{data: this.expenditureWaitChart, label: 'Oczekujące na zapłatę'}];
            }
        )
    }
    
    chartClicked(event){
        if(event.active.length !=0){ 
            this._route.navigate(['/panel/',{ outlets: { 'panel-outlet': ['not-paid', event.active[0]._index] } }]);
        }
    }
}
