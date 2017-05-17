import { Http, Response, Headers } from "@angular/http";
import { Injectable } from "@angular/core";
import { SeminarInfo } from "../models/seminar_info";
import 'rxjs/add/operator/map'

@Injectable()
export class WebService {
    private NUSP = 123456;
    private listFavoriteIDs = [];
    rawSeminarList = [];
    seminarInfoList = [];
    isSeminarFavorite = [];

    constructor(private http: Http) {
        this.listFavoriteIDs.push(1);
        this.listFavoriteIDs.push(2);

        for (let i = 0; i < 1000; i++)
            this.isSeminarFavorite[i] = false;
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
        this.listSeminars()
            .subscribe
        (
            (data) =>
            {
                this.rawSeminarList = data.data;
                this.seminarInfoList = this.seminarInfoListFromRawSeminarList(data.data);
            },
            error => console.log(error)
        );

        return this.seminarInfoList;
    }

    isProfessor() {
        return true;
    }

    userID() {
        return this.NUSP;
    }

    userIsSignedIn() {
        return this.NUSP != -1;
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
}
