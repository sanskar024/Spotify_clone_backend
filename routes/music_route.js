const express= require('express');
const musicController= require('../src/controller/music_controller');
const music_routes= express.Router();


music_routes.get('/music', musicController.getAllMusic);
music_routes.post('/music', musicController.createMusic);