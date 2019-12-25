import { Component, OnInit } from "@angular/core";
import { environment } from "src/environments/environment";
import { SidenavService } from 'src/app/common/services/sidenav.service';
import { AuthService } from 'src/app/common/services/auth.service';

@Component({
  selector: "app-sidenav",
  templateUrl: "./sidenav.component.html",
  styleUrls: ["./sidenav.component.scss"]
})
export class SidenavComponent implements OnInit {
  menus: Map<string, string>[] = [];
  version: string;

  constructor(
    private sidenav: SidenavService,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    // this.version = environment.version;
  }



  toggleSidenav() {
    this.sidenav.toggle();
  }

  logout() {
    //this.sidenav.toggle();
    this.authService.logout();
  }



}
