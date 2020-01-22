import { Component, OnInit } from '@angular/core';
import { GoogleAnalyticsService } from 'angular-ga';
import { ApiService } from './api.service';

import { locale, loadMessages, formatMessage } from "devextreme/localization";
import "devextreme-intl";

import deMessages from "devextreme/localization/messages/de.json";
import ruMessages from "devextreme/localization/messages/ru.json";
import plMessages from "devextreme/localization/messages/pl.json";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'app';    
    
  locale: string;
  locales = [{
            "Name": "English",
            "Value": "en"
        }, {
            "Name": "Deutsch",
            "Value": "de"
        },
        {
            "Name": "Polski",
            "Value": "pl"
        }, {
            "Name": "Русский",
            "Value": "ru"
        }];
  formatMessage = formatMessage;


   constructor(private gaService: GoogleAnalyticsService){}
    
   ngOnInit(){
        this.locale = this.getLocale();
        this.initMessages();
        locale(this.locale);
       //this.gaService.configure(this.googleAnalitycs);
   }
       
    full(){
        var html = document.documentElement;
        if (html.requestFullscreen) {
            html.requestFullscreen();
        }
    }

    changeLocale(data) {
        this.setLocale(data.value);
        parent.document.location.reload();
    }
    
    setLocale(locale) {
        sessionStorage.setItem("locale", locale);
    }
    
    initMessages() {
        loadMessages(deMessages);
        loadMessages(ruMessages);
        loadMessages(plMessages);
    }

    getLocale() {
        var locale = sessionStorage.getItem("locale");
        return locale != null ? locale : "pl";
    }
}