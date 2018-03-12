const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const multer = require("multer");
const fs = require("fs");
const upload = multer({
  	dest: "C:/"
});

const generateId = () => {
  	return Number(
		Math.random()
			.toString()
			.substr(3, 16) + Date.now()
  	).toString(36);
};

const port = 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.all("*", function(req, res, next) {
 	res.header("Access-Control-Allow-Origin", "*");
  	res.header("Access-Control-Allow-Headers", "X-Requested-With");
  	res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  	res.header("X-Powered-By", " 3.2.1");
  	res.header("Content-Type", "application/json;charset=utf-8");
  	next();
});

app.get("/", function(req, res) {
  	res.send("Hello World");
});

app.get("/api/getName", function(req, res) {
  	setTimeout(function() {
    	res.send({
      		success: true,
      		message: "",
      		result: {
        		name: "test"
      		}
    	});
    	res.end();
  	}, 1000);
});

app.get("/api/getAge", function(req, res) {
  	setTimeout(function() {
    	res.send({
      		success: true,
      		message: "",
      		result: {
        		age: 24
      		}
    	});
    	res.end();
  	}, 3000);
});

app.post("/api/postName", function(req, res) {
  	setTimeout(function() {
    	res.send({
      		success: req.body.name === "test",
      		message: req.body.name === "test" ? "验证通过" : "账户名不对",
      		result: null
    	});
    	res.end();
  	}, 3000);
});

app.post("/api/upload", upload.single("file"), function(req, res, next) {
  	if (req.method.toLowerCase() === "options") {
    	res.header("Access-Control-Allow-Origin", "*");
    	res.header("Access-Control-Allow-Headers", "X-Requested-With");
    	res.header("Access-Control-Allow-Methods", "OPTIONS, HEAD, POST");
    	res.header("Content-Type", "application/json;charset=utf-8");
  	}

  	setTimeout(function() {
    	res.send({
      		success: true,
      		message: "上传成功",
      		result: {
        		url: `http://www.seentao.com/${generateId()}.jpg`
      		}
    	});
    	res.end();
  	}, 2000);
});

app.get("/api/initTest", function(req, res, next) {
  	fs.readFile("./json.json", "utf-8", function(err, data) {
		if (err) {
			throw err;
		} else {
			res.send(data);
			next();
		}
	});
});

let server = app.listen(port, function() {
  	console.log(`app listening at http://localhost:${port}`);
});
