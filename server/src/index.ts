import * as express from "express";
import * as path from "path";
import { Client } from "pg";

const pg = new Client({
    database: "beer",
    user: "acs"
});
const app = express();
const port = 8080;

app.get("/", (req, res) =>
    res.sendFile(path.join(__dirname + "../../client/index.html")));

app.get("/api", (req, res) =>
    res.send("hi"));

app.get("/api/beer", async (req, res) => {
    try {
        await pg.connect();
        res.send(await pg.query("select * from beers"));
        await pg.end();
    } catch (e) {
        console.log(e);
    }

});

app.listen(port, (_) =>
    console.log(`server started at http://localhost:${port}`));
