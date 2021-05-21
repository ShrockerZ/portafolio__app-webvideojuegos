import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment';
// created
import { GamesModule } from './games/games.module';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';
// ngrx
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { GamesReducer } from './games/redux/games.reducer';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule} from "ngx-toastr";
import { NgxSpinnerModule } from 'ngx-spinner';
import { Authreducer } from './auth/redux/auth.reducer';



@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [

    // ngrx
    StoreModule.forRoot({
      games:GamesReducer,
      session:Authreducer
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25, 
      logOnly: environment.production}),
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    GamesModule,
    AuthModule,
    SharedModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    ToastrModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
