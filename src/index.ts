import * as core from '@actions/core';
import * as httpm from '@actions/http-client';
import { ActionInputs, getInputs } from './io-helper';
import { valid as isValidSemver } from 'semver';
import { buildOutput } from '@yakubique/atils/dist';

enum Outputs {
    Versions = 'versions',
}

const setOutputs = buildOutput(Outputs);

interface Version {
    version: string;
    published_at: string;
}

(async function run() {
    try {
        const inputs: ActionInputs = getInputs();

        core.info(`Getting versions for:\n  package: ${inputs.package}\n  registry: ${inputs.registry}`);

        const endpoint = `${inputs.registry}/${inputs.package}/`;

        const http = new httpm.HttpClient('npm-versions');
        const res: httpm.HttpClientResponse = await http.get(endpoint);

        if (inputs.debug) {
            core.info(`Status: ${res.message.statusCode}`);
        }

        const body: string = await res.readBody();
        const json = JSON.parse(body);

        const allVersions: Version[] = [];
        const itemVersions = json.time as Record<string, string>;
        Object.keys(itemVersions).forEach((version) => {
            if (isValidSemver(version)) {
                allVersions.push({
                    version,
                    published_at: itemVersions[version]
                });
            }
        });

        if (inputs.debug) {
            core.info(`Server responded with: ${JSON.stringify(allVersions)}`);
        }

        allVersions.sort(
            (a, b) =>
                inputs.sortVersions * (new Date(b.published_at as string).getTime() -
                    new Date(a.published_at as string).getTime())
        );

        if (inputs.details) {
            setOutputs({ versions: allVersions }, inputs.debug);
        } else {
            setOutputs({ versions: allVersions.map((x) => x.version) }, inputs.debug);
        }

        core.info('Get release has finished successfully');
    } catch (err: any) {
        core.setFailed(err.message);
    }
})();
