class User {
    constructor(identification, password) {
        this.identification = identification;
        this.password = password;
    }

    // Getters
    getIdentification() {
        return this.identification;
    }

    getPassword() {
        return this.password;
    }

    // Setters
    setIdentification(identification) {
        this.identification = identification;
    }

    setPassword(password) {
        this.password = password;
    }

}

export default User;
