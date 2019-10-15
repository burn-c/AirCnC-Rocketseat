const express = require('express');
const multer = require('multer');
const uploadConfig = require('./config/upload');


const SessionController = require('./controllers/SessionController');
const SpotController = require('./controllers/SpotController');
const DashboardController = require('./controllers/DashboardController');
const BookingController = require('./controllers/BookingController');

const routes = express.Router();
const upload = multer(uploadConfig);


//req = pega todas informações que o user envia para requisição
//res = devolve uma resposta para requisição
// get = metodo para buscar informação do backend
// post = para criar   uma nova informação do backend
// put = editar uma informação do backend
// delete = deletar uma informação do backend
// req.query = Acessar query params ( para Filtros )
// req.params = Acessar route params ( para edição e delete)
// req.body = Acessar corpoda requisição ( para criação e edição)


routes.post('/sessions', SessionController.store);

routes.get('/spots', SpotController.index);
routes.post('/spots', upload.single('thumbnail'), SpotController.store);

routes.get('/dashboard', DashboardController.show);

routes.post('spots/:spot_id/bookings', BookingController.store);

module.exports = routes; // exporta as rotas desse arquivo  