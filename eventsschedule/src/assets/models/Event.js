class Event {
    constructor(identification, date, description) {
        this.identification = identification;
        this.date = date;
	    this.description = description;
    }

    // Getters
    getIdentification() {
        return this.identification;
    }

    getDate() {
        return this.date;
    }

    getDescription() {
    	return this.description;
    }

    // Setters
    setIdentification(identification) {
        this.identification = identification;
    }

    setDate(date) {
        this.date = date;
    }

    setDescription(description) {
        this.description = description;
    }
}

export default Event;
