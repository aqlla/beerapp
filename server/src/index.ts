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

app.get("/api", (req, res) => res.send("hi"));

app.get("/api/beer", async (req, res) => {
    try {
        await pg.connect();
        const data = await pg.query("select * from beers");
        if ("rows" in data) {
            res.send(data.rows);
        }
        await pg.end();
    } catch (e) {
        console.log(e);
    }
});

app.get("/api/beer/:field/:val", async (req, res) => {
    const fields = [ "style", "brewery" ];
    if (req.params.field in fields) {
        try {
            await pg.connect();
            const query = `select * from beers where ${req.params.field}=${req.params.val}`;
            const data = await pg.query(query);
            if ("rows" in data) {
                res.send(data.rows);
            }
            await pg.end();
        } catch (e) {
            res.send(e);
            console.log(e);
        }
    } else  {
        res.send(`${req.params.field} is not a valid search field`);
    }
});

app.listen(port, (_) =>
    console.log(`server started at http://localhost:${port}`));
