import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, MenuController } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { AuthService } from "../services/auth";
import firebase from 'firebase';

import { TabsPage } from "../pages/tabs/tabs";
import { SigninPage } from "../pages/signin/signin";
import { SignupPage } from "../pages/signup/signup";
import { WebService } from "../services/webservice";
import { NewSeminarPage } from "../pages/new-seminar/new-seminar";
import { NewProfessorPage } from "../pages/new-professor/new-professor";
import { EditAccountPage } from "../pages/edit-account/edit-account";

@Component({
    templateUrl: 'app.html',
    providers: [StatusBar, SplashScreen]
})
export class MyApp {
    isAuthenticated = false;

    tabsPage = TabsPage;
    signinPage = SigninPage;
    signupPage = SignupPage;
    newSeminarPage = NewSeminarPage;
    newProfessorPage = NewProfessorPage;
    editAccountPage = EditAccountPage;

    rootPage: any = this.signinPage;

    @ViewChild('nav') nav: NavController;

    constructor(platform: Platform,
        private menuCtrl: MenuController,
        private authService: AuthService,
        private wservice: WebService,
        private statusbar: StatusBar,
        private splashscreen: SplashScreen) {

        firebase.initializeApp
        ({
            apiKey: "AIzaSyCNUczHXC0NtHjEUsOVpJrNWJqGNPLdHDk",
            authDomain: "ionic2-recipebook-80089.firebaseapp.com"
        });

        wservice.authChangeSubject
            .subscribe
        (   nusp =>
            {
                if (nusp > -1) {
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
            statusbar.styleDefault();
            splashscreen.hide();
        });
    }

    onLoad(page: any) {
        this.nav.setRoot(page);
        this.menuCtrl.close();
    }

    onLogout() {
        this.wservice.logout();
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
        return this.wservice.isUserSignedIn();
    }
}
