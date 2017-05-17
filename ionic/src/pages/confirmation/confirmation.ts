import { Component } from "@angular/core";
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { WebService } from "../../services/webservice";
import { ToastController } from "ionic-angular/components/toast/toast-controller";

@Component({
    selector: 'confirmation',
    templateUrl: 'confirmation.html'
})
export class ConfirmationPage {
    public lastScannedData = "";

    constructor(public barScanner: BarcodeScanner,
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
    } }
