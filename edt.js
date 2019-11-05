const ical = require('ical')
const Course = require('./course')
const Group = require('./group')

let EDT = class EDT {
    /**
     * @constructor
     * @param {Group} group The group you want courses for
     * @param {Date} date From when to start filtering groups
     */
    constructor(group, date) {
        this.group = group
        this.date = date
    }

    /**
     * This function returns a Promise resolving the EDT object you just instanciated with Courses loaded in it
     * @returns {Promise} containing EDT object with courses loaded
     * @example
     * new EDT(anyGroup, anyDate).build().then(edt => {
     *  // Treat your EDT object
     * }).catch(err => {
     *  // Treat your error
     * })
     */
    build() {
        return new Promise((resolve, reject) => {
            ical.fromURL(`https://edt.univ-nantes.fr/iut_nantes/g${this.group.getICalendarGroup()}.ics`, {}, (err, data) => {
                if(err) return reject(err)
                this.courses = Object.values(data).filter((event) => event.type == 'VEVENT' && 
                    new Date(event.start).getDate() >= new Date(this.date).getDate() && 
                    new Date(event.start).getMonth() == new Date(this.date).getMonth()).map(course => new Course(course))
                resolve(this)
            })
        })
    }

    /**
     * Get group of EDT Object
     * @returns {Group} you passed to constructor
     */
    getGroup() {
        return this.group
    }

    /**
     * Get all the new courses (courses from today, to calendar end)
     * @returns {Array.<Course>}
     * @example
     * new EDT(anyGroup, anyDate).build().then(edt => {
     *  // You'll end up getting only courses starting at anyDate
     *  const allCourses = edt.getCourses()
     * }).catch(err => {
     *  // Treat your error
     * })
     */
    getCourses() {
        return this.courses
    }

    /**
     * Get courses of date you pass as parameter
     * @param {Date} [date=new Date()] Date when course will be picked-up
     * @returns {Array.<Course>} filtered courses
     * @example
     * new EDT(anyDate, anyDate).build().then(edt => {
     *  const tomorrowCourses = edt.getCoursesFrom(dateOfTomorrow)
     * }).catch(err => {
     *  // Treat your error
     * })
     */
    getCoursesFrom(date = new Date()) {
        return this.courses.filter(course => course.schedules.start.getDate() == date.getDate() && course.schedules.start.getMonth() == date.getMonth())
    }

    /**
     * Get the nearest next course
     * @returns {Course}
     * @example
     * new EDT(anyDate, anyDate).build().then(edt => {
     *  // Note : You're not getting the course the closest to anyDate, but the closest to now
     *  const next = edt.getClosestCourse()
     * }).catch(err => {
     *  // Treat your error
     * })
     */
    getClosestCourse() {
        if(this.courses.length === 0) return new Object()
        return this.courses.reduce((lastCourse, course) => {
            if(course.schedules.start >= new Date() 
                && (course.schedules.start <= lastCourse.schedules.start || lastCourse.schedules.start < new Date()))
                return course
            else return lastCourse
        }, this.courses[0])
    }
}

module.exports = EDT