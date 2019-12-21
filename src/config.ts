/**
 * @author      ReactiioN
 * @copyright   2019, https://reactiion.net
 * @license     MIT
 */
import { ConfigInterface, ConfigVersion } from '../lib/config.interface'
import { promises as fs }  from 'fs'
import { join, resolve }   from 'path'

const APP_VERSION: ConfigVersion = '1'
const dataDir                    = resolve('data')
const cfgPath                    = join(dataDir, 'settings.json')

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
    return JSON.parse(contents)
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
          title: ''
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
