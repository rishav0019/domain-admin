import { Component, OnInit } from '@angular/core';
import { DomainAddComponent } from 'src/app/domains/domain-add/domain-add.component';
import { MatDialog } from '@angular/material';
import { AddImageComponent } from '../add-image/add-image.component';
import { RandomImage } from 'src/app/common/models/randomImage.model';
import { RandomImageService } from 'src/app/common/services/random-image.service';
import { TitlebarService } from 'src/app/common/services/titlebar.service';


@Component({
  selector: 'app-image-details',
  templateUrl: './image-details.component.html',
  styleUrls: ['./image-details.component.scss']
})
export class ImageDetailsComponent implements OnInit {
  randomImages: RandomImage[] = [];
  constructor(public dialog: MatDialog,
    private randomImageService: RandomImageService, private titlebarService: TitlebarService) { }

  ngOnInit() {

    this.getRandomImages();
  }
  getRandomImages() {
    this.titlebarService.changeMessage("Add Random Images");
    this.randomImageService.getRandomImages().subscribe(resonse => {
      this.randomImages = resonse;
      console.log("randomImages", resonse)
    })

  }
  deleteImage(id) {

    this.randomImageService.deleteRandomImage(id);
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
