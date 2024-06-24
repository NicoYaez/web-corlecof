export default class SportsWorkShop {
    #profesional;
    #startTime;
    #endTime;
    #duration;
    #participants;
    #name;
    #date;
    #description;
    #type;
    #maxParticipants;
    constructor(profesional, startTime, endTime, duration, participants,
        name, date, description, type, maxParticipants){
        this.#profesional = profesional;
        this.#startTime = startTime;
        this.#endTime = endTime;
        this.#duration = duration;
        this.#participants = participants;
        this.#name = name;
        this.#date = date;
        this.#description = description;
        this.#type = type;
        this.#maxParticipants = maxParticipants;
    }

    get profesional() {
        return this.#profesional;
    }

    set profesional(value) {
        this.#profesional = value;
    }

    get startTime() {
        return this.#startTime;
    }

    set startTime(value) {
        this.#startTime = value;
    }

    get endTime() {
        return this.#endTime;
    }

    set endTime(value) {
        this.#endTime = value;
    }

    get duration() {
        return this.#duration;
    }

    set duration(value) {
        this.#duration = value;
    }

    get participants() {
        return this.#participants;
    }

    set participants(value) {
        this.#participants = value;
    }

    get name() {
        return this.#name;
    }

    set name(value) {
        this.#name = value;
    }

    get date() {
        return this.#date;
    }

    set date(value) {
        this.#date = value;
    }

    get description() {
        return this.#description;
    }

    set description(value) {
        this.#description = value;
    }

    get type() {
        return this.#type;
    }

    set type(value) {
        this.#type = value;
    }

    get maxParticipants() {
        return this.#maxParticipants;
    }

    set maxParticipants(value) {
        this.#maxParticipants = value;
    }
}