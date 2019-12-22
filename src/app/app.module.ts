import { OrdersModule } from "./orders/orders.module";
import { DomainDetailsComponent } from "./domains/domain-details/domain-details.component";
import { DomainAddComponent } from "./domains/domain-add/domain-add.component";
import { DomainsModule } from "./domains/domains.module";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFireStorageModule } from "@angular/fire/storage";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { SharedModule } from "./shared/shared.module";
import { AngularFireModule } from "@angular/fire";
import { environment } from "src/environments/environment";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { AngularFirestoreModule } from "@angular/fire/firestore";
const ProjectModules = [DomainsModule, SharedModule, OrdersModule];
const DependencyModules = [
  ProjectModules,
  BrowserModule,
  AppRoutingModule,

  BrowserAnimationsModule,
  HttpClientModule,
  FormsModule,
  ReactiveFormsModule,
  AngularFireAuthModule,
  AngularFireModule.initializeApp(environment.firebase),
  AngularFireAuthModule,
  AngularFireStorageModule,
  AngularFirestoreModule
];

@NgModule({
  declarations: [AppComponent],
  imports: [DependencyModules, ProjectModules],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
