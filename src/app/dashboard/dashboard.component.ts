import { Component, OnInit, ElementRef, Input, ViewChild, Output, EventEmitter, ViewChildren, AfterViewInit, OnDestroy} from '@angular/core';
import { EventService } from '../event.service';
import { ApiService } from '../api.service';
import { ActivatedRoute, Router } from '@angular/router';





@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit, OnDestroy{

  @ViewChildren('dynamiCom') dynamiCom;  
  id: number = 1;
  private sub: any;
  statusLista: Array<any> = [
        {value:'6020084026', label: 'zrealizowane'},
        {value:'6020084027', label: 'wykonane przez klienta'},
    ];    

    
   mySchema = {
    "properties": {
      "email": {
        "type": "string",
        "description": "email",
        "format": "email"
      },
      "password": {
        "type": "string",
        "description": "Password",
        "buttons": [{
          "id": "reset",
          "label": "Reset"
        }]
      },
      "rememberMe": {
        "type": "boolean",
        "default": false,
        "description": "Remember me"
      }
    },
    "required": ["email", "password", "rememberMe"],
    "buttons": [{
      "id": "alert", // the id of the action callback
      "label": "Alert !" // the text inside the button
    }]
  }
 
  // Declare a mapping between action ids and their event listener
  myActions = {
    "alert": (property) => { alert(JSON.stringify(property.value)) },
    "reset": (property) => { property.reset() }
  }
    
  constructor(private CmsService: ApiService, private event: EventService, private route: ActivatedRoute, private _route: Router) { }
    
  ngOnInit() {
      this.sub = this.route.params.subscribe(params => {
        this.id = +params['id'];
            if (isNaN(this.id)) this.id = 1;
            if(this.dynamiCom != null){
                this.ngAfterViewInit();
            }
      });
      

  }
    
  ngAfterViewInit(){
      this.dynamiCom.forEach(el=>{
          el.pobierzKontrolki(this.id);
      })
  }
    
 ngOnDestroy(){
     this.sub.unsubscribe();
 }    
    
    test(){
        this.event.showInfo('success', 'test error');

    }   
}
