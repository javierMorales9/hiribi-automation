//import "./shared/setEnv"; // Must be the first import
import server from "./server";
//import { logger } from "./shared/logging/winstonConfig";

// Constants
const serverStartMsg = "Express server started on port: ";
const port = process.env.PORT || 3000;

// Start server
const runningServer = server.listen(port, () =>
    console.log()
    //logger.info(serverStartMsg + port)
);

export default runningServer;