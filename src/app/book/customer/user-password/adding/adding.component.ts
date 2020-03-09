import { password } from './../../../my-profile/myprofil';
import { Component, OnInit, Injector, ElementRef, Input, ViewChild, Output, EventEmitter, ViewChildren, AfterViewInit, OnDestroy, OnChanges } from '@angular/core';
import { EventService } from '../../../../event.service';
import { ApiService } from '../../../../api.service';
import { ActivatedRoute, Router } from '@angular/router';

import {FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'app-adding',
  templateUrl: './adding.component.html',
  styleUrls: ['./adding.component.scss'],
  inputs:['idSystem']
})
export class AddingComponent implements OnInit, OnChanges, OnDestroy {

  @Output() onAddingSystem = new EventEmitter<boolean>();

  submitted: boolean = false;
  customer_id;
  onCloseModal;

  idSystem;

  systemForm;

  formError = {
    name:'',
    login: '',
    password: '',
  }

  validationMessages = {
      name:{
          required:'Nazwa jest wymagana'
      },
      login:{
          required:'Login jest wymagany'
      },
      password:{
          required:'Hasło jest wymagane'
      }
  }

  constructor(private injector: Injector, private CmsService: ApiService, private event: EventService, private route: ActivatedRoute, private _route: Router,
    private formBuilder: FormBuilder) {
       this.customer_id = this.injector.get('idCustomer', '');
       this.onCloseModal = this.event.onClosemodat.subscribe(()=>this.submitted = false);
     }

  ngOnInit() {
      this.onCreateSystemForm();

      this.systemForm.valueChanges.subscribe((value)=>{
        this.event.onControlValueChanged(this.systemForm, this.formError, this.validationMessages);
      });

      
  }

  ngOnDestroy(){
    this.onCloseModal.unsubscribe();
  }

  ngOnChanges(){    
    if (this.idSystem === null){
      this.systemForm.reset();
      this.systemForm.controls.id_customer.setValue(this.customer_id.value); 
    }
    if(this.idSystem){
      this.onGetOne(this.idSystem);
    } 
  }


  onCreateSystemForm(){
    this.systemForm = this.formBuilder.group({
        id: [null],
        name: ['', Validators.required],
        login: ['', Validators.required],
        password:['', Validators.required],
        coments:[''],
        id_customer:[this.customer_id.value]
    })
  }

  onGetOne(id){
      this.CmsService.getAuthorization(`userPassword/getOne.php?id=${id}`).subscribe(response=>{
          this.systemForm.controls.id.setValue(response[0].id);
          this.systemForm.controls.name.setValue(response[0].name);
          this.systemForm.controls.login.setValue(response[0].login);
          this.systemForm.controls.password.setValue(response[0].password);
          this.systemForm.controls.coments.setValue(response[0].coments);
          this.systemForm.controls.id_customer.setValue(this.customer_id.value);
      })
  }

  onSendSystem(event){
      this.submitted = true;
      if(event.invalid){
        this.event.onControlValueChanged(this.systemForm, this.formError, this.validationMessages);
        return;
      }
      else{
        this.CmsService.postAuthorization(`userPassword/post.php`,event.value).subscribe(response=>{
            if(response.code === 200){
                this.event.showInfo('success', 'Dodano system');
                this.onAddingSystem.emit(true);
                this.systemForm.reset();
                this.systemForm.controls.id_customer.setValue(this.customer_id.value);
                this.submitted = false;
            }
        })
      }
  }

}
