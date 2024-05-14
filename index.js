import express from 'express'
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
import { sessionJwtAuth } from './middleware/authMiddleware.js';
import { incomingRequestLog } from './middleware/loggerMiddleware.js';
import { initializeDb } from './utils/dataStoreService.js'

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
		],
	},
	apis: ["./routes/*.js", "./routes/auth/*.js", "./routes/user-profile/*.js"],
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
  const db = initializeDb();
  const app = express();
  app.use(cookieParser()); // to set up jwt in users cookie
  app.use(cors());
  dotenv.config();
  app.use(express.json());
  app.db = db;
  app.use(incomingRequestLog);
  app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

  app.use('/login', loginRouter)
  app.use('/register', registerRouter)
  app.use('/logout', sessionJwtAuth, logoutRouter)
  app.use('/user', sessionJwtAuth, profileRouter)

  const port = process.env.PORT || 8000

  app.listen(port, () => console.log(`Sever running on port ${port}`))
}
