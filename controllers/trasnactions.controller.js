const accountsModel = require("../models/accounts.model");
const trasnactionModel = require("../models/trasnactions.model");

exports.getAllTrasnactions = async (req, res) => {
	try {
		const trasnactions = await trasnactionModel.find({});
		res.send(trasnactions);
	} catch (error) {
		res.status(500).send(error);
	}
};

exports.deposit = async (req, res) => {
	const amount = parseInt(req.body.amount);

	if (!amount || Object.keys(req.body).length > 1)
		return res.status(400).send("Invalid update");

	try {
		const account = await accountsModel.findByIdAndUpdate(
			req.params.id,
			{ $inc: { cash: amount } },
			{ new: true, runValidators: true }
		);

		if (!account) {
			return res.status(404).send("The id you entered does not exist");
		}

		const trasnaction = new trasnactionModel({
			to: account.user.email,
			operation_type: "Deposit",
			amount,
		});

		const result = await trasnaction.save();

		res.status(201).json({ account, trasnaction: result });
	} catch (error) {
		res.status(500).send(error);
	}
};

exports.updateCredit = async (req, res) => {
	const amount = parseInt(req.body.amount);

	if (!amount || Object.keys(req.body).length > 1)
		return res.status(400).send("Invalid update");

	try {
		const account = await accountsModel.findByIdAndUpdate(
			req.params.id,
			{ credit: amount },
			{ new: true, runValidators: true }
		);

		if (!account) {
			return res.status(404).send("The id you entered does not exist");
		}

		const trasnaction = new trasnactionModel({
			to: account.user.email,
			operation_type: "Update Credit",
			amount,
		});

		const result = await trasnaction.save();

		res.status(201).json({ account, trasnaction: result });
	} catch (error) {
		res.status(500).send(error);
	}
};

exports.withdraw = async (req, res) => {
	const amount = parseInt(req.body.amount);

	if (!amount || Object.keys(req.body).length > 1)
		return res.status(400).send("Invalid update");

	try {
		const account = await accountsModel.findById(req.params.id);

		if (!account)
			return res.status(404).send("The id you entered does not exist");

		if (amount > account.cash + account.credit)
			return res.status(400).send("Invalid update");

		account.cash -= amount;

		await account.save();

		const trasnaction = new trasnactionModel({
			to: account.user.email,
			operation_type: "Withdraw",
			amount,
		});

		const result = await trasnaction.save();

		res.status(201).json({ account: account, trasnaction: result });
	} catch (error) {
		res.status(500).send(error);
	}
};

exports.transfer = async (req, res) => {
	const amount = parseInt(req.body.amount);

	if (!amount || Object.keys(req.body).length > 1)
		return res.status(400).send("Invalid update");

	try {
		const toAccount = await accountsModel.findById(req.params.to);
		const fromAccount = await accountsModel.findById(req.params.from);

		if (!toAccount || !fromAccount)
			return res.status(404).send("The id you entered does not exist");

		if (amount > fromAccount.cash + fromAccount.credit)
			return res.status(400).send("Invalid update");

		fromAccount.cash -= amount;
		toAccount.cash += amount;

		await fromAccount.save();
		await toAccount.save();

		const trasnaction = new trasnactionModel({
			to: toAccount.user.email,
			from: fromAccount.user.email,
			operation_type: "Transfer",
			amount,
		});

		const result = await trasnaction.save();

		res.status(201).json({
			to: toAccount,
			from: fromAccount,
			trasnaction: result,
		});
	} catch (error) {
		res.status(500).send(error);
	}
};

exports.logs = async (req, res) => {
	try {
		const logs = await trasnactionModel.find({
			to: req.params.email,
			operation_type: req.params.type,
		});

		if (!logs)
			return res.status(404).send("The id you entered does not exist");

		res.status(201).json({ logs });
	} catch (error) {
		res.status(500).send(error);
	}
};
