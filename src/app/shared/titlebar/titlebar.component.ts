import { Component, OnInit, Input } from '@angular/core';
import { SidenavService } from 'src/app/common/services/sidenav.service';
import { AuthService } from 'src/app/common/services/auth.service';
import { Router } from '@angular/router';
import { TitlebarService } from '../../common/services/titlebar.service';

@Component({
  selector: 'app-titlebar',
  templateUrl: './titlebar.component.html',
  styleUrls: ['./titlebar.component.scss']
})
export class TitlebarComponent implements OnInit {

  @Input() title: string;

  constructor(
    private sidenavService: SidenavService,
    private authService: AuthService,
    private titlebarService: TitlebarService,
    public router: Router) { }

  ngOnInit() {
    console.log(this.title);
    this.titlebarService.currentMessage.subscribe(title => this.title = title);
  }

  toggleSidenav() {
    this.sidenavService.toggle();
  }

  logout() {
    this.authService.logout();
  }

}
