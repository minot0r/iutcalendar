let group = class Group {

    constructor(td, tp) {
        this.td = td
        this.tp = tp
    }

    /**
     * Get iCalendar group, which is the code in URL (e.g. 3163 for 1 - 1)
     * @returns {number} Group
     */
    getICalendarGroup() {
        return 3160 + 2 * this.td + this.tp;
    }

    /**
     * Get a beautified version of group
     * @param {string} Way it is showed
     * @returns {string}
     */
    getFormattedGroup(pattern = '$1 - ') {
        return `${this.td} ${this.tp}`.replace(/(\d)\s(?=\d)/g, pattern)
    }

    /**
     * Get TP passed as constructor
     * @returns {number}
     */
    getTP() {
        return this.tp;
    }

    /**
     * Get TD passed as constructor
     * @returns {number}
     */    
    getTD() {
        return this.td;
    }

}

module.exports = group