import User from './User.js';


class Secretary extends User {
    constructor(user){
        super(user.rut, user.name, user.email, user.lastName, user.middleName);
    }
}