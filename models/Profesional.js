import User from './User.js';

export default class Profesional extends User {
    #speciality;
    #appointments;

    constructor(rut, name, email, lastName, middleName, speciality = null) {
        super(rut, name, email, lastName, middleName);
        this.#speciality = speciality;
        this.#appointments = [];

    }

    // Getter
    getSpeciality() {
        return this.#speciality;
    }
    getAppointment() {
        return this.#appointments;
    }

    // Setter
    setSpeciality(value) {
        this.#speciality = value;
    }
    setAppointment(value) {
        this.#appointments.push(value);
    }
}