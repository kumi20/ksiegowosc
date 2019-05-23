import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Observable } from "rxjs/Observable";
import { catchError, map } from 'rxjs/operators';
import { EventService } from './event.service';

@Injectable()
export class ApiService {

  domanie = 'http://kumi20.webd.pl'; 
  uri =  this.domanie + '/api/ksiega/';
    
    
  uriGallery = this.domanie + '/cms/assets/gallery';

  sourceImageNews = this.domanie + '/source/';


  constructor(private _http:HttpClient, public event: EventService) { 

  }
    
  get(uri){
    return this._http.get<any[]|any>(this.uri+uri)
    .pipe(
        catchError((err, caught)=>{
            this.event.showInfo('error',err.message);
            throw new Error(err.message)
        })
    )
  }    
    
  getAuthorization(uri){
    return this._http.get<any[]|any>(this.uri+uri,{headers: {
          'AuthorizationToken':localStorage.getItem('ksiegaQumiToken')
      }})
    .pipe(
        catchError((err, caught)=>{
            this.event.showInfo('error',err.message);
            throw new Error(err.message)
        })
    )
  }
    
  post(uri, json){      
      return this._http.post<any[]|any>(this.uri+uri, json)
      .pipe(
        catchError((err, caught)=>{
            this.event.showInfo('error',err.message);
            throw new Error(err.message)
        })
    )
  }    
    
  postAuthorization(uri, json){      
      return this._http.post<any[]|any>(this.uri+uri, json, {headers: {
          'AuthorizationToken':localStorage.getItem('ksiegaQumiToken')
      }})
      .pipe(
        catchError((err, caught)=>{
            this.event.showInfo('error',err.message);
            throw new Error(err.message)
        })
    )
  }  
    
  logOn(user, psw){
      const json = JSON.stringify({
          'user': user,
          'psw': psw
      });

      return this._http.post<any[]|any>(this.uri + 'logON.php', json)
      .pipe(
        catchError((err, caught)=>{
            this.event.showInfo('error',err.message);
            throw new Error(err.message)
        })
     )
  }    

}


