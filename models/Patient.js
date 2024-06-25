import User from './User';
export default class Patient extends User {
    #medicalRecord;
    constructor(id= '', rut = '', name = '', lastName='', middleName='', email = '') {
        super(id, rut, name, lastName, middleName,email);
        this.#medicalRecord = null;
       
    }

    // Getter
    getMedicalRecord() {
        return this.#medicalRecord;
    }

    

    // Setter
    setmedicalRecord(value) {
        this.#medicalRecord = value;
    }
}