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

export interface ConfigInterface {
  version: ConfigVersion
  gitlab: GitHookConfig[]
}
