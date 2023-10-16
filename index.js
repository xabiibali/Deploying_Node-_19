import server from "./api/server.js";

const port = 2000

// Import server here and start the application
server.listen(port , console.log(`server is runing port ${port}`))