import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Observable } from "rxjs/Observable";
import { catchError, map } from 'rxjs/operators';
import { EventService } from './event.service';

@Injectable()
export class ApiService {

  domanie = 'https://kumi20.webd.pl'; 
  uri =  this.domanie + '/api/ksiega/';
    
    
  uriGallery = this.domanie + '/cms/assets/gallery';

  sourceImageNews = this.domanie + '/source/';
    
    
   month: Array<any> = [
      {value:'01', label: 'styczeń'},
      {value:'02', label: 'luty'},
      {value:'03', label: 'marzec'},
      {value:'04', label: 'kwiecień'},
      {value:'05', label: 'maj'},
      {value:'06', label: 'czerwiec'},
      {value:'07', label: 'lipiec'},
      {value:'08', label: 'sierpień'},
      {value:'09', label: 'wrzesień'},
      {value:'10', label: 'październik'},
      {value:'11', label: 'listopad'},
      {value:'12', label: 'grudzień'}
    ];


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
          'Authorizationtoken':localStorage.getItem('ksiegaQumiToken')
      }})
    .pipe(
        catchError((err, caught)=>{
            this.event.showInfo('error',err.message);
            throw new Error(err.message)
        })
    )
  }

  public async downloadResource(uri): Promise<Blob> {
    const file =  await this._http.get<Blob>(
      this.uri+uri,
      {responseType: 'blob' as 'json'}).toPromise();
    return file;
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
          'Authorizationtoken':localStorage.getItem('ksiegaQumiToken')
      }})
      .pipe(
        catchError((err, caught)=>{
            this.event.showInfo('error',err.message);
            throw new Error(err.message)
        })
    )
  }  

  putAuthorization(uri, json){      
    return this._http.put<any[]|any>(this.uri+uri, json, {headers: {
        'Authorizationtoken':localStorage.getItem('ksiegaQumiToken')
    }})
    .pipe(
      catchError((err, caught)=>{
          this.event.showInfo('error',err.message);
          throw new Error(err.message)
      })
  )
}  
    
  delete(uri){
      return this._http.delete<any[]|any>(this.uri+uri, {headers: {
          'Authorizationtoken':localStorage.getItem('ksiegaQumiToken')
      }}).pipe(
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
    
    
  getYear(){
    return this._http.get<any[]|any>(this.uri+'get_year.php')
    .pipe(
        catchError((err, caught)=>{
            this.event.showInfo('error',err.message);
            throw new Error(err.message)
        })
    )
  }   

}


