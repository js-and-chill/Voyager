
import path from 'path'
import express from 'express'
import webpack from 'webpack'
import webpackDev from 'webpack-dev-middleware'
import hot from 'webpack-hot-middleware'
import config from './webpack/dev'

const compiler = webpack(config)
const PORT = 3000

express()

  .use(webpackDev(compiler, {
    publicPath: config.output.publicPath,
    stats: { color: true },
  }))

  .use(hot(compiler, { log: console.log }))

  .get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'app', 'index.html'))
  })

  .listen(PORT, 'localhost', err => {
    if (err) { return console.log(err) }

    console.log(`🌎  Server listening on port ${PORT}`)
  })
