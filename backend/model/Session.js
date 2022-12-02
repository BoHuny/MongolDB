import MongoDBEntity from './MongoDBEntity.js'

export default class Session extends MongoDBEntity {
    constructor(proportionInfected, bestUsers, bestScores) {
        super(null)
        this.proportionInfected = proportionInfected
        this.bestUsers = bestUsers
        this.bestScores = bestScores
    }
}