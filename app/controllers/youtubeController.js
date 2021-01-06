const YoutubeAPI = require('../YoutubeAPI')

module.exports = {
    getSongs: async (req, res) => {
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

      res.status(200).send(songs)
    },

    getPlaylists: async (req, res) => {
      const playlistsResponse = await YoutubeAPI.getPlaylistsFromChannel(req.body.channelId)
      const playlists = playlistsResponse.items.map( (playlist) => {
        return {
          name: playlist.snippet.title,
          id: playlist.id,
          image: playlist.snippet.thumbnails.default.url
        }
      })
      res.status(200).send(playlists)
    }
}
