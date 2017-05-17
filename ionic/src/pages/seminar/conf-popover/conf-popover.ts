import { Component, OnInit } from "@angular/core";
import { NavParams } from "ionic-angular/navigation/nav-params";

@Component({
    selector: 'conf-popover',
    templateUrl: 'conf-popover.html'
})
export class ConfirmationPopoverPage implements OnInit {
    server_seminar_index = -1;

    constructor(private navParams: NavParams) {}

    ngOnInit() {
        this.server_seminar_index = this.navParams.get('server_seminar_index');
    }
}
