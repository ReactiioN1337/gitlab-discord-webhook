/**
 * @author      ReactiioN
 * @copyright   2019, https://reactiion.net
 * @license     MIT
 */
import { ResponseInterface } from '../lib/rest.interface'
import request, { Headers }  from 'request'

/**
 * Performs a post request with 'Content-Type': 'application/json'.
 * @param url     string              The endpoint url.
 * @param body    any                 (optional) The body params.
 * @param headers string | string[]   (optional) The http headers.
 */
export const post = (url: string, body?: any, headers?: Headers): Promise<ResponseInterface> => {
  return new Promise((resolve, reject) => {
    request.post(url, { headers, json: body }, (err, res, body) => {
      if (err) {
        reject(err)
      } else {
        resolve({ res, body })
      }
    })
  })
}
