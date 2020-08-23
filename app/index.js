require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const YoutubeAPI = require('./YoutubeAPI')

const app = express()
const port = process.env.PORT

app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())

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
  console.log(req.body);
  const songsResponse = await YoutubeAPI.getSongsFromPlaylist(req.body.playlistId)
  const songs = songsResponse.items.map( (song) => {
    return {
      name: song.snippet.title,
      id: song.snippet.resourceId.videoId,
      image: song.snippet.thumbnails.default.url
    }
  })

  res.status(200).send(songs)
})
