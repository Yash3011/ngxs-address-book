import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './component/user/user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormComponent } from './component/form/form.component';
import { FilterPipe } from './component/user/filter.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxsModule } from '@ngxs/store';
import { UserState } from './states/user.state';
import {NgxsReduxDevtoolsPluginModule} from '@ngxs/devtools-plugin'

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    FormComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    NgxsModule.forRoot([UserState]),
    NgxsReduxDevtoolsPluginModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
