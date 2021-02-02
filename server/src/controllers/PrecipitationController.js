const mongo = require("../../config/mongo");

const db = mongo.getDb();

const CSVToJSON = require('csvtojson');

async function readCsv(file) {
  const data = await CSVToJSON().fromFile(`${file}.csv`);
  return data;
}

module.exports = {
  async create(req, res) {
    const precipitation = await readCsv('farms_precipitation');
    const precipitations = await db.collection('precipitation').insertMany(precipitation);
    return res.status(200).json(precipitations);
  },

  async index(req, res) {
    const precipitation = db.collection('precipitation').find();
    return res.json(precipitation);
  },

  async show(req, res) {
    const { id } = req.params;
    const precipitation = await db.collection('precipitation').find(id);
    return res.json(precipitation);
  },

  async update(req, res) {
    const { id } = req.params;
    const {
      date,
      precipitation_221,
      precipitation_231,
      precipitation_271
    } = req.body;
    if (!id) return res.json({ error: 'Invalid ID' });
   const precipitation =  await db.collection('precipitation').updateOne({ _id: new ObjectId(id) }, {
      date,
      precipitation_221,
      precipitation_231,
      precipitation_271
    });
    return res.json(precipitation);
  },

  async delete(req, res) {
    const { id } = req.params;
    if (!id) return res.json({ error: 'Invalid ID' });
    await db.collection('precipitation').deleteOne(id);
    return res.status(204).send();
  }
}