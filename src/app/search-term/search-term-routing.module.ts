import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchDetailsComponent } from './search-details/search-details.component';


const routes: Routes = [
  {
    path: "search-terms",
    component: SearchDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchTermRoutingModule { }
