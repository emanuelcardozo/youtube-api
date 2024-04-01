const YoutubeAPI = require('../YoutubeAPI')

module.exports = {
    getSongs: async (req, res) => {
      const playlistId = req.body.playlistId || req.query.playlistId
      const songsResponse = await YoutubeAPI.getSongsFromPlaylist(playlistId)

      while( songsResponse.nextPageToken ) {
        const nextPageResponse = await YoutubeAPI.getSongsFromPlaylist(playlistId, songsResponse.nextPageToken)
        songsResponse.items = songsResponse.items.concat( nextPageResponse.items )
        songsResponse.nextPageToken = nextPageResponse.nextPageToken
      }

      console.log(songsResponse.items[0].snippet)

      const songs = songsResponse.items.map( (song) => {
        return {
          name: song.snippet.title,
          id: song.snippet.resourceId.videoId,
          image: song.snippet.thumbnails.default?.url
        }
      })

      res.status(200).send(songs)
    },

    getPlaylists: async (req, res) => {
      const channelId = req.body.channelId || req.query.channelId
      const playlistsResponse = await YoutubeAPI.getPlaylistsFromChannel(channelId)      

      while( playlistsResponse.nextPageToken ) {
        const nextPageResponse = await YoutubeAPI.getPlaylistsFromChannel(channelId, playlistsResponse.nextPageToken)
        playlistsResponse.items = playlistsResponse.items.concat( nextPageResponse.items )
        playlistsResponse.nextPageToken = nextPageResponse.nextPageToken
      }

      console.log(playlistsResponse.items[0].snippet)

      const playlists = playlistsResponse.items.map( (playlist) => {
        return {
          id: playlist.id,
          name: playlist.snippet.title,
          description: playlist.snippet.description,
          image: playlist.snippet.thumbnails.default.url,
          publishedAt: playlist.snippet.publishedAt,
        }
      })

      res.status(200).send(playlists)
    }
}
