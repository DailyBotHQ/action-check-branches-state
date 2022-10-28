import { Context } from '@actions/github/lib/context';
import { Octokit } from '@octokit/core/dist-types';
import { Api } from '@octokit/plugin-rest-endpoint-methods/dist-types/types';
declare class GHActionRunner {
    octokitClient: Octokit & Api;
    context: Context;
    constructor();
    run(): Promise<void>;
}
export default GHActionRunner;
