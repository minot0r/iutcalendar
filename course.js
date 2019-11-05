let course = class Course {
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
}

module.exports = course