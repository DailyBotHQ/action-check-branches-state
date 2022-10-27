import { ObjectType } from './type'

const settings: ObjectType = {
  DEBUG: process.env.DEBUG,
  GITHUB_TOKEN: process.env.GITHUB_TOKEN,
  GITHUB_REPOSITORY: process.env.GITHUB_REPOSITORY,
  HTTP_REQUEST_TIMEOUT: {
    response: 10000,  // Wait 5 seconds for the server to start sending response,
    deadline: 40000, // Time limit for waiting for responses.
  },
}

export default settings