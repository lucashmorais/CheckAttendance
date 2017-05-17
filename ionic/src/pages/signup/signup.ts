import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoadingController, AlertController } from "ionic-angular";
import { WebService } from "../../services/webservice";

@Component({
    selector: 'page-signup',
    templateUrl: 'signup.html',
})
export class SignupPage {

    constructor(private wservice: WebService,
        private loadingCtrl: LoadingController,
        private alertCtrl: AlertController) {}

    onSignup(form: NgForm) {
        const loading = this.loadingCtrl.create ({
            content: 'Aguarde enquanto se faz o cadastro...'
        });

        loading.present();

        this.wservice.signUpWithNUSPNameAndPass(form.value.nusp, form.value.name, form.value.pass);

        loading.dismiss();

        form.reset();
    }

}
