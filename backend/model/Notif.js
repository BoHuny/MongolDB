import MongoDBEntity from './MongoDBEntity'

export default class Notif extends MongoDBEntity{
    constructor(title, type, description, severity, isRead = false, date = null, id = null) {
        if(date === null){
            this.date = new Date()
        } else {
            this.date = date
        }
        this.title = title
        this.type = type
        this.description = description
        this.severity = severity
        this.isRead = isRead
    }
}
