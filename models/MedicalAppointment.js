class MedicalAppointment {
    #profesional;
    #pacient;
    #asistance;
    #appointmentDate;
    #appointmentTime;
    #status;
    constructor(profesional, pacient, status, asistance, appointmentDate, appointmentTime){
        this.#profesional = profesional;
        this.#pacient = pacient;
        this.#status = status;
        this.#asistance = asistance;
        this.#appointmentDate = appointmentDate;
        this.#appointmentTime = appointmentTime;
    }

    // Getters
    getProfesional() {
        return this.#profesional;
    }

    getPacient() {
        return this.#pacient;
    }

    getStatus() {
        return this.#status;
    }

    getAsistance() {
        return this.#asistance;
    }

    getAppointmentDate() {
        return this.#appointmentDate;
    }

    getAppointmentTime() {
        return this.#appointmentTime;
    }

    // Setters
    setProfesional(profesional) {
        this.#profesional = profesional;
    }

    setPacient(pacient) {
        this.#pacient = pacient;
    }

    setStatus(status) {
        this.#status = status;
    }

    setAsistance(asistance) {
        this.#asistance = asistance;
    }

    setAppointmentDate(appointmentDate) {
        this.#appointmentDate = appointmentDate;
    }

    setAppointmentTime(appointmentTime) {
        this.#appointmentTime = appointmentTime;
    }
}