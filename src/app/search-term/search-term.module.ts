import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchTermRoutingModule } from './search-term-routing.module';
import { SearchDetailsComponent } from './search-details/search-details.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [SearchDetailsComponent],
  imports: [
    CommonModule,
    SearchTermRoutingModule,
    SharedModule
  ]
})
export class SearchTermModule { }
