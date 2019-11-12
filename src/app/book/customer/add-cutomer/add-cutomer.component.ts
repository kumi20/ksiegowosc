import { Component, OnInit, ElementRef, Input, ViewChild, Output, EventEmitter, ViewChildren, AfterViewInit, OnDestroy} from '@angular/core';
import { EventService } from '../../../event.service';
import { ApiService } from '../../../api.service';
import { ActivatedRoute, Router } from '@angular/router';

import {FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'app-add-cutomer',
  templateUrl: './add-cutomer.component.html',
  styleUrls: ['./add-cutomer.component.scss']
})
export class AddCutomerComponent implements OnInit {

  customerForm;
  submitted: boolean = false;

  formError = {
    customerName:'',
    customerPostCode: '',
    customerCity: '',
    customerStreet: '',
    customerNip: '',
    customerLogin: ''
  }

  validationMessages = {
      customerName:{
          required:'Nazwa jest wymagana'
      },
      customerPostCode:{
          required:'Kod pocztowy jest wymagany'
      },
      customerCity:{
          required:'Miasto jest wymagae'
      },
      customerStreet:{
          required: 'Ulica jest wymagana'
      },
      customerNip:{
          required: 'Nip jest wymagany'
      },
      customerLogin:{
          required: 'Login jest wymagany',
          email: 'Podaj poprawny adres email'
      }
  }

  constructor(private CmsService: ApiService, private event: EventService, private route: ActivatedRoute, private _route: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.onCreateForm();

      this.customerForm.valueChanges.subscribe((value)=>{
        this.event.onControlValueChanged(this.customerForm, this.formError, this.validationMessages);
      });
  }

  onCreateForm(){
    this.customerForm = this.formBuilder.group({
        customerName: ['', Validators.required],
        customerPostCode: ['', Validators.required],
        customerCity:['', Validators.required],
        customerStreet:['', Validators.required],
        customerNip:['', Validators.required],
        customerLogin:['', [Validators.email, Validators.required]],
    })
}

onSubmitCustomer(event){
    this.submitted = true;
    if(event.invalid){
        this.event.onControlValueChanged(this.customerForm, this.formError, this.validationMessages);
        return;
    }
    else{
        this.CmsService.postAuthorization(`customer/create_customer.php`, event.value).subscribe(response=>{
          if(response.code === 200){
              this.event.showInfo('success', "Dodano klienta");
              this._route.navigate(['/panel/', {outlets: { 'panel-outlet': ['customer'] } }]);
              this.customerForm.reset();
              this.submitted = false;
          }
        })
    }
}
}
