const mongo = require("../../config/mongo");

const db = mongo.getDb();

const CSVToJSON = require('csvtojson');

async function readCsv(file) {
  const data = await CSVToJSON().fromFile(`${file}.csv`);
  return data;
}

module.exports = {

  async create(req, res) {
    const ndvi = await readCsv('farms_ndvi');
    const ndvis = await db.collection('ndvi').insert(ndvi);
    return res.status(200).json(ndvis);
  },

  async index(req, res) {
    const ndvi = await db.collection('ndvi').find();
    return res.json(ndvi);
  },

  async show(req, res) {
    const { id } = req.params;
    const ndvi = await db.collection('ndvi').find(id);
    return res.json(ndvi);
  },

  async update(req, res) {
    const { id } = req.params;
    const {
      date,
      ndvi_221,
      ndvi_231,
      ndvi_271
    } = req.body;
    if (!id) return res.json({ error: 'Invalid ID' });
    const ndvi = await db.collection('ndvi').updateOne({ _id: new ObjectId(id) }, {
      date,
      ndvi_221,
      ndvi_231,
      ndvi_271
    });
    return res.json(ndvi);
  },

  async delete(req, res) {
    const { id } = req.params;
    if (!id) return res.json({ error: 'Invalid ID' });
    await db.collection('ndvi').deleteOne(id)
    return res.status(204).send()
  }

}