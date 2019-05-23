import { Component, OnInit, ElementRef, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { ApiService } from '../../api.service';
import { EventService } from '../../event.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
  inputs: ['idtresci','pageElement']
})
export class GalleryComponent implements OnInit {

  idtresci;
  pageElement;
  imagesBasic: any[] = [];
    
  constructor(private CmsService: ApiService, private route: ActivatedRoute, private _route: Router, private event: EventService) { }

  ngOnInit() {
      
      this.event.klepsydraStart();
        this.CmsService.get(`gallery/galleryId_Get.php?idGallery=${this.idtresci}`).subscribe(
          response => {
            if (response !=null){
                for(let i = 0; i < response['length']; i++){
                    this.imagesBasic.push({
                        'img': this.CmsService.uriGallery+`/${this.idtresci}/`+response[i].gallery_photo_name,
                        'thumb': this.CmsService.uriGallery+`/${this.idtresci}/thumb/`+response[i].gallery_photo_name,
                        'description': response[i].description,
                        'idPhoto': response[i].gallery_photo_id  
                  })


                }
            }
            
            this.event.klepsydraStop();
          },
          error =>{
            this.event.showInfo('error','Błąd pobierania galerii');
            this.event.klepsydraStop();
          }
        )
  }

}
