import { Http, Response } from "@angular/http";
import { Injectable } from "@angular/core";

@Injectable()
export class WebService {
    NUSP = 123456;

    constructor(private http: Http) {}

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

    isProfessor() {
        return false;
    }

    userID() {
        return this.NUSP;
    }

    userIsSignedIn() {
        return this.NUSP != -1;
    }

}
