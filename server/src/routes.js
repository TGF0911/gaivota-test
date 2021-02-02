const  express = require("express");

const FarmController = require("./controllers/FarmController");
const PrecipitationController = require("./controllers/PrecipitationController");
const NDVIController = require("./controllers/NDVIController");

const routes = express.Router();

routes.post('/farms', FarmController.create);
routes.get('/farms', FarmController.index);
routes.get('/farms/:id', FarmController.show);
routes.put('/farms/:id', FarmController.update);
routes.delete('/farms/:id', FarmController.delete);

routes.post('/precipitation', PrecipitationController.create);
routes.get('/precipitation', PrecipitationController.index);
routes.get('/precipitation/:id', PrecipitationController.show);
routes.put('/precipitation/:id', PrecipitationController.update);
routes.delete('/precipitation/:id', PrecipitationController.delete);

routes.post('/ndvi', NDVIController.create);
routes.get('/ndvi', NDVIController.index);
routes.get('/ndvi/:id', NDVIController.show);
routes.put('/ndvi/:id', NDVIController.update);
routes.delete('/ndvi/:id', NDVIController.delete);

module.exports = routes;
