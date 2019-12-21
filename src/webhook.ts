/**
 * @author    ReactiioN
 * @copyright 2019, https://github.com/ReactiioN1337
 * @license   MIT
 */
import { GitlabPushEvent } from '../lib/gitlab.interface'
import { Request, Response } from 'express'

export const webhook = async (req: Request, res: Response) => {
  const body = <GitlabPushEvent>(req.body)
  console.log(body)

  res.sendStatus(200)
}
