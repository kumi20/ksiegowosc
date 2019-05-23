import { Component, OnInit, ElementRef, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { ApiService } from '../../api.service';
import { EventService } from '../../event.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CalendarComponent } from 'ng-fullcalendar';
//import { Options } from 'fullcalendar';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  inputs: ['idtresci','pageElement']
})
export class CalendarTemplateComponent implements OnInit {

  idtresci;
  pageElement;
  events;    
 
  calendarOptions;    
    
  constructor(private CmsService: ApiService, private route: ActivatedRoute, private _route: Router, private event: EventService) { }

  ngOnInit() {
      this.event.klepsydraStart();
      this.CmsService.get(`callendar/getList.php`).subscribe(
        response =>{
            if (response !=null) this.events = response;
            this.calendarOptions = {
                editable: false,
                eventLimit: false,
                firstDay: 1,
                monthNames: ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec','Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'],
                dayNames: ['Niedziela', 'Poniedziałek', 'Wtorek', 'Środa','Czwartek', 'Piątek', 'Sobota'],  
                dayNamesShort: ['Niedz', 'Pon', 'Wt', 'Śr', 'Czw', 'Pt', 'Sob'],  
                monthNamesShort: ['Sty', 'Lut', 'Mar', 'Kwi', 'Maj', 'Cze', 'Lip', 'Sie', 'Wrz', 'Paź', 'Lis', 'Gru'],  
                buttonText: {
                      today:    'dzisiaj',
                      month:    'miesiąc',
                      week:     'tydzień',
                      day:      'dzień'
                    }, 
                header: {
                  left: 'prev,next today',
                  center: 'title',
                  right: 'month,agendaWeek,agendaDay'
                },
                events: this.events
              };
            this.event.klepsydraStop();
        },
        error =>{
            this.event.showInfo('error', 'Błąd pobierania danych');
            this.event.klepsydraStop();
        }  
      )
  }

}
