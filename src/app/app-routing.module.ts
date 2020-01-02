import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DomainDetailsComponent } from './domains/domain-details/domain-details.component';



const routes: Routes = [
  {
    path: "",
    component: DomainDetailsComponent
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
