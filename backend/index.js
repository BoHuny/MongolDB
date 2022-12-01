import express from 'express'
import cors from 'cors'
import getRoutes from './routes/index.js'
import 'dotenv/config'
import UsersService from './services/UsersService.js'
import NotifsService from './services/NotifsService.js'

import { MongoClient } from 'mongodb'

const uri ="mongodb://20.111.50.245:27017/"
const database = new MongoClient(uri).db("mongolDB")

const userService = new UsersService(database)
const notifService = new NotifsService(database, userService)

const services = {
    "users" : userService,
    "notifs" : notifService
}

services.notifs.getNotifs()

const app = express()
const port = process.env.PORT
app.use(cors())
app.use(express.json())

const routes = getRoutes(services)

for (const routeName in routes) {
    const route = routes[routeName]
    if(route[0] === "GET"){
      app.get('/' + routeName, (req, res) => {
        route[1](req, res);
      })
    }
    else {
      app.post('/' + routeName, (req, res) => {
        route[1](req, res);
      })
    }
      
  }

app.listen(port, () => {
  console.log(`Server launched and listening to port ${port}`)
})