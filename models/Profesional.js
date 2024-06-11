class Profesional extends User {
    #speciality;

    constructor(usuario, speciality) {
        super(usuario.rut, usuario.name, usuario.email);
        this.#speciality = speciality;
    }

    // Getter
    get speciality() {
        return this.#speciality;
    }

    // Setter
    set speciality(value) {
        this.#speciality = value;
    }
}