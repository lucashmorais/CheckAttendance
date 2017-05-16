import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, MenuController } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { AuthService } from "../services/auth";
import firebase from 'firebase';

import { TabsPage } from "../pages/tabs/tabs";
import { SigninPage } from "../pages/signin/signin";
import { SignupPage } from "../pages/signup/signup";
import { WebService } from "../services/webservice";
import { FavoritesPage } from "../pages/favorites/favorites";

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    isAuthenticated = false;

    tabsPage = TabsPage;
    signinPage = SigninPage;
    signupPage = SignupPage;
    userID = 123456;

    rootPage: any = this.tabsPage;

    @ViewChild('nav') nav: NavController;

    constructor(platform: Platform,
        private menuCtrl: MenuController,
        private authService: AuthService,
        private wservice: WebService) {

        firebase.initializeApp
        ({
            apiKey: "AIzaSyCNUczHXC0NtHjEUsOVpJrNWJqGNPLdHDk",
            authDomain: "ionic2-recipebook-80089.firebaseapp.com"
        });

        firebase.auth().onAuthStateChanged
        (   user =>
            {
                if (user) {
                    this.isAuthenticated = true;
                    this.rootPage = this.tabsPage;
                }
                else {
                    this.isAuthenticated = false;
                    this.rootPage = this.signinPage;
                }
            }
        );

        platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            StatusBar.styleDefault();
            Splashscreen.hide();
        });
    }

    onLoad(page: any) {
        //this.nav.setRoot(FavoritesPage, {seminar_info: new SeminarInfo("Seminário legal", 14, "Someone of Somewhere", 19, 0, "IME-USP")})
        this.nav.setRoot(page);
        this.menuCtrl.close();
    }

    onLogout() {
        this.authService.logout();
        this.menuCtrl.close();
        this.nav.setRoot(this.tabsPage);
    }

    displayName() {
        return "" + this.wservice.userID();
    }

    displayUserKind() {
        if (this.wservice.isProfessor())
            return "professor";
        else
            return "aluno";
    }

    userIsSignedIn() {
        return this.wservice.userIsSignedIn();
    }
}
