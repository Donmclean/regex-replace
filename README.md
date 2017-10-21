# regex-replacer
A simple CLI/Module for regex replacing strings in files &amp; renaming files recursively

[![Build Status](https://travis-ci.org/Donmclean/regex-replacer.svg?branch=master)](https://travis-ci.org/Donmclean/regex-replacer) [![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/Donmclean/riko/blob/master/LICENSE)

## Getting Started
This library can be used both locally as a module or globally as a CLI.
Simply choose which you'd like via the install command below.

local: `npm install regex-replacer`

global: `npm install -g regex-replacer`

## Code Example

###### CLI Example
Replace filenames and file contents
```bash
regex-replacer 'search string' 'replace string' './path/to/recursively/replace'
```

Replace file content only
```bash
regex-replacer 'search string' 'replace string' './path/to/recursively/replace' --filecontents
```

Replace filenames only
```bash
regex-replacer 'search string' 'replace string' './path/to/recursively/replace' --filenames
```

###### Module Example
```javascript
import regexReplacer from 'regex-replacer';

const searchString = 'string to search for';
const replaceString = 'string to replace with';
const path = './some/path/to/recursively/replace';

const options = {
    filenamesOnly: false, //default
    fileContentsOnly: false //default
};

//promise
regexReplacer(searchString, replaceString, path, options)
    .then(() => {
        //do something after successful regex replace
    })
    .catch((err) => {
        //handle errors
    });

//async/await
const doRegexReplace = async function() {
    try {
        await regexReplacer(searchString, replaceString, path, options);
    } catch (err) {
        console.error('err > regexReplacer > testing', err);
    }
}

//callback (no support for callbacks currently)
```

### Prerequisites

- [Node JS](https://nodejs.org) >= `6.x.x`
- [Yarn](https://yarnpkg.com) (optional but recommended)

## API Reference
###### CLI Example
- `regex-replacer searchString replaceString path`
- Flags:
    - `--filename` or `--filenames` For filenames only
    - `--filecontent` or `--filecontents` For file contents only

###### Module Example
```javascript
regexReplacer(searchString, replaceString, path, options)
```

- Returns **promise**
- Options:
    - filenamesOnly: `false` default
    - fileContentsOnly: `false` default


## Running the tests
- Fork or clone
- cd into `regex-replacer`
- run `yarn` or `npm install`
- `npm test`

## Contributing

Please read [CONTRIBUTING.md](./CONTRIBUTING.md) for details on code of conduct, and the process for submitting pull requests.

## Versioning

[SemVer](http://semver.org/) is used for versioning. For the versions available, see the [releases on this repository](https://github.com/Donmclean/regex-replacer/releases).

## Authors

* [**Don Mclean**](https://github.com/Donmclean)

See also the list of [contributors](https://github.com/Donmclean/regex-replacer/contributors) who participated in this project.

## License

This project is licensed under the [MIT license](./LICENSE).

## Acknowledgments

* [replace](https://github.com/harthur/replace)
* [fs-extra](https://github.com/jprichardson/node-fs-extra)