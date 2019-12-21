/**
 * @author      ReactiioN
 * @copyright   2019, https://reactiion.net
 * @license     MIT
 */
export interface GitlabProject {
  /**
   * Specifies the respository id.
   */
  id: number
  /**
   * Specifies the respository name.
   */
  name: string
  /**
   * Specifies optional the repository description.
   */
  description: string
  /**
   * Specifies the associated repository url.
   */
  web_url: string
  /**
   * Specifies optional the url to an avatar.
   */
  avatar_url: string | null
  /**
   * Specifies the ssh url for git.
   */
  git_ssh_url: string
  /**
   * Specifies the http url for git.
   */
  git_http_url: string
  /**
   * Specifies the repository namespace name (e.g. name of user, name or organisation).
   */
  namespace: string
  /**
   * Specifies whether the repository is 'private', 'internal' or 'public.
   */
  visibility_level: number
  /**
   * Specifies the namespace/name as string.
   */
  path_with_namespace: string
  /**
   * Specifies the default branch (by default: master).
   */
  default_branch: string
  /**
   * Specifies optional the path to the CI configuration.
   */
  ci_config_path: string
  /**
   * Specifies the repository homepage.
   */
  homepage: string
  /**
   * Specifies the repository url.
   */
  url: string
  /**
   * Specifies the repository ssh url.
   */
  ssh_url: string
  /**
   * Specifies the repository http url.
   */
  http_url: string
}

export interface GitlabCommitUser {
  /**
   * Specifies the git username.
   */
  name: string
  /**
   * Specifies the git email.
   */
  email: string
}

export interface GitlabCommit {
  /**
   * Specifies the commit hash.
   */
  id: string
  /**
   * Specifies the commit message.
   */
  message: string
  /**
   * Specifies the commit timestamp.
   */
  timestamp: string
  /**
   * Specifies the absolut web url to this commit.
   */
  url: string
  /**
   * Specifies the author's name and mail.
   */
  author: GitlabCommitUser
  /**
   * Specifies the files added.
   */
  added: string[]
  /**
   * Specifies the files modifies.
   */
  modified: []
  /**
   * Specifies the files removed.
   */
  removed: []
}

export interface GitlabRepository {
  /**
   * Specifies the name of the repository.
   */
  name: string
  /**
   * Specifies the url to the repository.
   */
  url: string
  /**
   * Specifies optional the description of the repository.
   */
  description: string
  /**
   * Specifies the repository homepage.
   */
  homepage: string
  /**
   * Specifies the ssh url for git.
   */
  git_ssh_url: string
  /**
   * Specifies the http url for git.
   */
  git_http_url: string
  /**
   * Specifies whether the repository is 'private', 'internal' or 'public.
   */
  visibility_level: number
}

export interface GitlabPushEvent {
  object_kind: string
  event_name: string
  /**
   * Specifies the previous commit hash.
   */
  before: string
  /**
   * Specifies the last commit hash of this push event.
   */
  after: string
  /**
   * Specifies the git origin ref.
   */
  ref: string
  /**
   * Specifies the checkout hash.
   */
  checkout_sha: string
  /**
   * Specifies optional a message.
   */
  message: string | null
  /**
   * Specifies the user's id.
   */
  user_id: 2
  /**
   * Specifies the user's name.
   */
  user_name: string
  /**
   * Specifies the user's username.
   */
  user_username: string
  /**
   * Specifies optional the user's email.
   */
  user_email: string
  /**
   * Specifies optional the user's avatar url.
   */
  user_avatar: string
  /**
   * Specifies the project's id.
   */
  project_id: number
  /**
   * Specifies some informations about the project.
   */
  project: GitlabProject
  /**
   * Specifies the commit data.
   */
  commits: GitlabCommit[]
  /**
   * Specifies the total commits pushed.
   */
  total_commits_count: number
  /**
   * Specifies optional some options.
   */
  push_options: object
  /**
   * Specifies some informations about the repository.
   */
  repository: GitlabRepository
}
