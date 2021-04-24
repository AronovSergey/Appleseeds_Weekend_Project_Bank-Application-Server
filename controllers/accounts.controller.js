const accountsModel = require("../models/accounts.model");

exports.getAllAccounts = async (req, res) => {
	try {
		const accounts = await accountsModel.find({});
		res.send(accounts);
	} catch (error) {
		res.status(500).send(error);
	}
};

exports.createNewAccount = async (req, res) => {
	const { user } = req.body;
	const account = new accountsModel({ user });

	try {
		const result = await account.save();
		res.status(201).send(result);
	} catch (error) {
		res.status(500).send(error);
	}
};
