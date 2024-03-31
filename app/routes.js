const express = require('express')
const router = new express.Router
const UserController = require('./controllers/userController');
const DeviceController = require('./controllers/deviceController');
const YoutubeController = require('./controllers/youtubeController');

router.get('/',(req,res)=>res.send('ok'));

router.get('/login',(req,res)=>res.send('ok'));

// UserController routes
router.get('/user/:id', UserController.find);
router.post('/user', UserController.create);

// post routes
router.get('/device/:id', DeviceController.find);
router.post('/device', DeviceController.create);
router.get('/device', DeviceController.findByAndroidId);

// Youtube Controller
router.get('/youtubeAPI/songs', YoutubeController.getSongs);
router.get('/youtubeAPI/playlists', YoutubeController.getPlaylists);

module.exports = router;
