import {Component, Input,Type, ViewContainerRef, ViewChild, ReflectiveInjector, ComponentFactoryResolver, OnDestroy, ElementRef, ComponentRef, isDevMode, OnInit} from '@angular/core';

import { StaticComponent } from '../template/static/static.component';
import { NewsComponentView } from '../template/news/news.component';
import { MenuParent } from '../template/menu/menu/menu.component';
import { MapyComponent } from '../template/mapy/mapy.component';
import { CformTemplateComponent } from '../template/cform/cform.component';
import { PoolComponent } from '../template/pool/pool.component';
import { GalleryComponent } from '../template/gallery/gallery.component';
import { NewsletterComponent } from '../template/newsletter/newsletter.component';
import { CalendarTemplateComponent } from '../template/calendar/calendar.component';

@Component({
  selector: 'app-dynamic-component',
  entryComponents:[
    StaticComponent,
    NewsComponentView,
    MenuParent,
    MapyComponent,
    CformTemplateComponent,
    PoolComponent,
    GalleryComponent,
    NewsletterComponent,
    CalendarTemplateComponent
  ],
  templateUrl: './dynamic-component.component.html',
  styleUrls: ['./dynamic-component.component.scss'],
  inputs: ['idTresci','pageElement']
})
export class DynamicComponentComponent implements OnInit {

  @ViewChild('dynamicComponentContainer', {static: true, read: ViewContainerRef}) dynamicComponentContainer;
  @Input() componentData; 
  idTresci;
  pageElement;

  constructor(private componentFactoryResolver: ComponentFactoryResolver, viewContainerRef: ViewContainerRef) { }

  ngOnInit() {
    const factory = this.componentFactoryResolver.resolveComponentFactory(this.componentData.component);
    const componentRef = this.dynamicComponentContainer.createComponent(factory);
    componentRef.instance.idtresci = this.idTresci;
    componentRef.instance.pageElement = this.pageElement;
    //componentRef.instance.callMeFromParent;
    componentRef.changeDetectorRef.detectChanges();
  }

}
