import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { LoginComponent } from './components/auth/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { EncoderComponent } from './components/encoder/encoder.component';
import { AuthInterceptorService } from './services/interceptors/authInterceptor.service';
import { LoadingSpinnerComponent } from './components/loading/loadingSpinner.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    LoginComponent,
    EncoderComponent,
    LoadingSpinnerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, 
      useClass: AuthInterceptorService, 
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
