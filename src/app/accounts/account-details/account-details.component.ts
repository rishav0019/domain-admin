import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/common/services/account.service';
import { TitlebarService } from 'src/app/common/services/titlebar.service';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.scss']
})
export class AccountDetailsComponent implements OnInit {
  displayedColumns: string[] = [
    "displayName",
    "email",
    "phoneNumber",
    "creationDate",
  ];
  dataSource: any;

  constructor(
    private titlebarService: TitlebarService,
    private accountService: AccountService
  ) { }

  ngOnInit() {
    this.titlebarService.changeMessage("Account Details");
    this.getAccounts();
  }

  getAccounts() {
    this.accountService.getAccounts().subscribe(response => {
      console.log("getAccounts->", response);
      this.dataSource = response;
    })
  }

}
