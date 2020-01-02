import { Component, OnInit, Injector, ElementRef, Input, ViewChild, Output, EventEmitter, ViewChildren, AfterViewInit, OnDestroy} from '@angular/core';
import { EventService } from '../../../event.service';
import { ApiService } from '../../../api.service';
import { ActivatedRoute, Router } from '@angular/router';

import {FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'app-contact-customer-add',
  templateUrl: './contact-customer-add.component.html',
  styleUrls: ['./contact-customer-add.component.scss']
})
export class ContactCustomerAddComponent implements OnInit, OnDestroy {
  @Output() onAddingContact = new EventEmitter<boolean>();

  submitted: boolean = false;

  formError = {
    contact_name:'',
    contact_email: ''
  }

  validationMessages = {
    contact_name:{
          required:'Nazwa jest wymagana',
      },
    contact_email:{
          required:'Email jest wymagany',
          email: 'Podaj poprawny adres email'
      }
  }

  formContact;
  customer_id;
  onCloseModal;

  constructor(private injector: Injector, private CmsService: ApiService, private event: EventService, private route: ActivatedRoute,
     private _route: Router, private formBuilder: FormBuilder) {
    this.customer_id = this.injector.get('idCustomer', '');
    this.onCloseModal = this.event.onClosemodat.subscribe(()=>this.submitted = false);
   }

  ngOnInit() {
      this.onCreateForm();

      this.formContact.valueChanges.subscribe((value)=>{
        this.event.onControlValueChanged(this.formContact, this.formError, this.validationMessages);
      });
  }

  ngOnDestroy(){
    this.onCloseModal.unsubscribe();
  }

  onCreateForm(){
      this.formContact = this.formBuilder.group({
          contact_name:['', Validators.required],
          contact_email:['', [Validators.required, Validators.email]],
          customer_id: [this.customer_id.value]
      })
  }

  onSendContact(event){
    this.submitted = true;
    if(event.invalid){
        this.event.onControlValueChanged(this.formContact, this.formError, this.validationMessages);
        return;
    }
    else{
        this.CmsService.postAuthorization(`customer/createContact.php`, event.value).subscribe(response=>{
          if(response.code === 200){
              this.event.showInfo('success', "Dodano klienta");
              this.onAddingContact.emit(true);
              this.formContact.reset();
              this.formContact.controls.customer_id.setValue(this.customer_id.value);
              this.submitted = false;
          }
        })
    }
  }

}
