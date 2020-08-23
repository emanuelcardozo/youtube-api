require('dotenv').config()
const { google } = require('googleapis')
var service = google.youtube('v3')


service.playlistItems.list({
  key: process.env.YOUTUBE_TOKEN,
  part: 'snippet',
  playlistId: 'PLnQG9foyB8Jutbntyk8kJSg_mINeZf8cp'
}).then((response) => {
  console.log(response.data.items);
}).catch((err) => {
  console.log(err);
})

// service.playlists.list({
//   key: process.env.YOUTUBE_TOKEN,
//   part: 'snippet',
//   channelId: 'UC26BqlSwTtpvz_-Lg5EZfKg'
// }).then((response) => {
//   console.log(response.data );
// }).catch((err) => {
//   console.log(err);
// })
