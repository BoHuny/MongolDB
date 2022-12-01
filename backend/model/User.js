import MongoDBEntity from './MongoDBEntity.js'

export default class User extends MongoDBEntity {
    constructor(pseudo, password, description, gender, isHuman) {
        super(null)
        this.pseudo = pseudo
        this.password = password
        this.description = description
        this.gender = gender
        this.isHuman = isHuman
        this.profilePicture = null
        this.shownScore = 0
        this.realScore = 0
        this.listDiseases = []
        this.listNotifs = []
        this.listEvents = []
    }
}
