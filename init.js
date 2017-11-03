const exec = require('child_process').exec;
const path = require('path');
const fs = require('fs');
const Promise = require('bluebird');
const npm = require('npm-programmatic');
let developmentFile;

const filterForComponentPackages = (obj) => {
    const filtered = {};
    Object.keys(obj).forEach(key => {
        if (key.indexOf('@realmassive/rmc-') === 0) {
            filtered[key] = obj[key];
        }
    });

    return filtered;
};

const getRealMassiveComponentPackages = () => {
    return new Promise((resolve, reject) => {
        exec('npm access ls-packages realmassive', (e, stdout, stderr) => {
            if (e) {
                console.error(e);
                throw e;
            }

            let packages;
            try {
                packages = JSON.parse(stdout);
                resolve(filterForComponentPackages(packages));
            } catch (parseError) {
                reject(parseError);
            }
        });
    });
};

const componentDir = path.resolve(__dirname, './components');

const developmentFileExists = () => {
    return fs.existsSync(path.resolve(__dirname, '.devcomponents.json'));
};

const componentDirExists = () => {
    return fs.existsSync(componentDir);
};

const createComponentDirectory = () => {
    if (!componentDirExists()) {
        fs.mkdirSync(componentDir);
    }
};

const readDevComponentsFile = () => {
    return require('./.devcomponents.json');
};

const installDependencies = (obj) => {
    const deps = Object.keys(obj);

    if (deps.length > 0) {
        return npm.install(Object.keys(obj)).then(result => {
            console.log('Installed ' + deps.length + ' packages', result);
            return obj;
        });
    } else {
        console.log('No published rmc-* packages to install.');
        return obj;
    }
};

const addDevComponents = (obj, devComponents) => {
    const combined = Object.assign({}, obj);

    Object.keys(devComponents).forEach(devComponentName => {
        combined[devComponentName] = path.resolve(
            __dirname,
            devComponents[devComponentName]
        );
    });

    return combined;
};

const setDependencyPaths = (obj) => {
    dependencyPaths = {};

    Object.keys(obj).forEach(key => {
        dependencyPaths[key] = path.resolve(__dirname, 'node_modules/' + key)
    });

    return dependencyPaths;
};

const clearSimlinks = () => {
    const files = fs.readdirSync(componentDir);

    if (files.length > 0) {
        files.forEach(file => {
            const filePath = componentDir + '/' + file;

            const stats = fs.lstatSync(filePath);
            if (!stats.isSymbolicLink()) {
                throw new Error(
                    'Cannot remove ' + file + ' from components directory, it is not a symbolic link. ' +
                    'Do not put non-symbolic links into the components directory.'
                );
            } else {
                fs.unlinkSync(filePath);
            }
        });
    }
};

const symlinkPaths = (dependencyPaths) => {
    const dependencyKeys = Object.keys(dependencyPaths);
    if (dependencyKeys.length > 0) {
        const symlinkLog = [];

        dependencyKeys.forEach(packageName => {
            let revisedPackagedName = packageName;
            // Strip off the leading @realmassive/ if it exists--it may
            // not exist in the case where we have a local development
            // folder that is not inside of a namespaced folder
            if (packageName.indexOf('@realmassive/') === 0) {
                revisedPackagedName = packageName.substring(13);
            }

            const symlinkDir = path.resolve(componentDir, revisedPackagedName);
            fs.symlinkSync(dependencyPaths[packageName], symlinkDir, 'dir');

            symlinkLog.push(symlinkDir + ' -> ' + dependencyPaths[packageName]);
        });

        console.log('Symlinked the following directories:');
        console.log(symlinkLog.join('\n'));
    } else {
        console.log('Nothing to symlink.');
    }
};



createComponentDirectory();

let devComponents;
if (developmentFileExists()) {
    devComponents = readDevComponentsFile();
    const devComponentsCount = Object.keys(devComponents).length;
    console.log(devComponentsCount + ' component(s) were found specified in .devcomponents.json, they will be symlinked.');
}

getRealMassiveComponentPackages()
    .then(installDependencies)
    .then(setDependencyPaths)
    .then(deps => {
        return addDevComponents(deps, devComponents);
    })
    .then(deps => {
        clearSimlinks();
        return symlinkPaths(deps);
    })
    .catch(e => {
        console.log(e);
    });
