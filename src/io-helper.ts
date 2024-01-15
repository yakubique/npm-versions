import * as core from '@actions/core';
import { InputOptions } from '@actions/core';

enum Inputs {
    Package = 'package',
    Registry = 'registry',
    SortVersions = 'sortVersions',
    Debug = 'debug',
    Details = 'details',
}

function isBlank(value: any): boolean {
    return value === null || value === undefined || (value.length !== undefined && value.length === 0);
}

function isNotBlank(value: any): boolean {
    return value !== null && value !== undefined && (value.length === undefined || value.length > 0);
}

export function getBooleanInput(name: string, options?: InputOptions): boolean {
    const value = core.getInput(name, options);
    return isNotBlank(value) &&
        ['y', 'yes', 't', 'true', 'e', 'enable', 'enabled', 'on', 'ok', '1']
            .includes(value.trim().toLowerCase());
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
    result.registry = core.getInput(Inputs.Registry, { required: false });
    if (isBlank(result.registry)) {
        result.registry = 'https://registry.npmjs.org';
    }

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
            core.warning("Unexpected value of `sortVersions`. Using default instead.");
            result.sortVersions = -1;
        }
    }

    result.debug = getBooleanInput(Inputs.Debug, { required: false });
    result.details = getBooleanInput(Inputs.Details, { required: false });

    return result;
}
