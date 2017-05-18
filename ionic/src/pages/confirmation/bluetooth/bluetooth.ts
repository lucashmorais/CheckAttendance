import { Component } from "@angular/core";
import { ToastController } from "ionic-angular/components/toast/toast-controller";
import { WebService } from "../../../services/webservice";
import { AlertController } from "ionic-angular/components/alert/alert-controller";

@Component({
	selector: 'bluetooth',
	templateUrl: 'bluetooth.html'
})
export class BluetoothPage {
	public isBluetoothEnabled = false;
	public enableMessage;
	public paired_device_list = [];
	public unpaired_device_list = [];
	public connectionMessage = "";
	public bluetooth = (<any>window).networking.bluetooth;

	constructor(
		public wservice: WebService,
		public toastCtrl: ToastController,
		private alertCtrl: AlertController) {
	}

	ionViewWillEnter() {
		if(!this.bluetooth.isEnabled()) {
			var alert = this.alertCtrl.create({
				title: "Bluetooth desabilitado!",
				message: "Para usar esta funcionalidade, por favor habilite o Bluetooth"})
	
			alert.present();
		}
	}

	onEnableBluetooth() {
		this.bluetooth.isEnabled()
			.then(status => {
				this.isBluetoothEnabled = status;

				if (!status) {
					this.bluetooth.enable()
						.then(data => {
							this.enableMessage = data;
						})
						.catch(err => {
							this.enableMessage = err;
						});
				}
			})
			.catch(err => {console.log(err)});
	}

	getAllBluetoothDevices(){
		this.bluetooth.isEnabled()
			.then((data)=> {
				// not sure of returning value, probably a boolean
				console.log("dont know what it returns"+data);

				// returns all the available devices, not just the unpaired ones
				this.bluetooth.list().then((allDevices) => {
					// set the list to returned value
					this.paired_device_list = allDevices;

					if(!(this.paired_device_list.length > 0)){
						this.enableMessage = "could not find any bluetooth devices";
					}
				});
			})
			.catch(err => {
				console.log(err);
			});
	}

	onTalkWithDeviceWithAddr(mac_addr: string) {
		this.bluetooth.connect(mac_addr)	
			.subscribe(data => this.connectionMessage = data);
	}

	discoverUnpairedDevices() {
		this.bluetooth.discoverUnpaired()
			.then(device_list => {
				this.unpaired_device_list = device_list;
			})
			.catch(err => console.log(err));
	}
}
