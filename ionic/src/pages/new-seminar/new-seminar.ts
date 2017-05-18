import { Component } from "@angular/core";
import { NgForm } from "@angular/forms/src/directives/ng_form";
import { ToastController } from "ionic-angular/components/toast/toast-controller";
import { LoadingController } from "ionic-angular/components/loading/loading-controller";
import { WebService } from "../../services/webservice";
import { AlertController } from "ionic-angular/components/alert/alert-controller";
import { SeminarInfo } from "../../models/seminar_info";

@Component({
    selector: 'new-seminar',
    templateUrl: 'new-seminar.html'
})
export class NewSeminarPage {
    constructor(private wservice: WebService,
        private loadingCtrl: LoadingController,
        private toastCtrl: ToastController,
        private alertCtrl: AlertController) {}

    onAddItem(form: NgForm) {
        const loading = this.loadingCtrl.create ({
            content: 'Aguarde enquanto se faz o cadastro...'
        });

        loading.present();

        //TODO: Fix transmission of hour information!
        this.wservice.addSeminarInfoToServer(new SeminarInfo(form.value.name, form.value.id, form.value.lecturer, 19, 0, form.value.place))
            .subscribe(wasItSuccessfull => {
                loading.dismiss();

                if (wasItSuccessfull == true) {
                    var toastMessageConfirmingAddition = this.toastCtrl.create
                    ({
                        message: "Seminário cadastrado/editado com sucesso!",
                        duration: 2500,
                        position: "bottom"
                    });
                    toastMessageConfirmingAddition.present();
                }
                else {
                    var toastMessageConfirmingAddition = this.toastCtrl.create
                    ({
                        message: "Erro: " + this.wservice.getLastSeminarAddErrorMessage(),
                        duration: 8000,
                        position: "bottom"
                    });
                    toastMessageConfirmingAddition.present();
                }
            });


        form.reset();
    }
}
