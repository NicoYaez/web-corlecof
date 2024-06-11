class User {
    #rut;
    #name;
    #email;

    constructor(rut = '', name = '', email = '') {
        this.#rut = rut;
        this.#name = name;
        this.#email = email;
    }

    get rut() {
        return this.#rut;
    }

    set rut(value) {
        this.#rut = value;
    }

    get name() {
        return this.#name;
    }

    set name(value) {
        this.#name = value;
    }

    get email() {
        return this.#email;
    }

    set email(value) {
        this.#email = value;
    }
}