import { Component, OnInit } from '@angular/core';
import { DomainAddComponent } from 'src/app/domains/domain-add/domain-add.component';
import { MatDialog } from '@angular/material';
import { AddImageComponent } from '../add-image/add-image.component';
import { RandomImage } from 'src/app/common/models/randomImage.model';
import { RamdomImageService } from 'src/app/common/services/ramdom-image.service';

@Component({
  selector: 'app-image-details',
  templateUrl: './image-details.component.html',
  styleUrls: ['./image-details.component.scss']
})
export class ImageDetailsComponent implements OnInit {
  randomImages:RandomImage[]=[];
  constructor(  public dialog: MatDialog,
    private ramdomImageService:RamdomImageService) { }

  ngOnInit() {
   
    this.getRandomImages();
  }
 getRandomImages(){
  this.ramdomImageService.getRandomImages().subscribe(resonse=>{
    this.randomImages=resonse;
    console.log("randomImages",resonse)
  })
  
 }
 deleteImage(id) {
   
  this.ramdomImageService.deleteImage(id);
}
  openDomainAdd(domain) {
    const dialogRef = this.dialog.open(AddImageComponent, {
      width: "500px",
      maxWidth: "100vw",
      // data: { domain: domain }
    });

    dialogRef.afterClosed().subscribe(response => {
      //this.getVouchers();
    });
  }
}
