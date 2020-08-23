const { google } = require('googleapis')
var service = google.youtube('v3')

module.exports = {

  getSongsFromPlaylist: function( playlistId, nextPageToken=null ) {
    const opt = {
      key: process.env.YOUTUBE_TOKEN,
      part: 'snippet',
      playlistId
    }

    if(nextPageToken)
      opt.pageToken = nextPageToken

    return service.playlistItems.list(opt)
    .then((response) => {
      return response.data
    }).catch((err) => {
      console.log(err);
    })
  },

  getPlaylistsFromChannel: function( channelId, nextPageToken=null ) {
    const opt = {
      key: process.env.YOUTUBE_TOKEN,
      part: 'snippet',
      channelId
    }

    if(nextPageToken)
      opt.pageToken = nextPageToken

    return service.playlists.list(opt)
    .then((response) => {
      return response.data
    }).catch((err) => {
      console.log(err);
    })
  }
}
