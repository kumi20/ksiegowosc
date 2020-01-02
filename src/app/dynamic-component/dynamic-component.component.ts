import {Component, Injector, Input,Type, ViewContainerRef, ViewChild, ReflectiveInjector, ComponentFactoryResolver, OnDestroy, ElementRef, ComponentRef, isDevMode, OnInit} from '@angular/core';

import { AddUserCustomerComponent } from '../book/customer/add-user-customer/add-user-customer.component';
import { ContactCustomerListComponent } from '../book/customer/contact-customer-list/contact-customer-list.component';
import { CustomerFileComponent } from '../book/customer/customer-file/customer-file.component';
import { CustomerFileListComponent } from '../book/customer/customer-file-list/customer-file-list.component';

@Component({
  selector: 'app-dynamic-component',
  entryComponents:[
    AddUserCustomerComponent,
    ContactCustomerListComponent,
    CustomerFileComponent,
    CustomerFileListComponent
  ],
  templateUrl: './dynamic-component.component.html',
  styleUrls: ['./dynamic-component.component.scss'],
  inputs: ['idCustomer']
})
export class DynamicComponentComponent implements OnInit {

  @ViewChild('dynamicComponentContainer', {static: true, read: ViewContainerRef}) dynamicComponentContainer;
  @Input() componentData; 

  injector: Injector;

  constructor(private componentFactoryResolver: ComponentFactoryResolver, viewContainerRef: ViewContainerRef) { }

  ngOnInit() {
    this.injector = ReflectiveInjector.resolveAndCreate([
      {
        provide: 'idCustomer',
        useValue: {
          value: this.componentData.idCustomer
        }
      }
    ]);   
    const factory = this.componentFactoryResolver.resolveComponentFactory(this.componentData.component);
    const componentRef = this.dynamicComponentContainer.createComponent(factory, 0 , this.injector);
    componentRef.instance.idtresci = this.componentData.idTresci;
    componentRef.instance.pageElement = this.componentData.pageElement;
    //componentRef.instance.callMeFromParent;
    componentRef.changeDetectorRef.detectChanges();
  }

}
