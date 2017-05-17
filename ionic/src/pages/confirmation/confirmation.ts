import { Component } from "@angular/core";
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

@Component({
    selector: 'confirmation',
    templateUrl: 'confirmation.html'
})
export class ConfirmationPage {
    constructor(public barScanner: BarcodeScanner) {
    }

    onBarcodeScan() {
        console.log("[onBarcodeScan]: Just entered the bar scanning function.");
        this.barScanner.scan().then((barcodeData) => {
            console.log(barcodeData);
        }, (err) => {
            console.log(err);
        });
    }
}
