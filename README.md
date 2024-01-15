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
    "1.1.0",
    "1.2.0",
    "1.2.1",
    "1.3.0"
  ]
}
```

If `true`:

```json
{
  "versions": [
    {
      "version": "1.0.0",
      "published_at": "2016-04-15T02:26:00.141Z"
    },
    {
      "version": "1.1.0",
      "published_at": "2016-04-15T03:06:20.334Z"
    },
    {
      "version": "1.2.0",
      "published_at": "2016-04-19T05:39:17.391Z"
    },
    {
      "version": "1.2.1",
      "published_at": "2016-06-17T09:05:32.462Z"
    },
    {
      "version": "1.3.0",
      "published_at": "2017-06-08T04:21:08.821Z"
    }
  ]
}
```

## Outputs

### `versions`

Package's versions

## Usage

For live examples, please see [actions](https://github.com/yakubique/npm-versions/actions/workflows/test-myself.yaml)

```yaml
uses: yakubique/npm-versions@1.0.0
with:
  package: emoji-hash
```

## Custom registry

```yaml
uses: yakubique/npm-versions@1.0.0
with:
  package: emoji-hash
  registry: https://npm.my-company.org
```

## Sort versions

```yaml
uses: yakubique/npm-versions@1.0.0
with:
  package: emoji-hash
  sortVersions: 'desc'
```

## Use output

```yaml
steps:
  - uses: yakubique/npm-versions@1.0.0
    id: get_versions
    with:
      package: emoji-hash
  - run: |
      echo "${{ steps.get_versions.outputs.versions }}"
```
