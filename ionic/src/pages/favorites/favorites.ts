import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { SeminarPage } from "../seminar/seminar";
import { WebService } from "../../services/webservice";
import { ToastController } from "ionic-angular/components/toast/toast-controller";

@Component ({
    selector: 'favorites',
    templateUrl: 'favorites.html'
})
export class FavoritesPage {
    private favoritesListCopy = [];

    constructor(private navCtrl: NavController, private wservice: WebService, private toastCtrl: ToastController) {
    }

    ionViewWillEnter() {
        this.favoritesListCopy = this.wservice.getFavorites();
    }

    onCheckItem(seminar_index) {
        this.navCtrl.push(SeminarPage, {seminar_info: this.wservice.getSeminarByIndex(seminar_index)});
    }

    removeFromFavorites(server_seminar_index: number) {
        this.wservice.removeFromFavoritesByIndex(server_seminar_index);

        var toastMessageConfirmingAddition = this.toastCtrl.create
        ({
            message: "Seminário desfavoritado!",
            duration: 2000,
            position: "bottom"
        });
        toastMessageConfirmingAddition.present();
    }
}
