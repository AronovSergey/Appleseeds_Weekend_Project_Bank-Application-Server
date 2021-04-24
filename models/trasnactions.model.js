const mongoose = require("mongoose");
const validator = require("validator");

const trasnactionSchema = mongoose.Schema({
	from: { type: String },
	to: { type: String },
	operation_type: { type: String, required: true },
	amount: { type: Number, required: true },
});

const trasnactionModel = mongoose.model("Trasnaction", trasnactionSchema);
module.exports = trasnactionModel;
