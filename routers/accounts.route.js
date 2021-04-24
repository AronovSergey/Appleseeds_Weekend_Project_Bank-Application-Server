const express = require("express");
const accountsControler = require("../controllers/accounts.controller");
const router = express.Router();

router
	.get("/", accountsControler.getAllAccounts)
	.post("/", accountsControler.createNewAccount);

module.exports = router;
