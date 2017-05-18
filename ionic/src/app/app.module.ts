import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { HttpModule } from "@angular/http"
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { SeminarListPage } from "../pages/seminar-list/seminar-list";
import { TabsPage } from "../pages/tabs/tabs";
import { SigninPage } from "../pages/signin/signin";
import { SignupPage } from "../pages/signup/signup";
import { WebService } from "../services/webservice";
import { SeminarPage } from "../pages/seminar/seminar";
import { FavoritesPage } from "../pages/favorites/favorites";
import { NewSeminarPage } from "../pages/new-seminar/new-seminar";
import { NewProfessorPage } from "../pages/new-professor/new-professor";
import { ConfirmationPage } from "../pages/confirmation/confirmation";
import { EditAccountPage } from "../pages/edit-account/edit-account";
import { ConfirmationPopoverPage } from "../pages/seminar/conf-popover/conf-popover";
import { BarcodeScanner } from "@ionic-native/barcode-scanner";
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
import { BluetoothPage } from "../pages/confirmation/bluetooth/bluetooth";
import { PlacePage } from "../pages/place/place";
import { SetLocationPage } from "../pages/set-location/set-location";
import { PlacesService } from "../services/places";
import { AgmCoreModule } from "angular2-google-maps/core";
import { Geolocation } from "@ionic-native/geolocation/index";

@NgModule({
	declarations: [
		MyApp,
		SeminarListPage,
		TabsPage,
		SigninPage,
		SignupPage,
		SeminarPage,
		FavoritesPage,
		NewSeminarPage,
		NewProfessorPage,
		ConfirmationPage,
		ConfirmationPopoverPage,
		EditAccountPage,
		BluetoothPage,
		PlacePage,
		SetLocationPage
	],
	imports: [
		IonicModule.forRoot(MyApp),
		BrowserModule,
		AgmCoreModule.forRoot({apiKey: 'AIzaSyC6J9Cd9qg4kKAmf20dgkAWJUNeWE0Q_ug'}),
		HttpModule
	],
	bootstrap: [IonicApp],
	entryComponents: [
		MyApp,
		SeminarListPage,
		TabsPage,
		SigninPage,
		SignupPage,
		SeminarPage,
		FavoritesPage,
		NewSeminarPage,
		NewProfessorPage,
		ConfirmationPage,
		ConfirmationPopoverPage,
		EditAccountPage,
		BluetoothPage,
		PlacePage,
		SetLocationPage
	],
	providers: [
		{provide: ErrorHandler, useClass: IonicErrorHandler},
		BarcodeScanner,
		BluetoothSerial,
		WebService,
		PlacesService,
		Geolocation,
		Storage
	]
})
export class AppModule {
}
