import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

//plugins

import { Camera} from '@ionic-native/camera';
import { ImagePicker } from '@ionic-native/image-picker';
import { SocialSharing } from '@ionic-native/social-sharing';

//pipes


import { PipesModule } from '../pipes/pipes.module';

// Cprivider o servicios

import { CargaArchivoProvider } from '../providers/carga-archivo/carga-archivo';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SubirPage } from '../pages/subir/subir';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { HttpModule } from '@angular/http'
import { HttpClientModule } from '@angular/common/http';

export const firebaseConfig = {
  apiKey: "AIzaSyA_axx5x2ILqcQLwTOgYraouFLRtMvehzw",
    authDomain: "gag-5d8d8.firebaseapp.com",
    databaseURL: "https://gag-5d8d8.firebaseio.com",
    projectId: "gag-5d8d8",
    storageBucket: "gag-5d8d8.appspot.com",
    messagingSenderId: "623390368818"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SubirPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    PipesModule,
    HttpModule,
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SubirPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AngularFireDatabase,
    Camera,
    ImagePicker,
    SocialSharing,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CargaArchivoProvider
  ]
})
export class AppModule {}
