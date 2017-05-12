import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from "../../services/auth";
import { LoadingController, AlertController } from "ionic-angular";

@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {
    
    constructor(private authService: AuthService,
                private loadingCtrl: LoadingController,
                private alertCtrl: AlertController) {}

    onSignin(form: NgForm) {
        const loading = this.loadingCtrl.create
        ({
            content: 'Signing you in...'
        });

        loading.present();

        this.authService.signin(form.value.email, form.value.password)
            .then(data => 
            {
                loading.dismiss();
                console.log("Successfully logged into " + form.value.email + " account.");
            })
            .catch(error => 
            {
                loading.dismiss();
                const alert = this.alertCtrl.create
                ({
                    title: 'Sign-in failed!',
                    message: error.message,
                    buttons: ['Ok']
                });
                alert.present();
            });
    }

}
