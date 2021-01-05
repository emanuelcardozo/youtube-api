const config = {
  production: {
    databaseURL: process.env.DATABASE_URL,
    port: process.env.PORT
  },
  development: {
    databaseURL: "mongodb://localhost:27017/youtube_api",
    port: 3000
  }
}

module.exports = config[process.env.NODE_ENV]
