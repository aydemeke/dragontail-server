// server.js
let express = require('express');

let app = express();

let PORT = 3000;

let cors = require('cors')

app.use(cors());

app.get('/restaurants', function (req, res) {
    readCsv(res);
});

app.listen(PORT, function () {
    console.log('Server is running on PORT: ', PORT);
});

function readCsv(res) {
    const fs = require("fs");
    const csv = require("csv-parser");
    let stream = fs.createReadStream("restaurants.csv");
    let csvData = [];
    stream.pipe(csv())
        .on("data", function(data) {
            csvData.push(data);
            console.log(data);
        })
        .on("end", function() {
            return res.send(csvData);
        });
}
