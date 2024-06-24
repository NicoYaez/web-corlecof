import User from './User';
export default class Patient extends User {
    #medicalRecord;
    constructor(rut = '', name = '', lastName='', middleName='', email = '') {
        super(rut, name, lastName, middleName,email);
        this.#medicalRecord = null;
       
    }

    // Getter
    get medicalRecord() {
        return this.#medicalRecord;
    }

    

    // Setter
    set medicalRecord(value) {
        this.#medicalRecord = value;
    }
}