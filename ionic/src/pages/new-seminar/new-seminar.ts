import { Component } from "@angular/core";
import { NgForm } from "@angular/forms/src/directives/ng_form";
import { NavController } from "ionic-angular";

@Component({
    selector: 'new-seminar',
    templateUrl: 'new-seminar.html'
})
export class NewSeminarPage {
    constructor(private navCtrl: NavController) {}

    onAddItem(form: NgForm) {
        if (form.valid) {
            console.log(form);
            form.reset();
        }
    }
}
