import { PopoverController } from 'ionic-angular';
import { Component } from '@angular/core';
import { NgForm } from "@angular/forms";

import { ShoppingListService } from "../../services/shopping-list";
import { AuthService } from "../../services/auth";
import { SLOptionsPage } from "./sl-options/sl-options";
import { WebService } from "../../services/webservice";

@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html'
})
export class ShoppingListPage {
  listItems: any[];

    constructor(private slService: ShoppingListService,
                private popoverCtrl: PopoverController,
                private authService: AuthService,
		private wservice: WebService) {}

  ionViewWillEnter() {
    this.loadItems();
  }

  onAddItem(form: NgForm) {
    this.slService.addItem(form.value.ingredientName, form.value.amount);
    form.reset();
    this.loadItems();
  }

  onCheckItem(index: number) {
    this.slService.removeItem(index);
    this.loadItems();
  }

  onShowOptions(mouseEvent: MouseEvent) {
    const popover = this.popoverCtrl.create(SLOptionsPage);
    popover.present({ev: mouseEvent});
    popover.onDidDismiss
    (
        data =>
        {
            if (data != null) {
                if (data.action == 'load') {
                }
                else {
                    this.authService.getActiveUser().getToken()
                        .then
                        (
                            (token: string) =>
                            {
                                this.slService.storeList(token)
                                    .subscribe
                                    (
                                        () => console.log("Successfully updated the DB!"),
                                        error => console.log(error)
                                    );
                            }
                        )
                }
            }
        }
    );
  }

  private loadItems() {
    this.wservice.listSeminars()
      .subscribe
      (
	  (data) =>
	  {
	      this.listItems = data.data;
	      console.log(this.listItems);
	  },
	  error => console.log(error)
      );
  }
}
