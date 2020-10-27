import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import {FlashMessagesModule} from 'angular2-flash-messages';
import { HttpClientModule } from '@angular/common/http';
import {ValidateService} from './services/validate.service';
import {AuthService} from './services/auth.service';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { Product, Service } from './services/products.service';
import { FooterComponent } from './footer/footer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FilterPipe} from './filter/filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ProfileComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    HomeComponent,
    FilterPipe,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    // import HttpClientModule after BrowserModule.
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlashMessagesModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule
  ],
  providers: [ValidateService, AuthService, Product, Service],
  bootstrap: [AppComponent]
})
export class AppModule { }
