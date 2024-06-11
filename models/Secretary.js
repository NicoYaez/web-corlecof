class Secretary extends User {
    constructor(usuario){
        super(usuario.rut, usuario.name, usuario.email);
    }
}