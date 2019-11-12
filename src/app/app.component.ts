import { Component, OnInit } from '@angular/core';
import { GoogleAnalyticsService } from 'angular-ga';
import { ApiService } from './api.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'app';    
    
   constructor(private gaService: GoogleAnalyticsService){}
    
   ngOnInit(){
       //this.gaService.configure(this.googleAnalitycs);
   }
       
    full(){
        var html = document.documentElement;
        if (html.requestFullscreen) {
            html.requestFullscreen();
        }
    }
}
