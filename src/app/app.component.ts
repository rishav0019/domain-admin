import { Component, ViewChild, ElementRef } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { SidenavService } from './common/services/sidenav.service';
import { AuthService } from './common/services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = "Domain-admin";
  isValidUser = false;
  public sidenav: MatSidenav;

  @ViewChild("sidenav") set sidenavbar(content: MatSidenav) {
    this.sidenav = content;
    this.sidenavService.setSidenav(this.sidenav);
    console.log("Sidenav2-->", this.sidenav);
  }

  constructor(
    public afAuth: AngularFireAuth,
    private sidenavService: SidenavService,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.sidenavService.setSidenav(this.sidenav);
    console.log("Sidenav1-->", this.sidenav);
  }

}
