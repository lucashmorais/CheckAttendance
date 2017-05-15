import { Component } from "@angular/core";

@Component({
  selector: 'seminar',
  templateUrl: 'seminar.html'
})

export class SeminarPage {
    attendees = ['Albert', 'Philip'];
    name = "Seminário legal";
    lecturer = "Someone of Somewhere"
    time_hour = 19;
    time_min = 0;
    place = "IME-USP";
}
