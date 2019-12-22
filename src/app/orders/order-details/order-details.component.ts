import { OrderService } from "./../../common/services/order.service";
import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { TitlebarService } from "src/app/common/services/titlebar.service";
import { Router } from "@angular/router";
import { Location } from "@angular/common";

@Component({
  selector: "app-order-details",
  templateUrl: "./order-details.component.html",
  styleUrls: ["./order-details.component.scss"]
})
export class OrderDetailsComponent implements OnInit {
  displayedColumns: string[] = [
    "id",
    "amount",
    "email",
    "contact",
    "created_at",
    "status"
  ];
  dataSource: any;
  // payment_url = "https://dashboard.razorpay.com/#/app/payments/";

  constructor(
    private titlebarService: TitlebarService,
    private orderService: OrderService
  ) {}

  ngOnInit() {
    this.titlebarService.changeMessage("Orders Details");
    //  this.getPayments();
  }
  data = [
    {
      id: "pay_Dh5eTcSl66KViH",
      entity: "payment",
      amount: 140,
      currency: "INR",
      status: "authorized"
    },
    {
      id: "pay_Dh5eTcSl66KViH",
      entity: "payment",
      amount: 140,
      currency: "INR",
      status: "authorized"
    }
  ];
  // getPayments() {
  //   let count = 100;
  //   this.paymentService.getPayments(count).subscribe(response => {
  //     console.log("Payments->", response);
  //     this.dataSource = response;
  //   });
  // }
}
