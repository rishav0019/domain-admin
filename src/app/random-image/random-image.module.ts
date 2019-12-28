import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RandomImageRoutingModule } from './random-image-routing.module';
import { ImageDetailsComponent } from './image-details/image-details.component';
import { SharedModule } from '../shared/shared.module';
import { AddImageComponent } from './add-image/add-image.component';


@NgModule({
  declarations: [ImageDetailsComponent, AddImageComponent],
  imports: [
    CommonModule,
    RandomImageRoutingModule,SharedModule
  ]
})
export class RandomImageModule { }
