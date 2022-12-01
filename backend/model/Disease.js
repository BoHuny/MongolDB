import MongoDBEntity from "./MongoDBEntity.js";

export default class Disease extends MongoDBEntity{
    constructor(name, description, probaTransmission, incubationtime, testAccuracyPositive, testAccuracyNegative){
        super()
        this.name = name
        this.description = description
        this.probaTransmission = probaTransmission
        this.incubationTime = incubationtime
        this.testAccuracyPositive = testAccuracyPositive
        this.testAccuracyNegative = testAccuracyNegative
    }
}