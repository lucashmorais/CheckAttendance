import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoadingController, AlertController } from "ionic-angular";
import { WebService } from "../../services/webservice";
import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular/module";

@NgModule({
  declarations: [
    SigninPage,
  ],
  imports: [
    IonicPageModule.forChild(SigninPage),
  ],
  exports: [
    SigninPage
  ]
})

@Component({
    selector: 'page-signin',
    templateUrl: 'signin.html',
})
export class SigninPage {

    constructor(private wservice: WebService,
        private loadingCtrl: LoadingController,
        private alertCtrl: AlertController) {}

    onSignin(form: NgForm) {
        this.wservice.authChangeSubject
            .subscribe (
                nusp => {
                    if (nusp == -1) {
                        const alert = this.alertCtrl.create
                        ({
                            title: 'Falha de login',
                            message: 'Verifique, por favor, o usuário e a senha.',
                            buttons: ['Ok']
                        });
                        alert.present();
                    }
                }
            );

        this.wservice.signInWithNUSPAndPass(form.value.nusp, form.value.pass);
    }
}
