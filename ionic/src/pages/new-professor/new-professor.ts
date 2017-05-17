import { Component } from "@angular/core";
import { NgForm } from "@angular/forms/src/directives/ng_form";
import { NavController } from "ionic-angular";

@Component({
    selector: 'new-professor',
    templateUrl: 'new-professor.html'
})
export class NewProfessorPage {
    constructor(private navCtrl: NavController) {}

    onAddItem(form: NgForm) {
        if (form.valid) {
            console.log(form.value);
            form.reset();
        }
    }
}
