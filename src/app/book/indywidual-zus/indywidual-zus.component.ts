import { Component, OnInit, ElementRef, Input, ViewChild, Output, EventEmitter, ViewChildren, AfterViewInit, OnDestroy} from '@angular/core';
import { EventService } from '../../event.service';
import { ApiService } from '../../api.service';
import { ActivatedRoute, Router } from '@angular/router';

import {FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'app-indywidual-zus',
  templateUrl: './indywidual-zus.component.html',
  styleUrls: ['./indywidual-zus.component.scss']
})
export class IndywidualZusComponent implements OnInit {
  @ViewChild('yearSelected') yearList;
  indywidualZus;
  year = [];
  actualYear;

  constructor(private CmsService: ApiService, private event: EventService, private route: ActivatedRoute, private _route: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.CmsService.getYear().toPromise()
      .then(
          res=>{
              res.forEach(el=>{
                this.year.push({value: el.year, label:el.year})
            });
            this.yearList.updateOptionsList();
            this.actualYear = String(new Date().getFullYear());
          }
      )
    this.onCreateForm();
  }

  onCreateForm(){
    this.indywidualZus = this.formBuilder.group({
        rok: [''],
        chorobowe: [''],
        zus_sp: [''],
        zus_fp:['']
    })
  }

  onSubmited(event){
      event.value.chorobowe = event.value.chorobowe.replace(',','.');
      event.value.zus_sp = event.value.zus_sp.replace(',','.');
      event.value.zus_fp = event.value.zus_fp.replace(',','.');
      this.CmsService.postAuthorization(`indywidual_zus/post.php`, event.value).subscribe(response=>{
        if(response.kod == 0){
            this.event.showInfo('success', 'Dodano składki ZUS');
            this._route.navigate(['/panel/', {outlets: { 'panel-outlet': ['settings'] } }])
        }
      })
  }
}
