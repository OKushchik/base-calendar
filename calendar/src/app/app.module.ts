import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ActionBarComponent } from './components/action-bar/action-bar.component';
import { BaseLayoutComponent } from './components/base-layout/base-layout.component';
import { CalendarTableComponent } from './components/calendar-table/calendar-table.component';
import { MonthSwitcherComponent } from './components/month-switcher/month-switcher.component';
import { VacationService } from './services/vacation.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormModalComponent } from './components/calendar-table/form-modal/form-modal.component';
import { MaterialModule } from './material/material.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    ActionBarComponent,
    BaseLayoutComponent,
    CalendarTableComponent,
    MonthSwitcherComponent,
    FormModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule
  ],
  providers: [ VacationService ],
  bootstrap: [AppComponent],
  entryComponents: [
    FormModalComponent
  ],
})
export class AppModule { }
