var express = require("express");
var winston = require("winston");
var md5 = require("md5");
var bodyParser = require("body-parser");
var objectAssign = require("object-assign");

var app = express();

var logger = new winston.Logger();

var db = [
	{ id: 1, name: "item#1", value: 5.1 },
	{ id: 2, name: "item#2", value: 3.0 },
	{ id: 3, name: "item#3", value: 3.3 },
	{ id: 4, name: "item#4", value: 1.0 },
	{ id: 5, name: "item#5", value: 0.3 },
	{ id: 6, name: "item#6", value: 8.0 }
];

var SERVER_LATENCY = 100

app.use(bodyParser.json());

// Allow CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type");

    next();
});

// Get all items
app.get("/item", function(req, res) {
	console.log(`[GET] /item`);

	setTimeout(function() {
		res.end(JSON.stringify(db));
	}, SERVER_LATENCY);
});

// Get one item
app.get("/item/:id", function(req,res) {
	console.log(`[GET] /item/:id`);

	var item = null;
	var id = req.params.id;

	for (var i=0; i < db.length; i++) {
		if (db[i].id == id) {
			item = db[i];
			break;
		}
	}

	setTimeout(function() {
		res.end(JSON.stringify(item));
	}, SERVER_LATENCY);
});

// Create an item
app.post("/item", function(req, res) {
	console.log(`[POST] /item`);

	var item = {
		"id": md5(JSON.stringify(req.body) + new Date().getMilliseconds()),
		"name": req.body.name,
		"value": req.body.value
	};

	db.push(item);

	setTimeout(function() {
		res.end(JSON.stringify(item));
	}, SERVER_LATENCY);
});

// Update an item
app.put("/item/:id", function(req, res) {
	console.log(`[PUT] /item/${req.params.id}`);

	var id = req.params.id;

	var item = {
		"name": req.body.name,
		"value": req.body.value
	};

	for (var i=0; i < db.length; i++) {
		if (db[i].id == id) {
			item = db[i] = objectAssign(db[i], item);
		}
	}

	setTimeout(function() {
		res.end(JSON.stringify(item));
	}, SERVER_LATENCY);
});

// Delete one item
app.delete("/item/:id", function(req, res) {
	console.log(`[DELETE] /item/${req.params.id}`);

	var output = []
	var id = req.params.id;
	var element = null;

	for (var i=0; i < db.length; i++) {
		if (db[i].id != id)
			output.push(db[i]);
		else 
			element = db[i];
	}

	db = output;

	setTimeout(function() {
		res.end(JSON.stringify(element));
	}, SERVER_LATENCY);
});

var PORT = process.env.PORT || 3131;

app.listen(PORT, function() {
  console.log("API listening on port", PORT);
});
