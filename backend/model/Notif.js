import MongoDBEntity from './MongoDBEntity.js'

export default class Notif extends MongoDBEntity {
    constructor(title, type, description, severity, date = null) {
        super(null)
        if(date === null){
            this.date = new Date()
        } else {
            this.date = date
        }
        this.title = title
        this.type = type
        this.description = description
        this.severity = severity
        this.isRead = false
    }
}
