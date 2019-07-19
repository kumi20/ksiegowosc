import { Component, OnInit, ElementRef, Input, ViewChild, Output, EventEmitter, ViewChildren, AfterViewInit, OnDestroy, Directive, SimpleChanges  } from '@angular/core';
import { EventService } from '../event.service';
import { ApiService } from '../api.service';
import { ActivatedRoute, Router } from '@angular/router';

import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl, Validator} from '@angular/forms';
import {NG_VALIDATORS} from "@angular/forms";

import { matchOtherValidator } from './validator';

@Component({
  selector: 'app-siginup',
  templateUrl: './siginup.component.html',
  styleUrls: ['./siginup.component.scss'],
})
export class SiginupComponent implements OnInit {

  constructor(private CmsService: ApiService, private event: EventService, private route: ActivatedRoute, private _route: Router, private formBuilder: FormBuilder) { }

  newAccount: FormGroup;  
    
  formErrors = {      
      userSurname: '',
      userName: '',
      userLogin: '',
      userPassword: '',
      userReturnPassword: '',
      userEmail: ''
  }
  
  successMessageRegistration = '';
  errorMessageRegistration = '';    
    
  validationMessages = {
        userName:{
            required: 'Imię jest wymagane'  
        },
        userSurname:{
            required: 'Nazwisko jest wymagane'
        },
        userPassword:{
            required: 'Hasło jest wymagane'
        },
        userReturnPassword:{
            required: 'Hasło jest wymagane',
            checkIfPasswordIdentical: 'Podane hasła nie są identyczne'
        },
        userLogin:{
            required: 'Login jest wymagany'
        },
        userEmail:{
            required: 'Adres email jest wymagany',
            email: 'Podaj poprawny adres email'
        },
  }
    
  submited: boolean = false;    
    
  ngOnInit() {
      this.onCreatForm();
      
      this.newAccount.valueChanges.subscribe((values)=>{
          this.onControlValueChanged();
      })
  }

  onCreatForm(){
       this.newAccount = this.formBuilder.group({
           userName: ['', Validators.required],
           userSurname: ['', Validators.required],
           userLogin:['', Validators.required],
           userPassword:['', Validators.required],
           userReturnPassword:['', [Validators.required, matchOtherValidator('userPassword')]],
           userEmail:['', [Validators.required, Validators.email]],
       })   
  } 
    

   onControlValueChanged(){
       const form = this.newAccount;
       
       for(let field in this.formErrors){
           this.formErrors[field] = '';
           let control = form.get(field);
           
           const validationMessages = this.validationMessages[field];
                      
           for(const key in control.errors){
               this.formErrors[field] += validationMessages[key] + ' ';
           }
       }
   }  
    
    
    onSubmit(news){
        this.submited = true;
        this.successMessageRegistration = '';
        this.errorMessageRegistration = '';
        
        if(news.valid){
            this.CmsService.post(`sigiIn/post.php`, news.value).subscribe(
                response=>{
                    if(response.code === 0){
                        this.successMessageRegistration = 'Konto zostało dodane. Prosimy o sprawdzenia poczty email w celu aktywacji konta';
                        news.reset();
                    }
                    else{
                        this.errorMessageRegistration = response.description;
                    }
                }
            )
            //news.reset();
            this.submited = false;
        }
        else{
            
            this.onControlValueChanged();
            return;
        }
    }
}

//lew oj beda sie bawic
//panny beda mysle o PerformanceEntry
//postawcie naludzi ktorym ufacie
//bedzie to bardzo szybki udany weekend
