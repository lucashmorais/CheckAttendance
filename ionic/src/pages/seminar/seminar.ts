import { Component } from "@angular/core";
import { SeminarInfo } from "../../models/seminar_info";
import { NavController, NavParams } from "ionic-angular";
import { OnInit } from "@angular/core";
import { WebService } from "../../services/webservice";

@Component({
    selector: 'seminar',
    templateUrl: 'seminar.html'
})
export class SeminarPage implements OnInit {
    //private seminar_info = new SeminarInfo("Seminário legal", 14, "Someone of Somewhere", 19, 0, "IME-USP");
    private seminar_info: SeminarInfo;
    attendees = ['Albert', 'Philip'];

    constructor(public navCtrl: NavController,
        public wservice: WebService,
        public navParams: NavParams) {
    }

    ngOnInit() {
        this.seminar_info = this.navParams.get('seminar_info');
    }
}
