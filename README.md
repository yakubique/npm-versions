# npm-versions

Get list of package's versions from NPM registry

## Inputs

### `package`

**Required** The name of the npm package (_example_: `"emoji-hash"`).

### `registry`

_Optional_ Registry URL (_default_: `"https://registry.npmjs.org"`)

### `sortVersions`

_Optional_ Sort versions by publication date `["ASC", "DESC"]` (_default_: `"ASC"`)

### `debug`

_Optional_ Be verbal (_default_: `'false'`)

### `details`

_Optional_ Add publication date to return values (_default_: `'false'`)

If `false` (_default_):

```json
{
  "versions": [
    "1.0.0",
    "1.0.1"
  ]
}
```

If `true`:

```json
{
  "versions": [
    {
      "version": "1.0.0",
      "published_at": "2015-03-24T00:12:24.039Z"
    }
  ]
}
```

## Outputs

### `versions`

Package's versions

## Basic usage

```yaml
uses: yakubique/npm-versions@0.0.1
with:
  package: emoji-hash
```

## Custom registry
```yaml
uses: yakubique/npm-versions@0.0.1
with:
  package: emoji-hash
  registry: https://npm.my-company.org
```

## Sort versions
```yaml
uses: yakubique/npm-versions@0.0.1
with:
  package: emoji-hash
  sortVersions: 'desc'
```

## Use output
```yaml
steps:
  - uses: yakubique/npm-versions@0.0.1
    id: get_versions
    with:
      package: emoji-hash
  - run: |
      echo "${{ steps.get_versions.outputs.versions }}"
```
