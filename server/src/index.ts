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

app.get("/api/s/:val", async (req, res) => {
    try {
        const searchStr = req.params.val;
        console.log(searchStr);

        const fs = {
            string: [
                "be.name", "be.style", "br.name", "br.city", "br.state"
            ],
            number: [
                "ibu"
            ]
        };
        let query = `select ${fs.number.concat(fs.string)} from beers be left join breweries br on br.id = be.brewery_id where `;
        console.log(query);
        query += isNaN(searchStr)
                ? fs.string.reduce((acc, f) => acc ? `${acc} or ` : `` + `${f} ilike '%${searchStr}%'`)
                : fs.number.reduce((acc, f) => acc ? `${acc} or ` : `` + `${f} = ${searchStr}`);
        console.log(query);

        const data = await pg.query(query);

        if ("rows" in data) {
            res.send(data.rows);
        } else {
            res.send(`there was a problem.`);
        }
    } catch (e) {
        res.send(e);
        console.log(e);
    }
});

app.get("/api/beer/:field/:val", async (req, res) => {
    const fields = [ "style", "brewery" ];
    if (fields.includes(req.params.field)) {
        try {
            let query = `select * from beers where ${req.params.field} ILIKE '%${req.params.val.toLowerCase()}%'`;
            console.log(query);
            if (req.params.field === "brewery") {
                query = `select * from beers be left join breweries br on br.id = be.brewery_id where br.name ILIKE '%${req.params.val.toLowerCase()}%'`;
            }
            const data = await pg.query(query);
            if ("rows" in data) {
                res.send(data.rows);
            }
            // await pg.end();
        } catch (e) {
            res.send(e);
            console.error(e);
        }
    } else  {
        res.send(`${req.params.field} is not a valid search field`);
    }
});

app.listen(port, async (_) => {
    try {
        await pg.connect();
        console.log(`server started at http://localhost:${port}`);
    } catch (e) {
        console.error(e);
    }
});
