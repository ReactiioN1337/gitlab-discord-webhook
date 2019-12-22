/**
 * @author    ReactiioN
 * @copyright 2019, https://github.com/ReactiioN1337
 * @license   MIT
 */
import { ConfigInterface }   from '../lib/config.interface'
import { GitlabPushEvent }   from '../lib/gitlab.interface'
import { post }              from './rest'
import { Request, Response } from 'express'
import * as R                from 'ramda'

const extractBaseInfo = (data: GitlabPushEvent) => {
  const refs   = data.ref.split('/')
  const branch = refs[refs.length - 1]

  const {
    name, homepage,
    default_branch,
  } = data.project

  let branchUrl = homepage
  if (branch !== default_branch) {
    branchUrl += `/tree/${branch}`
  }

  const firstHash = data.before
  const lastHash  = firstHash === data.after ? null : data.after

  let added = 0, modified = 0, removed = 0
  for (const commit of data.commits) {
    added    += commit.added.length
    modified += commit.modified.length
    removed  += commit.removed.length
  }

  return {
    name,
    homepage,
    branch,
    branchUrl,
    firstHash,
    lastHash,
    added,
    modified,
    removed,
    username: data.user_username,
    avatar:   data.user_avatar,
    commits:  data.commits
  }
}

const findWebhook = (cfg: ConfigInterface, req: Request): string | undefined => {
  // explicit cast to string for intellisense :)
  const token = <string>(req.headers['x-gitlab-token'])
  if (token == undefined || token.length === 0) {
    return undefined
  }
  const index = R.findIndex(R.propEq('token', token))(cfg.gitlab)
  return index === -1 ? undefined : `${cfg.gitlab[index].url}/slack`
}

export const webhook = async (cfg: ConfigInterface, req: Request, res: Response) => {
  const url = findWebhook(cfg, req)
  if (url === undefined) {
    return res.sendStatus(403)
  }

  const {
    name, homepage, branch, branchUrl, firstHash,
    lastHash, added, modified, removed, commits,
    avatar, username
  } = extractBaseInfo(<GitlabPushEvent>(req.body))

  const fields: object[] = []
  {
    let info = '> Has'
    if (added > 0) {
      info += ` added ${added} file${added > 1 ? 's' : ''}`
    }
    if (modified > 0) {
      info += `${added > 0 ? ', ' : ' '} modified ${modified} file${modified > 1 ? 's' : ''}`
    }
    if (removed > 0) {
      info += `${modified > 0 || added > 0 ? ', ' : ' '} removed ${removed} file${removed > 1 ? 's' : ''}`
    }
    fields.push({ value: info })
  }

  for (const commit of commits) {
    fields.push({ value: commit.message })
  }

  fields.push({ value: `[@${firstHash.substr(0, 10)}](${homepage}/commit/${firstHash})`})
  if (lastHash !== null) {
    (<any>(fields[fields.length - 1])).value += ` ... [@${lastHash.substr(0, 10)}](${homepage}/commit/${lastHash})`
  }

  try {
    res.sendStatus((await post(url, {
      username: cfg.name,
      icon_url: cfg.avatar,
      text: `New commits in [${name}](${homepage}) have been pushed to the [${branch}](${branchUrl}) branch.`,
      attachments: [
        {
          author_icon: avatar,
          author_name: username,
          color: '#ffffff',
          fields
        }
      ]
    })).res.statusCode)
  } catch (err) {
    res.sendStatus(500)
  }
}
