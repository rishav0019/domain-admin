import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';


import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFireStorageModule } from "@angular/fire/storage";
import { HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SidenavService } from './common/services/sidenav.service';

import { AgmCoreModule } from '@agm/core';


import { DatePipe } from '@angular/common';
import { DomainsModule } from './domains/domains.module';
import { OrdersModule } from './orders/orders.module';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { LoginModule } from './login/login.module';
import { RandomImageModule } from './random-image/random-image.module';
import { AccountsModule } from './accounts/accounts.module';


const ProjectModules = [
  SharedModule,
  LoginModule,
  DomainsModule,
  OrdersModule,
  RandomImageModule,
  AccountsModule
];

const DependencyModules = [
  BrowserModule,
  AppRoutingModule,
  ProjectModules,
  BrowserAnimationsModule,
  HttpClientModule,
  FormsModule,
  ReactiveFormsModule,
  AngularFireModule.initializeApp(environment.firebase),
  AngularFireAuthModule,
  AngularFireStorageModule,
  AngularFirestoreModule

];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    ProjectModules,
    DependencyModules
  ],
  providers: [SidenavService, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
