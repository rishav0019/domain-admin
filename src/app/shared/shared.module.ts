import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { MatFormFieldModule } from "@angular/material/form-field";

import { TitlebarComponent } from "./titlebar/titlebar.component";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { SidenavComponent } from "./sidenav/sidenav.component";
import { MatInputModule } from "@angular/material/input";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatNativeDateModule, MatRippleModule } from "@angular/material/core";
import { MatChipsModule } from "@angular/material/chips";
import {
  MatButtonModule,
  MatMenuModule,
  MatToolbarModule,
  MatIconModule,
  MatCardModule,
  MatListModule,
  MatAutocompleteModule,
  MatDatepickerModule,
  MatRadioModule,
  MatCheckboxModule,
  MatDialogModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatTooltipModule,
  MatProgressSpinnerModule,
  MatSnackBarModule,
  MatSlideToggleModule,
  MatExpansionModule,
 
} from "@angular/material";
import {MatSelectModule} from '@angular/material/select';
import { SharedRoutingModule } from './shared-routing.module';

const MaterialComponents = [
  MatToolbarModule,
  MatIconModule,
  MatSidenavModule,
  MatListModule,
  MatAutocompleteModule,
  MatInputModule,
  MatFormFieldModule,
  MatButtonModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatRippleModule,
  MatSelectModule,
  MatRadioModule,
  MatCheckboxModule,
  MatDialogModule,
  MatTableModule,
  MatSortModule,
  MatPaginatorModule,
  MatTooltipModule,
  MatProgressSpinnerModule,
  MatMenuModule,
  MatSnackBarModule,
  MatSlideToggleModule,
  MatExpansionModule,
  MatCardModule,
  MatChipsModule

];
const DependencyModules = [ReactiveFormsModule, FormsModule];

const SharedComponents = [TitlebarComponent, SidenavComponent];

@NgModule({
  declarations: [SharedComponents],
  imports: [CommonModule,SharedRoutingModule, DependencyModules, MaterialComponents],
  exports: [MaterialComponents, DependencyModules, SharedComponents]
})
export class SharedModule {}
