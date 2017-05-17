import { Component } from "@angular/core";
import { NgForm } from "@angular/forms/src/directives/ng_form";
import { LoadingController, AlertController } from "ionic-angular";
import { WebService } from "../../services/webservice";
import { ToastController } from "ionic-angular/components/toast/toast-controller";

@Component({
    selector: 'new-professor',
    templateUrl: 'new-professor.html'
})
export class NewProfessorPage {
    constructor(private wservice: WebService,
        private loadingCtrl: LoadingController,
        private toastCtrl: ToastController,
        private alertCtrl: AlertController) {}

    onAddProfessor(form: NgForm) {
        const loading = this.loadingCtrl.create ({
            content: 'Aguarde enquanto se faz o cadastro...'
        });

        loading.present();

        this.wservice.signUpWithNUSPNameAndPass(form.value.nusp, form.value.name, form.value.pass, true)
            .subscribe(wasItSuccessfull => {
                loading.dismiss();

                if (wasItSuccessfull == true) {
                    var toastMessageConfirmingAddition = this.toastCtrl.create
                    ({
                        message: "Cadastro de novo professor feito com sucesso!",
                        duration: 2500,
                        position: "bottom"
                    });
                    toastMessageConfirmingAddition.present();
                }
                else {
                    var toastMessageConfirmingAddition = this.toastCtrl.create
                    ({
                        message: "Erro: " + this.wservice.getLastSignupErrorMessage(),
                        duration: 8000,
                        position: "bottom"
                    });
                    toastMessageConfirmingAddition.present();
                }
            });


        form.reset();
    }
}
