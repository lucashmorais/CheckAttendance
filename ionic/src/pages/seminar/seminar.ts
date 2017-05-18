import { Component } from "@angular/core";
import { SeminarInfo } from "../../models/seminar_info";
import { NavController, NavParams } from "ionic-angular";
import { OnInit } from "@angular/core";
import { WebService } from "../../services/webservice";
import { PopoverController } from "ionic-angular/components/popover/popover-controller";
import { ConfirmationPopoverPage } from "./conf-popover/conf-popover";
import { SetLocationPage } from "../set-location/set-location";
import { ModalController } from "ionic-angular/components/modal/modal-controller";
import { Location } from "../../models/location";
import { ToastController } from "ionic-angular/components/toast/toast-controller";

@Component({
	selector: 'seminar',
	templateUrl: 'seminar.html'
})
export class SeminarPage implements OnInit {
	private seminar_info: SeminarInfo;
	attendees = ['Albert', 'Philip'];
	location: Location = {
		lat: -23.5590199,
		lng: -46.7316741
	};
	locationIsSet = false;
	imageUrl = '';

	constructor(public navCtrl: NavController,
		public popoverCtrl: PopoverController,
		public modalCtrl: ModalController,
		public toastCtrl: ToastController,
		public wservice: WebService,
		public navParams: NavParams) {
	}

	presentPopover() {
		let popover = this.popoverCtrl.create(ConfirmationPopoverPage, {server_seminar_index: this.seminar_info.id});
		popover.present();
	}

	ngOnInit() {
		this.seminar_info = this.navParams.get('seminar_info');
	}

	onRemoveSeminar() {
		this.wservice.removeSeminarInfoFromServer(this.seminar_info);
		//TODO: Make sure the page is only popped after the html request was resolved
		//      and more updated seminar list information could have been fetched from
		//      the server
		this.navCtrl.pop();
	}

	onOpenMap() {
		const modal = this.modalCtrl.create(SetLocationPage,
			{location: this.location, isSet: this.locationIsSet});
		modal.present();
		modal.onDidDismiss(
			data => {
				if (data) {
					this.location = data.location;
					console.log(this.location);
					this.locationIsSet = true;
					var toastMessageConfirmingAttendance = this.toastCtrl.create
					({
						message: "Local do seminário atualizado! Basta agora esperar que os alunos reportem uma localização próxima à do evento para receberem a confirmação de presença.",
						duration: 10000,
						position: "bottom"
					});
					toastMessageConfirmingAttendance.present();
				}
				else {
				}
			}
		);
	}
}
