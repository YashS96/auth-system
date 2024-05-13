import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import cluster from 'cluster'
import os from 'os'
import cookieParser from 'cookie-parser'
// import routes & middlewares
import loginRouter from './routes/auth/login';
import registerRouter from './routes/auth/register';
import logoutRouter from './routes/auth/logout';
import profileRouter from './routes/user-profile/userProfile';
import { sessionJwtAuth } from './middleware/authMiddleware';
import { incomingRequestLog } from './middleware/loggerMiddleware';
import { initializeDb } from './utils/dataStoreService'

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
  const db = initializeDb();
  const app = express();
  app.use(cookieParser()); // to set up jwt in users cookie
  app.use(cors());
  dotenv.config();
  app.use(bodyParser.urlencoded({ extended: true })) // req.body exteded more than just string type
  app.use(bodyParser.json({ extended: true })) //Content-Type: application/json 
  app.db = db;
  app.use(incomingRequestLog);

  app.use('/', loginRouter)
  app.use('/', registerRouter)
  app.use('/logout', sessionJwtAuth, logoutRouter)
  app.use('/user', sessionJwtAuth, profileRouter)


  const port = process.env.PORT || 8000

  app.listen(port, () => logger.info(`Sever running on port ${port}`))
}