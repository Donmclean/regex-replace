const fs = require('fs-extra');
const replace = require('replace');

const walkAsync = (path) => {
    return new Promise((resolve, reject) => {
        walk(path, (err, results) => {
            if(err) {
                reject(err);
            } else {
                resolve(results);
            }
        })
    });
};

const walk = function(dir, done) {
    let results = [];
    fs.readdir(dir, function(err, list) {
        if (err) return done(err);
        let i = 0;
        (function next() {
            let file = list[i++];
            if (!file) return done(null, results);
            file = dir + '/' + file;
            fs.stat(file, function(err, stat) {
                if (stat && stat.isDirectory()) {
                    walk(file, function(err, res) {
                        results = results.concat(res);
                        next();
                    });
                } else {
                    results.push(file);
                    next();
                }
            });
        })();
    });
};

const regexReplace = async (searchString, replaceString, path, customOptions = {}) => {
    const defaultOptions = {
        filenamesOnly: false,
        fileContentsOnly: false
    };

    const { filenamesOnly, fileContentsOnly } = Object.assign({}, defaultOptions, customOptions);

    const pathExists = await fs.pathExists(path);

    if(!pathExists) {
        console.error(`ERROR: Path (${path}) does not exist.`);
        return false;
    } else {
        const files = await walkAsync(path);

        if(!fileContentsOnly) {
            //renames files
            files.forEach((file) => {
                const renamedFile = file.replace(new RegExp(searchString, 'g'), replaceString);
                fs.renameSync(file, renamedFile);
            });
        }

        if(!filenamesOnly) {
            //replaces file contents
            replace({
                regex: new RegExp(searchString, 'g'),
                replacement: replaceString,
                paths: [path],
                recursive: true,
                silent: true,
            });
        }

        return true;
    }
};

///////////////////////
//CLI execution section
///////////////////////

const argv = process.argv;
const [ cmd, cmdFile, searchString, replaceString, path, ...options ] = argv;

const customOptions = options.reduce((acc, value, key) => {
    switch (value) {
        case '--filenames': {
            acc.filenamesOnly = true;
            break;
        }
        case '--filecontents': {
            acc.fileContentsOnly = true;
            break;
        }
        default: {
            break;
        }
    }

    return acc;
}, {});

if(searchString && replaceString && path) {
    regexReplace(searchString, replaceString, path, customOptions);
} else {
    console.error('missing required arguments: (<searchString>, <replaceString>, <path>, [options])');
}

module.exports = regexReplace;