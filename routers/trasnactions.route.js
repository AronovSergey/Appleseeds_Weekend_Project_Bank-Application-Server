const express = require("express");
const trasnactionsControler = require("../controllers/trasnactions.controller");
const router = express.Router();

router
	.get("/", trasnactionsControler.getAllTrasnactions)
	.get("/:email/:type", trasnactionsControler.logs)
	.put("/deposit/:id", trasnactionsControler.deposit)
	.put("/update-credit/:id", trasnactionsControler.updateCredit)
	.put("/withdraw/:id", trasnactionsControler.withdraw)
	.put("/transfer/:from/:to", trasnactionsControler.transfer);

module.exports = router;
