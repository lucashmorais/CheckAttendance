import { Http, Response } from "@angular/http";
import { Injectable } from "@angular/core";
import { SeminarInfo } from "../models/seminar_info";

@Injectable()
export class WebService {
    NUSP = 123456;
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
}
