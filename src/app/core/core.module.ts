import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ACCESS_TOKEN } from '@app/app.config';
import { environment } from '../../environments/environment';

@NgModule({
  declarations: [],
  imports: [BrowserModule, HttpClientModule, BrowserAnimationsModule],
  providers: [{ provide: ACCESS_TOKEN, useValue: environment.mapbox.accessToken }]
})
export class CoreModule {}
