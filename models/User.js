export default class User {
    #rut;
    #name;
    #email;
    #lastName;
    #middleName;
    #id

    constructor(id, rut = '', name = '', lastName='', middleName='', email = '') {
        this.#id = id;
        this.#rut = rut;
        this.#name = name;
        this.#lastName = lastName;
        this.#middleName = middleName;
        this.#email = email;
    }

    getId() {
        return this.#id;
    }
    setId(value) {
        this.#id = value;
    }

    getRut() {
        return this.#rut;
    }

    setRut(value) {
        this.#rut = value;
    }

    getName() {
        return this.#name;
    }

    setName(value) {
        this.#name = value;
    }
    getLastName() {
        return this.#lastName;
    }

    setLastName(value) {
        this.#lastName = value;
    }
    getMiddleName() {
        return this.#middleName;
    }

    setMiddleName(value) {
        this.#lastName = value;
    }

    getEmail() {
        return this.#email;
    }

    setEmail(value) {
        this.#email = value;
    }
}