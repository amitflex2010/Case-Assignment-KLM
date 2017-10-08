import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { CarosuelComponent } from './carosuel/carosuel.component';
import { CarosuelService } from './services/carosuelservice.service';

@NgModule({
  declarations: [
    AppComponent,
    CarosuelComponent
  ],
  imports: [
    BrowserModule,
    HttpModule
  ],
  providers: [CarosuelService],
  bootstrap: [AppComponent]
})
export class AppModule { }
