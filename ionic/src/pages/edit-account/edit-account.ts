import { Component } from '@angular/core';
import { NgForm } from "@angular/forms/src/directives/ng_form";
import { NavController } from "ionic-angular/navigation/nav-controller";

@Component({
    selector: 'edit-account',
    templateUrl: 'edit-account.html'
})
export class EditAccountPage {
    constructor(private navCtrl: NavController) {}

    onAddItem(form: NgForm) {
        if (form.valid) {
            console.log(form.value);
            form.reset();
        }
    }
}
