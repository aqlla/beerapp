import * as express from "express";
import * as path from "path";
import { Client } from "pg";
// import ISqlColumn from "../../models/ISqlColumn";

const pg = new Client({
    database: "beer",
    user: "acs"
});
const app = express();
const port = 8080;
const fs = {
    string: [ "beers.name", "beers.style", "breweries.name", "breweries.city", "breweries.state" ],
    number: [ "beers.ibu", "beers.abv" ]
};

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
    } catch (e) {
        console.log(e);
    }
});

app.get("/api/s/:val", async (req, res) => {
    try {
        const maxResults: number = req.query.max || 50;
        const searchStr = req.params.val;
        const query = `SELECT TOP ${maxResults} beers.id, beers.sizes, beers.abv, beers.ibu, beers.name, beers.style, beers.brewery_id, breweries.name AS brewery_name, breweries.city, breweries.state FROM beers LEFT JOIN breweries ON breweries.id = beers.brewery_id WHERE `
            + (isNaN(searchStr)
                ? fs.string.reduce((acc, f) => (acc ? `${acc} or ` : ``) + `${f} ilike '%${searchStr}%'`, "")
                : fs.number.reduce((acc, f) => (acc ? `${acc} or ` : ``) + `${f} = ${searchStr}`, ""));
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
    const field = req.params.field;
    if (fs.string.includes(field)) {
        try {
            const val = req.params.val.toLowerCase();
            const query = `SELECT beers.id, beers.sizes, beers.abv, beers.ibu, beers.name, beers.style, beers.brewery_id, breweries.name AS brewery_name, breweries.city, breweries.state FROM beers LEFT JOIN breweries ON breweries.id = beers.brewery_id WHERE ${field} ILIKE '%${val}%'`;
            console.log(query);

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
