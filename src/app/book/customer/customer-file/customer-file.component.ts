import { Component, OnInit, Injector, ElementRef, Input, ViewChild, Output, EventEmitter, ViewChildren, AfterViewInit, OnDestroy} from '@angular/core';
import { EventService } from '../../../event.service';
import { ApiService } from '../../../api.service';
import { ActivatedRoute, Router } from '@angular/router';

import {FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';

import { FileUploader } from 'ng2-file-upload';

const URL = '';

@Component({
  selector: 'app-customer-file',
  templateUrl: './customer-file.component.html',
  styleUrls: ['./customer-file.component.scss']
})
export class CustomerFileComponent implements OnInit {

  customer_id;

  public uploader:FileUploader = new FileUploader({url: URL});
  public hasBaseDropZoneOver:boolean = false;
  public hasAnotherDropZoneOver:boolean = false;
  
  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }
  
  public fileOverAnother(e:any):void {
    this.hasAnotherDropZoneOver = e;
  }   

  formFile;

  constructor(private injector: Injector, private CmsService: ApiService, private event: EventService, 
    private route: ActivatedRoute, private _route: Router, private formBuilder: FormBuilder) { 
    this.customer_id = this.injector.get('idCustomer', '');
  }

  ngOnInit() {
      this.configFileUploud();
      this.onCreateForm();
  }

  onCreateForm(){
      this.formFile = this.formBuilder.group({
          typPliku: ['', Validators.required],
          rok: [''],
          miesiac: [''],
          kwotaFaktury: [''],
          terminPlatnosci: [''],
          id_customer:[this.customer_id .value],
          file: []
      })
  }

  test(){
    this.formFile.controls.file.setValue(this.uploader.queue)
    console.log(this.formFile.value)
  }

  onSubmit(event){
    console.log(event.value)
    event.stopPropagation();
  }

  public configFileUploud(){
    this.uploader = new FileUploader({
        url: URL,
        authTokenHeader: 'Authorizationtoken',
        authToken: localStorage.getItem('ksiegaQumiToken'),
        autoUpload: false,
        allowedMimeType: ['application/pdf','image/jpg', 'image/png', 'image/jpeg'],
    });

    this.uploader.onAfterAddingFile  = (item) => {
        item.withCredentials = false;   
    }
    
    this.uploader.onWhenAddingFileFailed = () =>{
        this.event.showInfo('error', 'Niedozwolony plik');
    }
    
    this.uploader.onCompleteAll = () =>{
        this.event.showInfo('success', 'zapisano faktury');
        this.uploader.queue.length = 0;
    }
 }

}
