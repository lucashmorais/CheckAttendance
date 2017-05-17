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
        const loading = this.loadingCtrl.create
        ({
            content: 'Signing you up...'
        });

        loading.present();

        this.wservice.signUpWithNUSPNameAndPass(form.value.nusp, form.value.name, form.value.pass);

        loading.dismiss();
        /*
            .then(data => 
            {
                loading.dismiss();
                console.log("New user was successfully created.");
            })
            .catch(error => 
            {
                loading.dismiss();
                const alert = this.alertCtrl.create
                ({
                    title: 'Signup failed!',
                    message: error.message,
                    buttons: ['Ok']
                });
                alert.present();
            });
         */
    }

}
