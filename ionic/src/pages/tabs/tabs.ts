import { Component } from '@angular/core';

import { ShoppingListPage } from "../shopping-list/shopping-list";
import { RecipesPage } from "../recipes/recipes";
import { WebService } from "../../services/webservice";
import { FavoritesPage } from "../favorites/favorites";
import { NavController } from "ionic-angular";

@Component({
    selector: 'page-tabs',
    templateUrl: 'tabs.html'
})
export class TabsPage {
    constructor(private navCtrl: NavController, private wservice: WebService) {}

    slPage = ShoppingListPage;
    recipesPage = RecipesPage;
    favoritesPage = FavoritesPage;
}
