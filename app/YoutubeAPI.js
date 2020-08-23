const { google } = require('googleapis')
var service = google.youtube('v3')

module.exports = {

  getSongsFromPlaylist: function( playlistId ) {
    return service.playlistItems.list({
      key: process.env.YOUTUBE_TOKEN,
      part: 'snippet',
      playlistId
    }).then((response) => {
      return response.data
    }).catch((err) => {
      console.log(err);
    })
  },

  getPlaylistsFromChannel: function( channelId ) {
    return service.playlists.list({
      key: process.env.YOUTUBE_TOKEN,
      part: 'snippet',
      channelId
    }).then((response) => {
      return response.data
    }).catch((err) => {
      console.log(err);
    })
  }
}
