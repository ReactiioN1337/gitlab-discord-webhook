/**
 * @author      ReactiioN
 * @copyright   2019, https://reactiion.net
 * @license     MIT
 */

/**
 * @description To migrate configuration files if necessary .
 */
export type ConfigVersion = '1'

export interface GitHookConfig {
  /**
   * Specifies the security token (headers: x-gitlab-token).
   */
  token: string
  /**
   * Specifies the discord webhook endpoint.
   */
  url: string
}

export interface WebserverConfig {
  /**
   * Specifies the port where the express server is listening at.
   */
  port: number
  /**
   * Specifies the page title. Message will be 'forbidden' (status: 403).
   */
  title: string
  /**
   * Specifies some trusted IPv4 ranges (e.g. cloudflare).
   */
  proxies: string[]
}

export interface ConfigInterface {
  version: ConfigVersion
  name: string,
  avatar: string
  gitlab: GitHookConfig[]
  server: WebserverConfig
}
