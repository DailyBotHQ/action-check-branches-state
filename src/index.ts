import settings from './common/settings'
import { debug, setFailed } from '@actions/core'
import GHActionRunner from './ghActionRunner'


const GHActionFunction = async (): Promise<void> => {
  try {
    debug('> Start GitHub action')
    if (!settings.GITHUB_TOKEN) {
      throw ReferenceError('Token not found')
    }
    const actionRunner: GHActionRunner = new GHActionRunner()
    await actionRunner.run()
  } catch (error) {
    setFailed(error)
  }
}

GHActionFunction()