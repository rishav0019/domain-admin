import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DomainDetailsComponent } from './domain-details/domain-details.component';


const routes: Routes = [
  {
    path:"domains",
    component:DomainDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DomainsRoutingModule { }
