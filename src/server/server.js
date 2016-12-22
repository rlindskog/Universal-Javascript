import { createMemoryHistory, match, RouterContext } from 'react-router'
import Express from 'express'
import http from 'http'
import React from 'react'
import { renderToString } from 'react-dom/server'
import routes from '../universal/routes'
import { HOST, PORT, ROOT } from '../universal/settings'

// server
const app = new Express()
const server = http.createServer(app)

// middleware
app.use('/dist', Express.static('dist', { maxAge: '1d' }))

app.get('*', (req, res) => {
  match({ routes, location: req.url }, (err, redirect, props) => {
    if (err) {
      res.status(500).send(err.message)
    } else if (redirect) {
      res.redirect(redirect.pathname + redirect.search)
    } else if (props) {
      const appHtml = renderToString(<RouterContext {...props}/>)
      res.send(renderTemplate(appHtml))
    } else {
      res.status(404).send('Not Found')
    }
  })
})

function renderTemplate(appHtml) {
  return `
    <!doctype html public="storage">
    <html>
    <meta charset=utf-8/>
    <title>My First React Router App</title>
    <link rel=stylesheet href=/dist/index.css>
    <div id="root">${appHtml}</div>
    <script src="http://localhost:3002/dist/client.bundle.js"></script>
   `
}


server.listen(PORT, (err) => {
  if (err) throw err
  console.log(`Listening at ${PORT}`)
})

// export httpServer object so universal-hot-reload can access it
module.exports = server
