/**
 * @author      ReactiioN
 * @copyright   2019, https://reactiion.net
 * @license     MIT
 */
import { ConfigInterface, ConfigVersion } from '../lib/config.interface'
import { promises as fs }  from 'fs'
import { join, resolve }   from 'path'

export const APP_VERSION: ConfigVersion = '1'
const dataDir                           = resolve('data')
const cfgPath                           = join(dataDir, 'settings.json')

const setup = async (): Promise<void> => {
  try {
    await fs.stat(dataDir)
  } catch (err) {
    try {
      await fs.mkdir(dataDir)
    } catch (err) {}
  }
}

export const load = async (): Promise<ConfigInterface | undefined> => {
  await setup()

  try {
    const contents = await fs.readFile(cfgPath, 'utf-8')
    const cfg = JSON.parse(contents)
    if (cfg.version !== APP_VERSION) {
      console.log(`[!] your config (vers: ${cfg.version}) may be outdated with version ${APP_VERSION}`)

      // todo: migration
    }
    return cfg
  } catch ({ syscall }) {
    if (syscall === 'open') {
      const cfg: ConfigInterface = {
        version: APP_VERSION,
        gitlab: [
          {
            token: '',
            url: ''
          }
        ],
        server: {
          port: 8080,
          title: '',
          proxies: [
            'loopback',
            'linklocal',
            'uniquelocal',
            // https://www.cloudflare.com/ips-v4
            '173.245.48.0/20',
            '103.21.244.0/22',
            '103.22.200.0/22',
            '103.31.4.0/22',
            '141.101.64.0/18',
            '108.162.192.0/18',
            '190.93.240.0/20',
            '188.114.96.0/20',
            '197.234.240.0/22',
            '198.41.128.0/17',
            '162.158.0.0/15',
            '104.16.0.0/12',
            '172.64.0.0/13',
            '131.0.72.0/22'
          ]
        }
      }

      await fs.writeFile(cfgPath, JSON.stringify(cfg, null, 2) + '\n', { encoding: 'utf-8' })

      console.log('[-] setup the settings.json first!')
    } else {
      console.log(`[-] failed to read settings.json, syscall: ${syscall}`)
    }
    return undefined
  }
}
