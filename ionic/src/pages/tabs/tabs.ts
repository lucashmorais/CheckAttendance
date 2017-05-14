import { Component } from '@angular/core';

import { ShoppingListPage } from "../shopping-list/shopping-list";
import { RecipesPage } from "../recipes/recipes";
import { WebService } from "../../services/webservice";

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {
  constructor(private wservice: WebService) {}

  slPage = ShoppingListPage;
  recipesPage = RecipesPage;
}
