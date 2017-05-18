import { Component } from '@angular/core';

import { SeminarListPage } from "../seminar-list/seminar-list";
import { WebService } from "../../services/webservice";
import { FavoritesPage } from "../favorites/favorites";
import { NavController } from "ionic-angular";
import { NewSeminarPage } from "../new-seminar/new-seminar";
import { ConfirmationPage } from "../confirmation/confirmation";

@Component({
    selector: 'page-tabs',
    templateUrl: 'tabs.html'
})
export class TabsPage {
    constructor(
        private navCtrl: NavController,
        private wservice: WebService
    ) {}

    slPage = SeminarListPage;
    favoritesPage = FavoritesPage;
    newSeminarPage = NewSeminarPage;
    confirmationPage = ConfirmationPage;
}
