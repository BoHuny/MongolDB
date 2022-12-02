import express from 'express'
import cors from 'cors'
import getRoutes from './routes/index.js'
import 'dotenv/config'
import UsersService from './services/UsersService.js'
import NotifsService from './services/NotifsService.js'

import { MongoClient, ObjectId } from 'mongodb'
import Notif from './model/Notif.js'
import Disease from './model/Disease.js'
import Event from './model/Event.js'
import EnumNotifTypes from './model/EnumNotifTypes.js'
import { authenticateToken, generateAccessToken } from './utils/jwt.js'
import DiseasesService from './services/DiseasesService.js'
import EventsService from './services/EventsService.js'
import User from './model/User.js'

const uri ="mongodb://20.111.50.245:27017/"
const database = new MongoClient(uri).db("mongolDB")

const userService = new UsersService(database)
const eventsService = new EventsService(database, userService)
const notifService = new NotifsService(database, userService, eventsService)
const diseaseService = new DiseasesService(database)

const services = {
    "users" : userService,
    "notifs" : notifService,
    "diseases": diseaseService,
    "events": eventsService
}

// let user = await userService.getUserByID("63891a76136dd44526e03e84")
// let user = await userService.createUser(new User("Wassim", "motdepasse", "descrption de ouf", "autre", true))
// console.log(user)

// await notifService.createNotifForOneUser("63891a76136dd44526e03e84", new Notif("BZ BZ BZ BZ BZ BZ", 2, "WASSIMOUNET", 3))

// let result = await notifService.readAllNotifs("63891a76136dd44526e03e84")
// console.log(result)

// diseaseService.createDisease(new Disease("VIH", "C'est le VIH", 0.1, 60*24*5, 0.99, 0.9))
// userService.addDiseaseID("63891a76136dd44526e03e84", "6389355f684be98d5a24199d")

// eventsService.createEventForBothUsers(new Event("63893cc69bf0ee2701f60db9", "63891a76136dd44526e03e84", true, []))

const app = express()
const port = process.env.PORT
app.use(cors())
app.use(express.json())
app.use(express.static('public'));

const routes = getRoutes(services)

for (let i = 0; i < routes.length; i++) {
  const route = routes[i]
    if(route.method === "GET") {
        app.get('/' + route.path, (req, res, next) => authenticateToken(route.needAuthent, req, res, next), (req, res) => {
          route.callback(req, res)
        })
    }
    else {
        app.post('/' + route.path, (req, res, next) => authenticateToken(route.needAuthent, req, res, next), (req, res) => {
          route.callback(req, res)
        })
    }
      
  }

app.listen(port, () => {
  console.log(`Server launched and listening to port ${port}`)
})