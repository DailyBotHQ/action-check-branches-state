import {
  debug,
  // setFailed,
  // getInput
} from '@actions/core'
// import { ActionContext } from './type'
// import { OctokitResponse } from '@octokit/types/dist-types/OctokitResponse'
import { RestEndpointMethodTypes } from '@octokit/plugin-rest-endpoint-methods/dist-types/generated/parameters-and-response-types'
import { Context } from '@actions/github/lib/context'
import settings from './common/settings'
import { Octokit } from '@octokit/core/dist-types'
import { Api } from '@octokit/plugin-rest-endpoint-methods/dist-types/types'
import { context, getOctokit }from '@actions/github'
// const ONE_DAY: number = 1000 * 60 * 60 * 24

class GHActionRunner {
  public octokitClient: Octokit & Api
  public context: Context

  public constructor() {
    this.octokitClient = getOctokit(settings.GITHUB_TOKEN)
    this.context = context
  }

  public async run(): Promise<void> {
    const repoInfo: Context['repo'] = this.context.repo
    // eslint-disable-next-line no-console
    console.log('--- repoInfo ---')
    // eslint-disable-next-line no-console
    console.log(repoInfo)

    const listBranchesResponse: RestEndpointMethodTypes['repos']['listBranches']['response'] = await this.octokitClient.rest.repos.listBranches(
      {
        ...repoInfo,
        protected: false,
        per_page: 100
      }
    )

    debug(`found ${listBranchesResponse.data.length} branches`)
    // eslint-disable-next-line no-console
    console.log(listBranchesResponse.data)
    let branchesNames: string = ''
    listBranchesResponse.data.forEach((branch) => {
      branchesNames += `> Name: ${branch.name}\n`
    })
    // eslint-disable-next-line no-console
    console.log(branchesNames)

    // const branchRequests: Array<Promise<RestEndpointMethodTypes['repos']['getBranch']['response']>> = listBranchesResponse.data.map(
    //   async (branch): Promise<RestEndpointMethodTypes['repos']['getBranch']['response']>  => {
    //     return this.octokitClient.rest.repos.getBranch({
    //       ...repoInfo,
    //       branch: branch.name
    //     })
    //   }
    // )

    // const branchesExtraInfo: Array<RestEndpointMethodTypes['repos']['getBranch']['response']> = await Promise.all(branchRequests)
    // console.log('---- branchExtraInfo ----')

    // branchesExtraInfo.forEach((branch: RestEndpointMethodTypes['repos']['getBranch']['response']) => {
    //   // console.log(branch)
    //   console.log(branch.data.name)
    //   let date: Date = new Date(Date.parse(branch.data.commit.commit.author!.date!))
    //   console.log(date.toISOString())
    //   // console.log(branch.data.commit.commit.author)
    // })
  }
}

export default GHActionRunner


// export async function oldBranchNotify(
//   actionContext: ActionContext
// ): Promise<void> {
//   try {
//     const repoInfo: Context['repo'] = actionContext.context.repo
//     console.log('--- repoInfo ---')
//     console.log(repoInfo)

//     const listBranchesResponse = await actionContext.octokit.rest.repos.listBranches(
//       {
//         ...repoInfo,
//         protected: false,
//         per_page: 100
//       }
//     )

//     debug(`found ${listBranchesResponse.data.length} branches`)

//     const branchRequests: Array<Promise<RestEndpointMethodTypes['repos']['getBranch']['response']>> = listBranchesResponse.data.map(
//       async (branch): Promise<RestEndpointMethodTypes['repos']['getBranch']['response']>  => {
//         return actionContext.octokit.rest.repos.getBranch({
//           ...repoInfo,
//           branch: branch.name
//         })
//       }
//     )

//     const branchesExtraInfo: Array<RestEndpointMethodTypes['repos']['getBranch']['response']> = await Promise.all(branchRequests)
//     console.log('---- branchExtraInfo ----')

//     branchesExtraInfo.forEach((branch: RestEndpointMethodTypes['repos']['getBranch']['response']) => {
//       // console.log(branch)
//       console.log(branch.data.name)
//       let date: Date = new Date(Date.parse(branch.data.commit.commit.author!.date!))
//       console.log(date.toISOString())
//       // console.log(branch.data.commit.commit.author)
//     })

//     // // If user has been deleted author will be
//     // const branchWithAuthor = branchExtraInfo
//     //   .filter(
//     //     branch =>
//     //       branch.data.commit.author !== null &&
//     //       branch.data.commit.author.login !== excludedAuthor
//     //   )
//     //   .map(value => {
//     //     return {
//     //       author: value.data.commit.commit.author,
//     //       name: value.data.name,
//     //       login: value.data.commit.author!.login
//     //     }
//     //   })

//     // const oldBranches = branchWithAuthor.filter(value => {
//     //   return (
//     //     Date.parse(value.author!.date!) <
//     //     Date.now() - ONE_DAY * numberOfDaysToLookIntoPast
//     //   )
//     // })

//     // debug(
//     //   `found ${oldBranches.length} branches older than ${numberOfDaysToLookIntoPast} days old`
//     // )

//     // const formattedBranches = oldBranches.map(value => {
//     //   return `${value.name}: last commit by @${value.login}`
//     // })

//     // if (oldBranches.length > 0) {
//     //   await actionContext.octokit.rest.issues.create({
//     //     ...repoInfo,
//     //     title: `Old branches ${new Date().toDateString().slice(0, 15)}`,
//     //     body: `## Branches older than ${numberOfDaysToLookIntoPast} days\n${formattedBranches.join(
//     //       '\n'
//     //     )}`,
//     //     assignees: Array.from(new Set(oldBranches.map(value => value.login)))
//     //   })
//     // }
//   } catch (error) {
//     console.log(error)
//     setFailed(error.message)
//   }
// }