export class SeminarInfo {

    public favorite = false;

    constructor (public name: string,
        public id: number,
        public lecturer: string,
        public time_hour: number,
        public time_min: number,
        public place: string) {}
}
