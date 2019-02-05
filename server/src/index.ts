import * as express from "express";
import * as path from "path";
const app = express();
const port = 8080; // default port to listen

app.get("/", (req, res) =>
    res.sendFile(path.join(__dirname + "../../client/index.html")));

app.get("/api", (req, res) =>
    res.send("hi"));

app.get("/api/beer", (req, res) =>
    res.send("beers");

// start the express server
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});
