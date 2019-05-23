import { Component, OnInit, ElementRef, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { ApiService } from '../../api.service';
import { EventService } from '../../event.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pool',
  templateUrl: './pool.component.html',
  styleUrls: ['./pool.component.scss'],
  inputs: ['idtresci','pageElement']
})
export class PoolComponent implements OnInit {
    
  idtresci;
  pageElement;
  namePoll;
  questionPoll: any[] = [];
  selectedQuestion: number = 0;
  votePoll: boolean = false; //zmienna sprawdza czy oddano już glos w ankiecie
  dataChart: number[] = []    
  
  chartDatasets:Array<any> = [];
//        {data: [65], label: 'tak'},
//          {data: [59], label: 'nie'},
//          {data: [0], label: 'nie wiem'},
//      ];    

 // chartDatasets:Array<any> = [];
    
  constructor(private CmsService: ApiService, private route: ActivatedRoute, private _route: Router, private event: EventService) { }

  ngOnInit() {
      //this.chartDatasets.push({data: [65], label: 'tak'})
      let numberAnkieta = localStorage.getItem('votePoll')
      if(numberAnkieta == this.idtresci) this.votePoll = true;
      this.event.klepsydraStart();
      this.CmsService.get(`template/poll/getList.php?id=${this.idtresci}`).subscribe(
            response=>{
                if (response != null){
                    this.namePoll = response[0].poll_name;
                    this.event.klepsydraStop();

                    response.forEach(el=>{
                        this.questionPoll.push({poll_vote_id: el.poll_vote_id, poll_vote_name: el.poll_vote_name})
                        this.chartDatasets.push({data: [Number(el.poll_vote_votecount)],label: el.poll_vote_name})
                    })
                }                
            },
            error=>{
                this.event.klepsydraStop();
                this.event.showInfo('error','Błąd pobierania danych');
            }
      );
  }
    
    glosuj(){
        if (this.selectedQuestion != 0){
            this.event.klepsydraStart();
            this.CmsService.get(`template/poll/vote.php?id=${this.selectedQuestion}`).subscribe(
                response=>{
                    this.event.klepsydraStop();
                    this.CmsService.get(`template/poll/getList.php?id=${this.idtresci}`).subscribe(
                            response=>{
                                this.event.klepsydraStop();
                                this.chartDatasets.length = 0;

                                response.forEach(el=>{
                                    this.chartDatasets.push({data: [Number(el.poll_vote_votecount)],label: el.poll_vote_name})
                                })
                                
                                this.event.showInfo('info','Głos został oddany');
                                localStorage.setItem('votePoll',this.idtresci);
                                this.votePoll = true;
                            },
                            error=>{
                                this.event.klepsydraStop();
                                this.event.showInfo('error','Błąd pobierania danych');
                            }
                      );
                    
                },
                error=>{
                    this.event.klepsydraStop();
                    this.event.showInfo('error', 'Błąd zapisu danych');
                }
            )
        }
        
    }
    
    choseVoid(index){
        this.selectedQuestion = index;
    }
    
    public chartType:string = 'bar';
        
    

    public chartLabels:Array<any> = ["odpowiedzi"];

    public chartColors:Array<any> = [
        {
            backgroundColor: 'rgba(220,220,220,0.2)',
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
            backgroundColor: '#F7464A',
            borderColor: 'rgba(0, 0, 0, 0.1)',
            borderWidth: 2,
            pointBackgroundColor: 'rgba(151,187,205,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(151,187,205,1)'
        }
    ];
    
//    public chartColors:Array<any> = [{
//        hoverBorderColor: ['rgba(0, 0, 0, 0.1)', 'rgba(0, 0, 0, 0.1)', 'rgba(0, 0, 0, 0.1)', 'rgba(0, 0, 0, 0.1)', 'rgba(0, 0, 0, 0.1)'], 
//        hoverBorderWidth: 0, 
//        backgroundColor: ["#F7464A", "#46BFBD", "#FDB45C", "#949FB1", "#4D5360"], 
//        hoverBackgroundColor: ["#FF5A5E", "#5AD3D1", "#FFC870", "#A8B3C5","#616774"]
//    }];

    public chartOptions:any = { 
        responsive: true
        
    };

    public chartClicked(e: any): void { 
         
    } 
    
    public chartHovered(e: any): void {
         
    }

}
