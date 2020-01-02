import { Component, OnInit, Injector, ElementRef, Input, ViewChild, Output, EventEmitter, ViewChildren, AfterViewInit, OnDestroy} from '@angular/core';
import { EventService } from '../../../event.service';
import { ApiService } from '../../../api.service';
import { ActivatedRoute, Router } from '@angular/router';

import {FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'app-add-user-customer',
  templateUrl: './add-user-customer.component.html',
  styleUrls: ['./add-user-customer.component.scss']
})
export class AddUserCustomerComponent implements OnInit, OnDestroy {

  customer_id;
  userForm;
  userList: Array<User>;

  popupVisible: boolean = false;

  submitted: boolean = false;

  formError = {
    loginUser:'',
    pswUser: ''
  }

  validationMessages = {
      loginUser:{
          required:'Nazwa jest wymagana',
          email: 'Podaj poprawny adres email'
      },
      pswUser:{
          required:'Hasło jest wymagane'
      }
  }

  onCloseModal;

  constructor(private injector: Injector, private CmsService: ApiService, private event: EventService, private route: ActivatedRoute, private _route: Router,
    private formBuilder: FormBuilder) { 
        this.customer_id = this.injector.get('idCustomer', '');
        this.onCloseModal = this.event.onClosemodat.subscribe(()=>this.submitted = false);
    }

  ngOnInit() {
      this.onGetUserList();
      this.onCreateForm();

      this.userForm.valueChanges.subscribe((value)=>{
        this.event.onControlValueChanged(this.userForm, this.formError, this.validationMessages);
      });
  }

  ngOnDestroy(){
    this.onCloseModal.unsubscribe();
  }

  onGetUserList():Promise<Array<User>>{
      return new Promise(resolve=>{
          this.CmsService.getAuthorization(`customer/getUser.php?idCustomer=${this.customer_id.value}`).subscribe(response=>{
            if(response.code === 200) this.userList = response.records;
            resolve(this.userList)
          })
      })
  }

  onCreateForm(){
    this.userForm = this.formBuilder.group({
        loginUser: ['', [Validators.required, Validators.email]],
        pswUser: ['', Validators.required],
        idCustomer: [this.customer_id.value]
    })
  }

  closeOnOutsideClickChange(){
    this.event.searchingCompany();
  }

  onSubmitCustomer(event){
    this.submitted = true;
    if(event.invalid){
        this.event.onControlValueChanged(this.userForm, this.formError, this.validationMessages);
        return;
    }
    else{
        this.CmsService.postAuthorization(`customer/createUserAccont.php`, event.value).subscribe(response=>{
          if(response.code === 200){
              this.event.showInfo('success', "Dodano klienta");
              this.popupVisible = false;
              this.onGetUserList();
              this.userForm.reset();
              this.userForm.controls.idCustomer.setValue(this.customer_id.value);
              this.submitted = false;
          }
        })
    }
}

}

export interface User{
    customer_login: string;
    customer_psw: string;
}