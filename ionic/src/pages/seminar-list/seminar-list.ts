import { PopoverController } from 'ionic-angular';
import { Component } from '@angular/core';
import { NgForm } from "@angular/forms";

import { WebService } from "../../services/webservice";
import { ToastController } from "ionic-angular/components/toast/toast-controller";
import { NavController } from "ionic-angular/navigation/nav-controller";
import { SeminarPage } from "../seminar/seminar";

@Component({
    selector: 'seminar-list',
    templateUrl: 'seminar-list.html'
})
export class SeminarListPage {
    constructor(private navCtrl: NavController,
        private popoverCtrl: PopoverController,
        private toastCtrl: ToastController,
        private wservice: WebService) {}

    public seminarInfoListCopy;

    ionViewWillEnter() {
        this.wservice.getSeminarsInfoListFromServer()
            .subscribe(data => {
                console.log("[ionViewWillEnter]: Here comes the data we received from the Subject.");
                console.log(data);
                this.seminarInfoListCopy = data;
            });
    }

    onAddItem(form: NgForm) {
        form.reset();
    }

    onCheckItem(seminarInfo) {
        this.navCtrl.push(SeminarPage, {seminar_info: seminarInfo});
    }

    getServerIndexFromLocalIndex(local_seminar_index: number) {
        return this.seminarInfoListCopy[local_seminar_index].id;
    }

    addToFavorites(local_seminar_index: number) {
        this.wservice.addToFavoritesByIndex(this.getServerIndexFromLocalIndex(local_seminar_index));
        this.seminarInfoListCopy[local_seminar_index].favorite = true;

        var toastMessageConfirmingAddition = this.toastCtrl.create
        ({
            message: "Seminário favoritado!",
            duration: 2000,
            position: "bottom"
        });
        toastMessageConfirmingAddition.present();
    }

    removeFromFavorites(local_seminar_index: number) {
        this.seminarInfoListCopy[local_seminar_index].favorite = false;
        this.wservice.removeFromFavoritesByIndex(this.getServerIndexFromLocalIndex(local_seminar_index));

        var toastMessageConfirmingAddition = this.toastCtrl.create
        ({
            message: "Seminário desfavoritado!",
            duration: 2000,
            position: "bottom"
        });
        toastMessageConfirmingAddition.present();
    }

    isSeminarInFavoritesByIndex(local_seminar_index: number) {
        return this.wservice.isInFavorites(this.getServerIndexFromLocalIndex(local_seminar_index));
    }
}
