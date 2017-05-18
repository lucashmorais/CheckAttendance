import { Component } from "@angular/core";
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { WebService } from "../../services/webservice";
import { ToastController } from "ionic-angular";
import { NavController } from "ionic-angular/navigation/nav-controller";
import { Geolocation } from '@ionic-native/geolocation';
import { Location } from "../../models/location";
import { LoadingController } from "ionic-angular";

@Component({
	selector: 'confirmation',
	templateUrl: 'confirmation.html'
})
export class ConfirmationPage {
	location = new Location(0, 0);
	locationIsSet = false;

	public lastScannedData = "";

	constructor(public barScanner: BarcodeScanner,
		public navCtrl: NavController,
		public geoLoc: Geolocation,
		public loadingCtrl: LoadingController,
		public wservice: WebService,
		public toastCtrl: ToastController) {}

	onBarcodeScan() {
		console.log("[onBarcodeScan]: Just entered the bar scanning function.");
		this.barScanner.scan().
			then((barcodeData) => {
				this.lastScannedData = barcodeData.text;
				this.wservice.confirmAttendanceForSeminarWithServerIndex(parseInt(barcodeData.text))
					.subscribe(wasItSuccessfull => {
						if (wasItSuccessfull) {
							var toastMessageConfirmingAttendance = this.toastCtrl.create
							({
								message: "Seminário com id: " + this.lastScannedData + " for confirmado com sucesso!",
								duration: 5000,
								position: "bottom"
							});
							toastMessageConfirmingAttendance.present();
						}
						else {
							var toastMessageConfirmingAttendance = this.toastCtrl.create
							({
								message: "Erro de comunicação com o servidor de confirmação. Por favor, tente novamente.",
								duration: 7000,
								position: "bottom"
							});
							toastMessageConfirmingAttendance.present();
						}
					});

			}, (err) => {
				var toastMessageConfirmingAttendance = this.toastCtrl.create
				({
					message: "Não foi possível ler o código de confirmação. Por favor, tente novamente.",
					duration: 7000,
					position: "bottom"
				});
				toastMessageConfirmingAttendance.present();
			});
	}

	onMapClick() {
		const loader = this.loadingCtrl.create({
			content: 'Getting your Location...'
		});
		loader.present();
		this.geoLoc.getCurrentPosition()
			.then(
				location => {
					loader.dismiss();
					this.location.lat = location.coords.latitude;
					this.location.lng = location.coords.longitude;
					this.locationIsSet = true;
				}
			)
			.catch(
				error => {
					loader.dismiss();
					const toast = this.toastCtrl.create({
						message: 'Não foi possível deteminar a localização atual. Por favor, tente novamente.',
						duration: 2500
					});
					toast.present();
				}
			);
	}

}
