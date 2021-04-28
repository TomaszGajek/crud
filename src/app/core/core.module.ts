import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ACCESS_TOKEN } from '@app/app.config';
import { environment } from '../../environments/environment';

export const accessTokenProvider = {
  provide: ACCESS_TOKEN,
  useValue: environment.mapbox.accessToken
};

@NgModule({
  declarations: [],
  imports: [BrowserModule, HttpClientModule, BrowserAnimationsModule],
  providers: [accessTokenProvider]
})
export class CoreModule {}
