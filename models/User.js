export default class User {
    #rut;
    #name;
    #email;
    #lastName;
    #middleName;
    

    constructor(rut = '', name = '', lastName='', middleName='', email = '') {
        this.#rut = rut;
        this.#name = name;
        this.#lastName = lastName;
        this.#middleName = middleName;
        this.#email = email;
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