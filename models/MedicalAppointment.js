export default class MedicalAppointment {
    #profesional;
    #pacient;
    #asistance;
    #appointmentDate;
    #appointmentTime;
    #status;
    #id;
    constructor(id, profesional, pacient, status, asistance, appointmentDate, appointmentTime){
        this.#id = id;
        this.#profesional = profesional;
        this.#pacient = pacient;
        this.#status = status;
        this.#asistance = asistance;
        this.#appointmentDate = appointmentDate;
        this.#appointmentTime = appointmentTime;
    }

    // Getters

    getId() {
        return this.#id;
    }
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
        // Si #appointmentTime es un objeto Date, formatea para obtener solo la hora y minutos
        if (this.#appointmentTime instanceof Date) {
            return this.#appointmentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        }
        // Si ya está en el formato deseado o es una cadena, devuélvelo directamente
        return this.#appointmentTime;
    }

    // Setters
    setId(id) {
        this.#id = id;
    }

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