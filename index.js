import express from 'express'
import passport from 'passport'
import session from 'express-session'
import flash from 'connect-flash/lib/flash.js'
import cors from 'cors'
import dotenv from 'dotenv'
import cluster from 'node:cluster'
import os from 'os'
import cookieParser from 'cookie-parser'
import swaggerUI from 'swagger-ui-express'
import swaggerJSDoc from 'swagger-jsdoc'
// import routes & middlewares
import loginRouter from './routes/auth/login.js';
import registerRouter from './routes/auth/register.js';
import logoutRouter from './routes/auth/logout.js';
import profileRouter from './routes/user-profile/userProfile.js';
import oAuthRouter from './routes/auth/oAuth.js'
import { sessionJwtAuth } from './middleware/authMiddleware.js';
import { incomingRequestLog } from './middleware/loggerMiddleware.js';
import { initializeDb } from './utils/dataStoreService.js'
import './routes/auth/Strategies/googleStrategy.js'

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Authentication System API",
      version: "1.0.0",
      description: "A simple Authentication system API",
    },
    servers: [
      {
        url: "http://localhost:8000",
      },
      {
        url: "https://auth-system-tf6j.onrender.com/",
      }
    ],
    schemes: ["http", "https"],
    'x-google-endpoints': [
      {
        name: 'http://localhost:8000',
        allowCors: true,
      },
    ],
  },
  apis: ["./*js", "./routes/*.js", "./routes/auth/*.js", "./routes/user-profile/*.js", "./routes/auth/Strategies/*.js"],
};

const specs = swaggerJSDoc(options);

if (cluster.isPrimary) {
  const cpuCount = os.cpus().length
  console.log(`CPU cores: ${cpuCount}`)

  // creating server for each CPU core
  for (let i = 0; i < cpuCount; i++) {
    console.log(`forking ${i}:`)
    cluster.fork();
  }
  // listening to dying worker to spin them up again
  cluster.on('exit', () => {
    cluster.fork();
  })
}
else {
  const corsOptions = {
    origin: 'http://localhost:8000', // Replace with your front-end origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  };
  const db = initializeDb();
  const app = express();
  app.use(cookieParser()); // to set up jwt in users cookie
  app.use(cors(corsOptions));
  dotenv.config();
  app.use(express.json());
  app.db = db;
  app.use(incomingRequestLog);
  //session based middleware setup order (express-session > pass.initialize > pass.session)
  app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 1000 * 10 } // Set secure to true if using HTTPS and 10 min session
  }));
  app.use(flash());
  app.use(passport.initialize());
  app.use(passport.session());

  app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

  //routes
  app.use('/login', loginRouter)
  //external Identity provider auth route
  app.use('/auth', oAuthRouter);
  app.use('/register', registerRouter)
  app.use('/logout', sessionJwtAuth, logoutRouter)
  app.use('/user', sessionJwtAuth, profileRouter)

  const port = process.env.PORT || 8000

  const server = app.listen(port, () => console.log(`Sever running on port ${port}`))

  server.on('error', (err) => {
    console.error('Server error:', err);
  });
}
