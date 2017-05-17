import { Component } from "@angular/core";
import { SeminarInfo } from "../../models/seminar_info";
import { NavController, NavParams } from "ionic-angular";
import { OnInit } from "@angular/core";
import { WebService } from "../../services/webservice";
import { PopoverController } from "ionic-angular/components/popover/popover-controller";
import { ConfirmationPopoverPage } from "./conf-popover/conf-popover";

@Component({
    selector: 'seminar',
    templateUrl: 'seminar.html'
})
export class SeminarPage implements OnInit {
    private seminar_info: SeminarInfo;
    attendees = ['Albert', 'Philip'];

    constructor(public navCtrl: NavController,
        public popoverCtrl: PopoverController,
        public wservice: WebService,
        public navParams: NavParams) {
    }

    presentPopover(ev) {
        let popover = this.popoverCtrl.create(ConfirmationPopoverPage);
        popover.present({ev: ev});
    }

    ngOnInit() {
        this.seminar_info = this.navParams.get('seminar_info');
    }

    onRemoveSeminar() {
        this.wservice.removeSeminarInfoFromServer(this.seminar_info);
        //TODO: Make sure the page is only popped after the html request was resolved
        //      and more updated seminar list information could have been fetched from
        //      the server
        this.navCtrl.pop();
    }
}
