const mongo = require("../../config/mongo");

const db = mongo.getDb();

const CSVToJSON = require('csvtojson');
const { ObjectId } = require("mongodb");

async function readCsv(file) {
	const data = await CSVToJSON().fromFile(`${file}.csv`);
	return data;
}


module.exports = {
	async create(req, res) {
		const farm = await readCsv('farms');
		const farms = await db.collection('farms').insert(farm);
		return res.status(200).json(farms);
	},

	async index(req, res) {
		const farms = await db.collection('farms').find();
		return res.json(farms);
	},

	async show(req, res) {
		const { id } = req.params;
		const farm = await db.collection('farms').find(id);
		return res.json(farm);
	},

	async update(req, res) {
		const { id } = req.params;
		const {
			name,
			latitude,
			longitude,
			culture,
			variety,
			total_area,
			yield_estimation,
			price
		} = req.body;
		if (!id) return res.json({ error: 'Invalid ID' });
		const farm = await db.collection('farms').updateOne({ _id: new ObjectId(id) }, {
			name,
			latitude,
			longitude,
			culture,
			variety,
			total_area,
			yield_estimation,
			price
		});
		return res.json(farm);
	},

	async delete(req, res) {
		const { id } = req.params;
		if (!id) return res.json({ error: 'Invalid ID' });
		await db.collection('farms').deleteOne(id);
		return res.status(204).send();
	}


};