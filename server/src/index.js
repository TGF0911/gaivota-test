const express = require("express");
const body_parser = require("body-parser");
const jwt = require("jsonwebtoken");
const cors = require("cors");  

const { PORT, JWT_PW } = process.env;
const mongo = require("../config/mongo");
const routes = require("./routes");
const app = express();

mongo.connectToServer();

app.use(cors());
app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: true }));
app.use(routes)

/**
 * Login route
 * @param {String} email - Email of login user
 * @param {String} password - Password of login user
 * @return {String} token
 */
app.post("/login", async (req, res) => {
	const { email, password } = req.body;
	const db = mongo.getDb();
	const user = await db.collection("user").findOne({ email, password });
	const token = jwt.sign(user, JWT_PW);
	res.status(200).send({ userData: user, token });
});


app.get("/auth", (req, res) => {
	let token = req.header("Authorization");
	token = token.split(" ")[1];
	const ok = jwt.verify(token, JWT_PW);
	res.status(200).send(ok);
});



//------- CODIGO DO DESAFIO 2 ----------

app.get('/challenge/encode/:number', (req, res) => {
	const {number} = req.params;
	console.log(number)
	const buff = new Buffer(String(number));
	const code = buff.toString('base64');
	console.log(code);
	return res.json(code);
})

app.get('/challenge/decode/:code', (req, res) => {
	const {code} = req.params;
	const buff = new Buffer(String(code), 'base64');
	const number = buff.toString('ascii');
	return res.json(number);

})



app.get("/", (req, res) => {
	res.status(200).send("Gaivota Test");
});

app.listen(PORT !== "undefined" ? PORT : 5000, () => {
	console.warn("App is running at http://localhost:" + PORT);
});

module.exports = app;