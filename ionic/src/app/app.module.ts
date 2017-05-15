import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { HttpModule } from "@angular/http"
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { EditRecipePage } from "../pages/edit-recipe/edit-recipe";
import { RecipePage } from "../pages/recipe/recipe";
import { RecipesPage } from "../pages/recipes/recipes";
import { ShoppingListPage } from "../pages/shopping-list/shopping-list";
import { TabsPage } from "../pages/tabs/tabs";
import { ShoppingListService } from "../services/shopping-list";
import { RecipesService } from "../services/recipes";
import { SigninPage } from "../pages/signin/signin";
import { SignupPage } from "../pages/signup/signup";
import { AuthService } from "../services/auth";
import { SLOptionsPage } from "../pages/shopping-list/sl-options/sl-options";
import { WebService } from "../services/webservice";
import { SeminarPage } from "../pages/seminar/seminar";

@NgModule({
    declarations: [
        MyApp,
        EditRecipePage,
        RecipePage,
        RecipesPage,
        ShoppingListPage,
        TabsPage,
        SigninPage,
        SignupPage,
        SeminarPage,
        SLOptionsPage
    ],
    imports: [
        IonicModule.forRoot(MyApp),
        BrowserModule,
        HttpModule
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        EditRecipePage,
        RecipePage,
        RecipesPage,
        ShoppingListPage,
        TabsPage,
        SigninPage,
        SignupPage,
        SeminarPage,
        SLOptionsPage
    ],
    providers: [
        {provide: ErrorHandler, useClass: IonicErrorHandler},
        ShoppingListService,
        RecipesService,
        AuthService,
        WebService
    ]
})
export class AppModule {
}
