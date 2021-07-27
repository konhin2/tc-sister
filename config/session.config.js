const session = require('express-session')
const MongoStore = require('connect-mongo')

module.exports = app => {
  app.set("trust proxy", 1)

  // Insertar la session
  app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: false,
    cookie: {
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      maxAge: 60000 * 60 * 24
    },
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI
    })
  })) 
}