import * as express from "express";
const app = express();
const port = 8080; // default port to listen

app.get("/", (req, res) => {
    // render the index template
    res.send("hi");
});

// start the express server
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});
