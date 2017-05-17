import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoadingController, AlertController } from "ionic-angular";
import { WebService } from "../../services/webservice";
import { ToastController } from "ionic-angular/components/toast/toast-controller";

@Component({
    selector: 'page-signup',
    templateUrl: 'signup.html',
})
export class SignupPage {

    constructor(private wservice: WebService,
        private loadingCtrl: LoadingController,
        private toastCtrl: ToastController,
        private alertCtrl: AlertController) {}

    onSignup(form: NgForm) {
        const loading = this.loadingCtrl.create ({
            content: 'Aguarde enquanto se faz o cadastro...'
        });

        loading.present();

        this.wservice.signUpWithNUSPNameAndPass(form.value.nusp, form.value.name, form.value.pass, false)
            .subscribe(wasItSuccessfull => {
                loading.dismiss();

                if (wasItSuccessfull) {
                    var toastMessageConfirmingAddition = this.toastCtrl.create
                    ({
                        message: "Cadastro feito com sucesso!",
                        duration: 2000,
                        position: "bottom"
                    });
                    toastMessageConfirmingAddition.present();
                }
                else {
                    var errorToastMessage = this.toastCtrl.create
                    ({
                        message: "Erro: " + this.wservice.getLastSignupErrorMessage(),
                        duration: 8000,
                        position: "bottom"
                    });
                    errorToastMessage.present();
                }
            });


        form.reset();
    }

}
