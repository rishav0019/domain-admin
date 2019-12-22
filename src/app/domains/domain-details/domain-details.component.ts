import { DomainService } from "./../../common/services/domain.service";
import { DomainAddComponent } from "./../domain-add/domain-add.component";
import { Domain } from "./../../common/models/domain.model";
import { Component, OnInit } from "@angular/core";
import { TitlebarService } from "src/app/common/services/titlebar.service";
import { Router } from "@angular/router";
import { MatDialog } from "@angular/material";

@Component({
  selector: "app-domain-details",
  templateUrl: "./domain-details.component.html",
  styleUrls: ["./domain-details.component.scss"]
})
export class DomainDetailsComponent implements OnInit {
  domains: Domain[] = [];
  filteredDomains: Domain[] = [];
  selectable = true;
  constructor(
    private router: Router,
    public dialog: MatDialog,
    private domainService: DomainService
  ) {}

  ngOnInit() {
    console.log("ngoninit");
    // this.titlebarService.changeMessage("Category Details");
    this.getDomains();
  }

  getDomains() {
    this.domainService.getDomains().subscribe(response => {
      this.domains = response;
      this.filteredDomains = response;
      console.log(this.domains);
    });
  }

  openDomainAdd(domain) {
    const dialogRef = this.dialog.open(DomainAddComponent, {
      width: "500px",
      maxWidth: "100vw",
      data: { domain: domain }
    });

    dialogRef.afterClosed().subscribe(response => {
      //this.getVouchers();
    });
  }
  deleteDomain(id) {
    this.domainService.deleteDomain(id);
  }
  applyFilter(filterValue: string) {
    console.log(filterValue);
    this.filteredDomains = this.domains.filter(doctor => {
      if (!filterValue) {
        return true;
      } else if (
        doctor.name
          .trim()
          .toLowerCase()
          .includes(filterValue.trim().toLowerCase())
      ) {
        return true;
      } else {
        return false;
      }
    });
  }
}
