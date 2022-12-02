import MongoDBEntity from './MongoDBEntity.js'

export default class Session extends MongoDBEntity {
    constructor(proportionInfected, bestUsersID, bestScores) {
        super(null)
        this.proportionInfected = proportionInfected
        this.bestUsersID = bestUsersID
        this.bestScores = bestScores
    }
}