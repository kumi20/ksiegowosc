import { KmComponent } from './../km.component';
import { Component, OnInit, ElementRef, Input, ViewChild, Output, EventEmitter, ViewChildren, AfterViewInit, OnDestroy} from '@angular/core';
import { EventService } from '../../../event.service';
import { ApiService } from '../../../api.service';
import { ActivatedRoute, Router } from '@angular/router';

import {FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'app-add-km',
  templateUrl: './add-km.component.html',
  styleUrls: ['./add-km.component.scss']
})
export class AddKmComponent implements OnInit {

  kmForm;
  submitted: boolean = false;

  formError = {
    data:'',
    opis:'',
    cel: '',
    kilometry: '',
    stawka: '',
    wartosc: ''
  }

  validationForm = {
    data:{
        required: 'Data jest wymagana'
    },
    opis:{
        required: 'Opis jest wymagany',
    },
    cel:{
        required: 'Cel jest wymagany',
    },
    kilometry:{
        required: 'Kilometry są wymagane'
    },
    stawka:{
        pattern: 'Stawka jest wymagana'
    },
    wartosc:{
       required: 'Wartośc jest wymagana'
    }
}

  constructor(private CmsService: ApiService, private event: EventService, private route: ActivatedRoute, private _route: Router, public formBuilder: FormBuilder, public KmComponent:KmComponent) { }

  ngOnInit() {
      this.onCreateForm();

      this.kmForm.valueChanges.subscribe((value)=>{
        this.event.onControlValueChanged(this.kmForm, this.formError, this.validationForm);
      });
  }

  onCreateForm(){
    this.kmForm = this.formBuilder.group({
        data:['', Validators.required],
        opis: ['', Validators.required],
        cel: ['', Validators.required],
        kilometry: [0, Validators.required],
        stawka: ['', Validators.required],
        wartosc: [0, Validators.required]
    })
  }

  onSubmittedForm(event){
      this.submitted = true;
      if(event.invalid) {
        this.event.onControlValueChanged(this.kmForm, this.formError, this.validationForm);
        return;
      }
      else {
          event.value.data = new Date(event.value.data).getFullYear()+'-'+this.event.formatMonth(new Date(event.value.data).getMonth())+'-'+this.event.formatDay(new Date(event.value.data).getDate())
          this.CmsService.postAuthorization(`kilometrowka/post.php`, event.value).subscribe(response=>{
              if(response.code === 200){
                  this.event.showInfo('success', 'Dodano wyjazd');
                  this.KmComponent.onGetKmList();
                  this.KmComponent.popupVisible = false;
              }
          })
      }
  }

  countValue(){
    this.kmForm.get('kilometry').value = this.kmForm.get('kilometry').value.replace(',','.');
    this.kmForm.get('stawka').value = this.kmForm.get('stawka').value.replace(',','.');
      this.kmForm.controls.wartosc.setValue(this.Round(Number(this.kmForm.get('kilometry').value)*Number(this.kmForm.get('stawka').value),2));      
  }

  Round(n, k)
    {
        var factor = Math.pow(10, k);
        return Math.round(n*factor)/factor;
    }
}
