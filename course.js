let Course = class Course {
    /**
     * You'll never need to build your own courses, they will be created automatically by {@link EDT}
     * @constructor
     * @param {JSON} data Data given by EDT when parsing iCalendar file
     */
    constructor(data) {
        this.schedules = {
            start: new Date(data.start),
            end: new Date(data.end),
            formattedStart: `${data.start.getHours()}h${data.start.getMinutes()}`,
            formattedEnd: `${data.end.getHours()}h${data.end.getMinutes()}`
        }
        if(data.summary.length != '' && data.location != '') {
            this.type = data.summary.split('-')[0].trim()
            this.subject = data.summary.split('-')[1].trim().split(',')[0]
            this.studGroup = data.summary.split(',')[1].trim()
            this.professor = data.summary.split(',')[2].trim()
            this.location = data.location.replace(/^J-/, '')
        }
    }

    /**
     * Get start date
     * @returns {Date}
     */
    getStartDate() {
        return this.schedules.start
    }

    /**
     * Get end date
     * @returns {Date}
     */
    getEndDate() {
        return this.schedules.end
    }

    /**
     * Get start date in a prettyfied way
     * @returns {string}
     */
    getFormattedStartDate() {
        return this.schedules.formattedStart
    }

    /**
     * Get end date in a prettyfied way
     * @returns {string}
     */
    getFormattedEndDate() {
        return this.schedules.formattedEnd
    }

    /**
     * Get which type of course is it
     * @returns {string}
     */
    getType() {
        return this.type
    }

    /**
     * Get subject of course
     * @returns {string}
     */
    getSubject() {
        return this.subject
    }

    /**
     * Get student group of course
     * @returns {string}
     */
    getStudGroup() {
        return this.studGroup
    }

    /**
     * Get professor of course
     * @returns {string}
     */
    getProfessor() {
        return this.professor
    }

    /**
     * Where the course takes place
     * @returns {string}
     */
    getLocation() {
        return this.location
    }
}

module.exports = Course