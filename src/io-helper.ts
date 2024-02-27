import * as core from '@actions/core';
import { getOptional, getBooleanInput, isBlank } from '@yakubique/atils/dist';

enum Inputs {
    Package = 'package',
    Registry = 'registry',
    SortVersions = 'sortVersions',
    Debug = 'debug',
    Details = 'details',
}


export interface ActionInputs {
    package: string;
    registry: string;
    sortVersions: number;
    details: boolean;
    debug: boolean;
}

export function getInputs(): ActionInputs {

    const result: ActionInputs | any = {};

    result.package = core.getInput(Inputs.Package, { required: true });
    result.registry = getOptional(Inputs.Registry, 'https://registry.npmjs.org', { required: false });


    let sortVersions = core.getInput(Inputs.SortVersions, { required: false });
    if (isBlank(sortVersions)) {
        result.sortVersions = -1;
    } else {
        sortVersions = sortVersions.trim().toLowerCase();
        if (sortVersions === 'asc') {
            result.sortVersions = -1;
        } else if (sortVersions === 'desc') {
            result.sortVersions = 1;
        } else {
            core.warning('Unexpected value of `sortVersions`. Using default instead.');
            result.sortVersions = -1;
        }
    }

    result.debug = getBooleanInput(Inputs.Debug, { required: false });
    result.details = getBooleanInput(Inputs.Details, { required: false });

    return result;
}
