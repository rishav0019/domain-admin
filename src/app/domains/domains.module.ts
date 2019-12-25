import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { DomainsRoutingModule } from "./domains-routing.module";
import { DomainAddComponent } from "./domain-add/domain-add.component";

import { DomainDetailsComponent } from "./domain-details/domain-details.component";
import { SharedModule } from "../shared/shared.module";
import { MatCardModule } from "@angular/material";
import { CategoryAddComponent } from './category-add/category-add.component';

@NgModule({
  declarations: [DomainAddComponent, DomainDetailsComponent, CategoryAddComponent],
  imports: [CommonModule, DomainsRoutingModule, SharedModule, MatCardModule],
  exports: [DomainAddComponent, DomainDetailsComponent]
})
export class DomainsModule {}
