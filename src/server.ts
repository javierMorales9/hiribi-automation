import express from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import helmet from "helmet";

//import passport from "passport";
//import configurePassport from "./shared/security/passport";

import apiRouter from "./api";
import { errorHandler } from "./shared/errorHandling/ErrorHandler";
import { notFound } from "./shared/errorHandling/NotFound";

// Constants
const app = express();


/***********************************************************************************
 *                                  Middlewares
 **********************************************************************************/

// Common middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

/***********************************************************************************
 *                               Configure Passport
 **********************************************************************************/
//configurePassport(passport);
//app.use(passport.initialize());


/***********************************************************************************
 *                               Configure Routes
 **********************************************************************************/
// Show routes called in console during development
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

// Security (helmet recommended in express docs)
if (process.env.NODE_ENV === "production") {
    app.use(helmet());
}

/***********************************************************************************
 *                         API routes and error handling
 **********************************************************************************/

// Add api router
app.use("/", apiRouter);

// Error handling
app.use(errorHandler);

//Resource not found
app.use(notFound);

//Initialize the connection with mongoDB
//connectDB();

// Export here and start in a diff file (for testing).
export default app;