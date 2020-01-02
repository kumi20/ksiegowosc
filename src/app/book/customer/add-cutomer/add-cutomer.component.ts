import { Component, OnInit, Injector, ElementRef, Input, ViewChild, Output, EventEmitter, ViewChildren, AfterViewInit, OnDestroy} from '@angular/core';
import { EventService } from '../../../event.service';
import { ApiService } from '../../../api.service';
import { ActivatedRoute, Router } from '@angular/router';

import {FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'app-add-cutomer',
  templateUrl: './add-cutomer.component.html',
  styleUrls: ['./add-cutomer.component.scss']
})
export class AddCutomerComponent implements OnInit, OnDestroy {
    @Output() onAddingCustomer = new EventEmitter<boolean>();

  customerForm;
  submitted: boolean = false;

  formError = {
    customerName:'',
    customerPostCode: '',
    customerCity: '',
    customerStreet: '',
    customerNip: '',
    customerRegon: ''
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
      customerRegon:{
          required: 'Regon jest wymagany',
      }
  }

  idCustomer;
  onCloseModal;
 

  constructor(private injector: Injector, private CmsService: ApiService, private event: EventService, private route: ActivatedRoute, private _route: Router,
     private formBuilder: FormBuilder) {
        this.onCloseModal = this.event.onClosemodat.subscribe(()=>this.submitted = false);
      }

  ngOnInit() {
    this.onCreateForm();

      this.customerForm.valueChanges.subscribe((value)=>{
        this.event.onControlValueChanged(this.customerForm, this.formError, this.validationMessages);
      });
  }

  ngOnDestroy(){
    this.onCloseModal.unsubscribe();
  }

  onCreateForm(){
    this.customerForm = this.formBuilder.group({
        customerName: ['', Validators.required],
        customerPostCode: ['', Validators.required],
        customerCity:['', Validators.required],
        customerStreet:['', Validators.required],
        customerNip:['', Validators.required],
        customerRegon:['', Validators.required]
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
              this.onAddingCustomer.emit(true);
              this.customerForm.reset();
              this.submitted = false;
          }
        })
    }
}
}
