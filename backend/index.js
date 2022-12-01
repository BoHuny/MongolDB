import express from 'express'
import cors from 'cors'
import getRoutes from './routes/index.js'
import 'dotenv/config'
import UsersService from './services/UsersService.js'

import { MongoClient } from 'mongodb'

const uri ="mongodb://20.111.50.245:27017/"
const client = new MongoClient(uri)

const services = {
    "users" : new UsersService(client)
}

const app = express()
const port = process.env.PORT
app.use(cors())

const routes = getRoutes(services)

for (const routeName in routes) {
    const route = routes[routName]
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