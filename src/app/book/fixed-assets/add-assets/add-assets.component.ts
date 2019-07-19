import { Component, OnInit, ElementRef, Input, ViewChild, Output, EventEmitter, ViewChildren, AfterViewInit, OnDestroy} from '@angular/core';
import { EventService } from '../../../event.service';
import { ApiService } from '../../../api.service';
import { ActivatedRoute, Router } from '@angular/router';

import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl, Validator} from '@angular/forms';

@Component({
  selector: 'app-add-assets',
  templateUrl: './add-assets.component.html',
  styleUrls: ['./add-assets.component.scss']
})
export class AddAssetsComponent implements OnInit {

  fixedAssets;
    
  public myDatePickerOptions = {
    todayBtnTxt: "Dzisiaj",
    clearBtnTxt: "Wyczyść",
    closeBtnTxt: "Zamknij",  
    dayLabels: {su: 'Niedz.', mo: 'Pn.', tu: 'Wt.', we: 'Śr.', th: 'Czw.', fr: 'Pt.', sa: 'Sob.'},
    dayLabelsFull: {su: "Niedziela", mo: "Poniedziałek", tu: "Wtorek", we: "Środa", th: "Czwartek", fr: "Piątek", sa: "Sobota"},
    monthLabels: { 1: 'Sty', 2: 'Lut', 3: 'Mär', 4: 'Kwi', 5: 'Maj', 6: 'Cze', 7: 'Lip', 8: 'Sie', 9: 'Wrz', 10: 'Paź', 11: 'Lis', 12: 'Gru' },
    monthLabelsFull: { 1: "Styczeń", 2: "Luty", 3: "Marzec", 4: "Kwiecień", 5: "Maj", 6: "Czerwiec", 7: "Lipiec", 8: "Sierpień", 9: "Wrzesień", 10: "Październik", 11: "Listopad", 12: "Grudzień" }
  };      
    
  formErrors = {      
      dataSet: '',
      numberOfDocument: '',
      nameOfAssets: '',
      initialValue: ''
  }    
    
  validationMessages = {
        dataSet:{
            required: 'Data nabycia jest wymagana'  
        },
        numberOfDocument:{
            required: 'Numer dokumentu jest wymagany'
        },
        nameOfAssets:{
            required: 'Nazwa środka trwałego jest wymagana'
        },
        initialValue:{
            required: 'Wartość począkowa jest wymagana',
        }
  }    
    
  submited: boolean = false;
  idFixedAssets = null;    
    
  constructor(private CmsService: ApiService, private event: EventService, private route: ActivatedRoute, private _route: Router, private formBuilder: FormBuilder) {this.event.youCanVisit();}

  ngOnInit() {
      this.route.params.subscribe(params => this.idFixedAssets = parseInt(params['id']));
      
      if(this.idFixedAssets){
          this.getDateOfFixedAssets(this.idFixedAssets)
          .then(response=>{
              this.fixedAssets.patchValue({
                  dataSet: response[0].data_nabycia,
                  numberOfDocument: response[0].numer_dokumentu,
                  nameOfAssets: response[0].nazwa,
                  placeOfUse: response[0].miejsce_uzytkowania,
                  initialValue: response[0].warotsc_poczatkowa,
                  orLiquidated: (response[0].zlikwidowane==="0")?false:true,
                  dataOfLiquidated: response[0].data_likwidacji,
                  causeOfLiquidated: response[0].przyczyna_likwidacji,
              })
          })
      }
      this.onCreateForm();
      
      this.fixedAssets.valueChanges.subscribe((values)=>{
          this.onControlValueChanged();
      })
  }  
    

  onCreateForm(){
      this.fixedAssets = this.formBuilder.group({
            dataSet: ['', Validators.required],
            numberOfDocument: ['', Validators.required],
            nameOfAssets: ['', Validators.required],
            placeOfUse: [''],
            initialValue: ['', Validators.required],
            orLiquidated: [false],
            dataOfLiquidated: [''],
            causeOfLiquidated:[''],
      })
  } 
    
    
  onControlValueChanged(){
       const form = this.fixedAssets;
       
       for(let field in this.formErrors){
           this.formErrors[field] = '';
           let control = form.get(field);
           
           const validationMessages = this.validationMessages[field];
                      
           for(const key in control.errors){
               this.formErrors[field] += validationMessages[key] + ' ';
           }
       }
   } 
    
   onSubmit(fixedAssets){
       this.submited = true;
       
       if(fixedAssets.valid){
           
           if(this.idFixedAssets){
               this.CmsService.postAuthorization(`fixed-assets/put.php?id=${this.idFixedAssets}`, fixedAssets.value).subscribe(
                response=>{
                        if (response.kod === 0){
                            this.event.showInfo('success', 'Zapisano środek trwały');
                            this.submited = false;
                            fixedAssets.reset();
                            this._route.navigate(['/panel/', {outlets: { 'panel-outlet': ['fixxed-assets'] } }])
                        }
                        else{
                            this.event.showInfo('error', response.opis)
                        }
                    }
                )
           }
           else{
               this.CmsService.postAuthorization(`fixed-assets/post.php`, fixedAssets.value).subscribe(
                response=>{
                        if (response.kod === 0){
                            this.event.showInfo('success', 'Zapisano środek trwały');
                            this.submited = false;
                            fixedAssets.reset();
                            this._route.navigate(['/panel/', {outlets: { 'panel-outlet': ['fixxed-assets'] } }])
                        }
                        else{
                            this.event.showInfo('error', response.opis)
                        }
                    }
                )
           }
           
       }
       else{
           this.onControlValueChanged();
       }
   } 
    
    
   getDateOfFixedAssets(id){
       return new Promise(resolve=>{
           this.CmsService.getAuthorization(`fixed-assets/getDateOfFixedAssets.php?id=${id}`).subscribe(
                response=>resolve(response)
           )
       })
   }    
}
