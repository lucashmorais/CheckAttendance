import { Component } from '@angular/core';
import { NgForm } from "@angular/forms/src/directives/ng_form";
import { NavController } from "ionic-angular/navigation/nav-controller";
import { WebService } from "../../services/webservice";
import { ToastController } from "ionic-angular/components/toast/toast-controller";

@Component({
    selector: 'edit-account',
    templateUrl: 'edit-account.html'
})
export class EditAccountPage {
    constructor(private navCtrl: NavController,
        private toastCtrl: ToastController,
        private wservice: WebService) {}

    onAddItem(form: NgForm) {
        if (form.valid) {
            console.log(form.value);

            this.wservice.changeAccountNameAndPass(form.value.name, form.value.pass)
                .subscribe(wasItSuccessfull => {
                    if (wasItSuccessfull) {
                        var toastMessageConfirmingAddition = this.toastCtrl.create
                        ({
                            message: "Cadastro atualizado com sucesso!",
                            duration: 2000,
                            position: "bottom"
                        });
                        toastMessageConfirmingAddition.present();
                    }
                    else {
                        var toastMessageConfirmingAddition = this.toastCtrl.create
                        ({
                            message: "Não foi possível atualizar o cadastro. Por favor, tente novamente mais tarde",
                            duration: 8000,
                            position: "bottom"
                        });
                        toastMessageConfirmingAddition.present();
                    }
                })
            form.reset();
        }
    }
}
