export default class Notif{
    constructor(title, type, description, severity, isRead = false) {
        this.title = title
        this.date = new Date()
        this.type = type
        this.description = description
        this.severity = severity
        this.isRead = isRead
    }
}

id:str;
	title:str;
	date:datetime;
	type:int;
	description:str;
	severity:int;
	isRead:boolean;
