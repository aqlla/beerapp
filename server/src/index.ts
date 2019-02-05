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
    if (fields.includes(req.params.field)) {
        try {
            await pg.connect();
            let query = `select * from beers where ${req.params.field} ILIKE '%${req.params.val.toLowerCase()}%'`;
            console.log(query);
            if (req.params.field === "brewery") {
                query = `select * from beers be left join breweries br on br.id = be.brewery_id where br.name ILIKE '%${req.params.val.toLowerCase()}%'`;
            }
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
