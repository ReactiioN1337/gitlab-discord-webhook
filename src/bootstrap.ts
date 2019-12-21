/**
 * @author    ReactiioN
 * @copyright 2019, https://github.com/ReactiioN1337
 * @license   MIT
 */

import express               from 'express'
import { json as jsonBody }  from 'body-parser'
import { APP_VERSION, load } from './config'
import { webhook }           from './webhook'

console.log(`             _ _   _     _                _   _           _
         ___|_| |_| |___| |_    _ _ _ ___| |_| |_ ___ ___| |_
        | . | |  _| | .'| . |  | | | | -_| . |   | . | . | '_|
        |_  |_|_| |_|__,|___|  |_____|___|___|_|_|___|___|_,_|
        |___|       - by ReactiioN, version ${APP_VERSION} -
`)

load().then(async cfg => {
  if (cfg === undefined) {
    process.exit(-1)
  }

  const { port, title, proxies } = cfg.server

  const app = express()
  app.use(jsonBody())
  app.set('trust proxy', proxies)
  app.set('title', title || 'GitLab WebHook (c) ReactiioN')

  app.get('/',        (req, res) => res.sendStatus(403))
  app.get('/info',    (req, res) => res.status(200).json({ version: APP_VERSION }))
  app.post('/gitlab', webhook)
  // redirect every other route to main
  app.get('*',     (req, res) => res.redirect('/'))

  app.listen(port)

}).catch(() => {})
