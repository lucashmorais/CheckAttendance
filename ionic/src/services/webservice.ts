import { Http, Response, Headers } from "@angular/http";
import { Injectable } from "@angular/core";
import { SeminarInfo } from "../models/seminar_info";
import { LoadingController } from "ionic-angular/components/loading/loading-controller";
import { Subject } from "rxjs/Subject";
import 'rxjs/add/operator/map'

@Injectable()
export class WebService {
    private NUSP = 123456;
    private listFavoriteIDs = [];
    public authChangeSubject;
    userKind = -1;
    rawSeminarList = [];
    seminarInfoList = [];
    isSeminarFavorite = [];

    constructor(private http: Http,
        private loadingCtrl: LoadingController) {

        for (let i = 0; i < 1000; i++)
        this.isSeminarFavorite[i] = false;

        this.authChangeSubject = new Subject();
    }

    listSeminars() {
        return this.http
            .get('http://207.38.82.139:8001/seminar')
            .map
        (
            (response: Response) =>
            {
                return response.json();
            }
        );
    }

    seminarInfoListFromRawSeminarList(rawList) {
        return rawList.map(
            element => {return new SeminarInfo(element.name, element.id, "Jenivaldo da Patagônia", 19, 0, "IME-USP")}
        );
    }

    getSeminarsInfoListFromServer() {
        const loading = this.loadingCtrl.create
        ({
            content: 'Atualizando lista de seminários...'
        });

        loading.present();

        this.listSeminars()
            .subscribe
        (
            (data) => {
                this.rawSeminarList = data.data;
                this.seminarInfoList = this.seminarInfoListFromRawSeminarList(data.data);
                loading.dismiss();
            },
            error => {
                console.log(error);
                loading.dismiss();
            }
        );

        return this.seminarInfoList;
    }

    isProfessor() {
        return this.userKind == 1;
    }

    userID() {
        return this.NUSP;
    }

    isUserSignedIn() {
        return this.userKind != -1;
    }

    getFavorites() {
        return this.seminarInfoList.filter((element, index) => {return this.isInFavorites(element.id)});
    }

    getSeminarByServerIndex(server_seminar_index: number) {
        return this.seminarInfoList.filter(element => {return (element.id == server_seminar_index)})[0];
    }

    addToFavoritesByIndex(server_seminar_index: number) {
        this.isSeminarFavorite[server_seminar_index] = true;
        this.seminarInfoList[server_seminar_index].favorite = true;
    }

    removeFromFavoritesByIndex(server_seminar_index: number) {
        this.isSeminarFavorite[server_seminar_index] = false;
        this.seminarInfoList[server_seminar_index].favorite = false;
    }

    isInFavorites(server_seminar_index: number) {
        return (this.isSeminarFavorite[server_seminar_index] == true);
    }

    createFormRequest(obj) {
        var str = [];
        for(var p in obj)
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        return str.join("&");
    }

    signUpWithNUSPNameAndPass(nusp: number, name: string, pass: string) {
        console.log("[signUpWithNUSPNameAndPass]: Used parameters: " + nusp + ", " + name + " and " + pass);

        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');

        let body = this.createFormRequest({nusp: nusp, name: name, pass: pass});
        console.log(body);

        return this.http.post('http://207.38.82.139:8001/student/add', body, {headers: headers})
            .map(res => res.json())
            .subscribe(data => {
                console.log(data);
            });
    }

    changeAccountNameAndPass(name: string, pass: string) {
        console.log("[changeAccountNameAndPass]: Used parameters: " + JSON.stringify({name: name, pass: pass}));

        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');

        let body = this.createFormRequest({nusp: this.NUSP, name: name, pass: pass});
        console.log(body);

        let editionSubject = new Subject();

        this.http.post('http://207.38.82.139:8001/' + (this.isProfessor() ? 'teacher' : 'student') + '/edit', body, {headers: headers})
            .map(res => res.json())
            .subscribe(data => {
                console.log(data);
                editionSubject.next(data.success);
            });

        return editionSubject;
    }

    signInWithNUSPAndPass(nusp: number, pass: string) {
        console.log("[signInWithNUSPAndPass]: Used parameters: " + nusp + ", " + name + " and " + pass);

        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');

        let body = this.createFormRequest({nusp: nusp, pass: pass});
        console.log(body);

        var studentLoginAttemptStatus = false;
        var professorLoginAttemptStatus = false;

        const loading = this.loadingCtrl.create
        ({
            content: 'Aguarde enquanto efetuamos o login...'
        });

        loading.present();

        this.http.post('http://207.38.82.139:8001/login/student', body, {headers: headers})
            .map(res => res.json())
            .subscribe(data => {
                studentLoginAttemptStatus = data.success;
                console.log(data);

                if (studentLoginAttemptStatus == false) {
                    console.log("[signInWithNUSPAndPass]: Login as student fail. We'll try to login as professor now.");

                    this.http.post('http://207.38.82.139:8001/login/teacher', body, {headers: headers})
                        .map(res => res.json())
                        .subscribe(data => {
                            professorLoginAttemptStatus = data.success;
                            console.log(data);

                            if (professorLoginAttemptStatus == false) {
                                //This represents a failed attempt to login as any kind of user
                                this.userKind = -1;
                                this.NUSP = -1;
                                this.authChangeSubject.next(-1);
                                loading.dismiss();
                            }
                            else {
                                //This represents a successfull login as a professor
                                this.userKind = 1;
                                this.NUSP = nusp;
                                this.authChangeSubject.next(nusp);
                                loading.dismiss();
                            }
                        });
                }
                else {
                    //This represents a successfull login as a student
                    this.userKind = 0;
                    this.NUSP = nusp;
                    this.authChangeSubject.next(nusp);
                    loading.dismiss();
                }
            });
    }

    logout() {
        this.userKind = -1;
        this.NUSP = -1;
        //This helps subscribers to this Subject know that this is not
        //a failed login attempt, but simply a logout operation
        this.authChangeSubject.next(-2);
    }
}
