import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';
import { LoginComponent } from './login/login.component';
import {MatListModule} from '@angular/material/list';
import {MatSelectModule} from '@angular/material/select';
import { Http, HttpModule, Headers, RequestOptions, Response, ConnectionBackend } from '@angular/http';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatCardModule} from '@angular/material/card';
import { SignUpPageComponent } from './sign-up-page/sign-up-page.component';
import { HomeComponent } from './home/home.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import { DashboardEventComponent } from './dashboard-event/dashboard-event.component';
import { DashboardMediaComponent } from './dashboard-media/dashboard-media.component';
import { ErrorDialogComponent } from './error-dialog/error-dialog.component';
import { PeopleComponent } from './people/people.component';
import { RulesComponent } from './rules/rules.component';
import { InvalidPageComponent } from './invalid-page/invalid-page.component';
import { DashboardTeamsComponent } from './dashboard-teams/dashboard-teams.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { EmailConfirmComponent } from './email-confirm/email-confirm.component';
import { ConfirmConfirmComponent } from './confirm-confirm/confirm-confirm.component';
import { CartComponent } from './cart/cart.component';
import {MatBadgeModule} from '@angular/material/badge';
import {MatSidenavModule} from '@angular/material/sidenav';
import { SuccessDialogComponent } from './success-dialog/success-dialog.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ForgotComponent } from './forgot/forgot.component';
import { NewpasswordComponent } from './newpassword/newpassword.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpPageComponent,
    HomeComponent,
    DashboardEventComponent,
    DashboardMediaComponent,
    ErrorDialogComponent,
    PeopleComponent,
    RulesComponent,
    InvalidPageComponent,
    DashboardTeamsComponent,
    EmailConfirmComponent,
    ConfirmConfirmComponent,
    CartComponent,
    SuccessDialogComponent,
    ForgotComponent,
    NewpasswordComponent,  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatInputModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatButtonModule,
    MatListModule,
    MatSelectModule,
    HttpModule,
    MatIconModule,
    MatDialogModule,
    MatCardModule,
    MatExpansionModule,
    MatSnackBarModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatSidenavModule,
    HttpClientModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
  ,
  entryComponents:[ErrorDialogComponent],
})
export class AppModule { }
