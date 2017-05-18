import { Location } from "./location";
export class SeminarInfo {

    public favorite = false;
	public location = new Location(0, 0);

    constructor (public name: string,
        public id: number,
        public lecturer: string,
        public time_hour: number,
        public time_min: number,
        public place: string) {}
}
