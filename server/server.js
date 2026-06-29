import app from "./app.js";
import http from "http";

const port = 5000;

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
