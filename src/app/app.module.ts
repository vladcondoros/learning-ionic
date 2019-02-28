import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { ItemDetailsPage } from '../pages/item-details/item-details';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { HttpClientModule } from "@angular/common/http";
import { IonicStorageModule } from '@ionic/storage';
import { DataProvider } from '../providers/data/data';
import { WelcomePage } from "../pages/welcome/welcome";
import { BasketPage } from "../pages/basket/basket";

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    WelcomePage,
    BasketPage,
    ItemDetailsPage,
    ListPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    WelcomePage,
    BasketPage,
    ItemDetailsPage,
    ListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    HttpClientModule,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthServiceProvider,
    DataProvider,
  ]
})
export class AppModule {}
