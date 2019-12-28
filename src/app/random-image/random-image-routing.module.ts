import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ImageDetailsComponent } from './image-details/image-details.component';


const routes: Routes = [
  {
    path:"randomImage",
    component:ImageDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RandomImageRoutingModule { }
