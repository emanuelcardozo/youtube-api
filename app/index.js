require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const YoutubeAPI = require('./YoutubeAPI')
const config = require('./config/config')
const mongoose = require('mongoose')

const app = express()
const port = config.port

app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())
app.use(function(req, res, next) {

  res.header("Access-Control-Allow-Origin", "*");

  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  next();

});

mongoose.connect( config.databaseURL, { useNewUrlParser: true, useUnifiedTopology: true },  ()=> {
  console.log("mongo db connected!");
})

app.listen( port, ()=> {
  console.log("Listening on port", port);
})

app.get("/playlists", async (req, res) => {
  const playlistsResponse = await YoutubeAPI.getPlaylistsFromChannel(req.body.channelId)
  const playlists = playlistsResponse.items.map( (playlist) => {
    return {
      name: playlist.snippet.title,
      id: playlist.id,
      image: playlist.snippet.thumbnails.default.url
    }
  })
  res.status(200).send(playlists)
})

app.get("/songs", async (req, res) => {
  const songsResponse = await YoutubeAPI.getSongsFromPlaylist(req.body.playlistId)

  while( songsResponse.nextPageToken ) {
    const nextPageResponse = await YoutubeAPI.getSongsFromPlaylist(req.body.playlistId, songsResponse.nextPageToken)
    songsResponse.items = songsResponse.items.concat( nextPageResponse.items )
    songsResponse.nextPageToken = nextPageResponse.nextPageToken
  }

  const songs = songsResponse.items.map( (song) => {
    return {
      name: song.snippet.title,
      id: song.snippet.resourceId.videoId,
      image: song.snippet.thumbnails.default.url
    }
  })

  console.log(songs.length);

  res.status(200).send(songs)
})
