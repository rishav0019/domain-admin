import { SharedModule } from "./../shared/shared.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { OrdersRoutingModule } from "./orders-routing.module";
import { OrderDetailsComponent } from "./order-details/order-details.component";

@NgModule({
  declarations: [OrderDetailsComponent],
  imports: [CommonModule, OrdersRoutingModule, SharedModule],
  exports: [OrderDetailsComponent]
})
export class OrdersModule {}
