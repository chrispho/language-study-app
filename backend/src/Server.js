// if you are adding routes:
// 1. add an import
// 2. add a line under setupRoutes()

import "dotenv/config"
import express from "express";
import TranslationRoutes from "./routes/translationRoutes.js";
import session from "express-session";
import passport from "passport";

class Server {
  constructor() {
    this.app = express();
    this.configureMiddleware();
    this.configureAuth()
    this.setupRoutes()
  }

  configureMiddleware() {
    this.app.use(express.static("../frontend/src"))
    this.app.use(express.json({ limit: "10mb" }))
  }

  configureAuth(){
    this.app.use(
      session({
        secret: "test",//process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false
      })
    )

    // for google auth???? or auth in general?
    this.app.use(passport.initialize())
    this.app.use(passport.session())
  }

  setupRoutes() {
    this.app.use("/v1", TranslationRoutes)
    // this.app.use("/v1", AuthRoutes)
  }

  start(port = 3000){
    this.app.listen(port, () => {
      console.log(`Server started on port ${port}`)
    })
  }
}

console.log("starting")
const server = new Server();
server.start()