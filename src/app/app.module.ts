import { NgDompurifySanitizer } from "@tinkoff/ng-dompurify";
import { TuiRootModule, 
         TuiDialogModule, 
         TuiAlertModule, 
         TUI_SANITIZER, 
         TuiTextfieldControllerModule,
        } from "@taiga-ui/core";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { PageStudentComponent } from './student/page-student/page-student.component';
import { CardGroupComponent } from './group/card-group/card-group.component';
import { PageGroupComponent } from './group/page-group/page-group.component';

import { HttpClientModule }   from '@angular/common/http';
import { ReactiveFormsModule }   from '@angular/forms';

import {TuiTabsModule, 
        TuiInputDateModule, 
        TuiInputModule, 
        TuiInputCountModule, 
        TuiSelectModule,
        TuiDataListWrapperModule,
        TuiIslandModule,
      } from '@taiga-ui/kit';

import {TuiDataListModule, 
        TuiButtonModule, 
        TuiErrorModule,
        TuiSvgModule,
        TuiLoaderModule,
      } from '@taiga-ui/core';


import { TableStudentComponent } from "./student/table-student/table-student.component";
import { FormStudentComponent } from './student/form-student/form-student.component';
import { FormGroupComponent } from './group/form-group/form-group.component';

@NgModule({
  declarations: [
    AppComponent,
    PageStudentComponent,
    CardGroupComponent,
    PageGroupComponent,
    TableStudentComponent,
    FormStudentComponent,
    FormGroupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    TuiRootModule,
    TuiDialogModule,
    TuiAlertModule,
    TuiTabsModule,
    TuiInputDateModule,
    TuiTextfieldControllerModule,
    TuiInputModule,
    TuiInputCountModule,
    TuiSelectModule,
    TuiDataListModule,
    TuiDataListWrapperModule,
    TuiButtonModule,
    TuiErrorModule,
    TuiSvgModule,
    TuiLoaderModule,
    TuiIslandModule
  ],
  providers: [{provide: TUI_SANITIZER, useClass: NgDompurifySanitizer}],
  bootstrap: [AppComponent]
})
export class AppModule { }
