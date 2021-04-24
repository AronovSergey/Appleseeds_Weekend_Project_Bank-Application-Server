const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const accounntsRouter = require("./routers/accounts.route");
const trasnactionsRouter = require("./routers/trasnactions.route");

const app = express();
const port = process.env.PORT || 8080;

//Express Middlewares
app.use(cors());
app.use(express.json());

//Routes
app.use("/", (req, res) => res.send("sergey"));
app.use("/api/bank/account", accounntsRouter);
app.use("/api/bank/trasnactions", trasnactionsRouter);

//Connect to db with mongoose
const uri =
	"mongodb+srv://sergey:2u8Dziw6fxn5xoWu@cluster0.u17so.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose
	.connect(uri, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
		useCreateIndex: true,
	})
	.then(() => {
		console.log("Database connect");
	});

//Connected to server
app.listen(port, () => {
	console.log("Server listening on port " + port);
});
