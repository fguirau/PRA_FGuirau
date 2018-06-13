import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpModule} from "@angular/http";
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { IonicStorageModule } from '@ionic/storage';
import { Geolocation } from '@ionic-native/geolocation';
import { MyApp } from './app.component';
//////////////////////////////////////PAGES////////////////////////////////////////
import { LoginScreenPage } from '../pages/login-screen/login-screen';
import { MenuScreenPage } from '../pages/menu-screen/menu-screen';
import { MenuScreenPageModule } from '../pages/menu-screen/menu-screen.module';
import { ListScreenPage } from '../pages/list-screen/list-screen';
import { ListScreenPageModule } from '../pages/list-screen/list-screen.module';
import { DetailScreenPage } from '../pages/detail-screen/detail-screen';
import { DetailScreenPageModule } from '../pages/detail-screen/detail-screen.module';
import { AddbirdScreenPage } from '../pages/addbird-screen/addbird-screen';
import { AddbirdScreenPageModule } from '../pages/addbird-screen/addbird-screen.module';
import { AddsightingScreenPage } from '../pages/addsighting-screen/addsighting-screen';
import { AddsightingScreenPageModule } from '../pages/addsighting-screen/addsighting-screen.module';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { BirdsServiceProvider } from '../providers/birds-service/birds-service';
import { LoadingServiceProvider } from '../providers/loading-service/loading-service';
import { AlertServiceProvider } from '../providers/alert-service/alert-service';


@NgModule({
  declarations: [
    MyApp,
    LoginScreenPage
  ],
  imports: [
    BrowserModule, HttpClientModule, FormsModule, HttpModule,
    MenuScreenPageModule, ListScreenPageModule, DetailScreenPageModule, AddbirdScreenPageModule,
    AddsightingScreenPageModule, IonicModule.forRoot(MyApp), IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginScreenPage,
    MenuScreenPage,
    ListScreenPage,
    DetailScreenPage,
    AddbirdScreenPage,
    AddsightingScreenPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthServiceProvider,
    HttpClientModule,
    Geolocation, 
    BirdsServiceProvider,
    LoadingServiceProvider,
    AlertServiceProvider
  ]
})
export class AppModule {}
