# realmassive-components

This project is a component _browser_ and navigator designed for enabling developers and end users to inspect our various shared components which are used in multiple downstream applications, including but not limited to our core platform, 3rd party-deployed widgets, and search/listing portal solutions. This project uses [react-styleguidist](https://react-styleguidist.js.org/) to present a convenient component library interface.

## Architecture and Philosophy

RealMassive Components (RMCs) are used in multiple places throughout the RealMassive platform. This project exists to make it easy to find and develop RMCs.

Each RMC exists in its own NPM package, whose name must be prefixed with `rmc-` so that this application can identify it as an RMC in the NPM registry. This is done instead of having modules in this repository so that modules are not tied to the version of the `realmassive-components` project, which can cause hassles with backwards compatibility or conflicting needs for modules at different versions in downstream projects.

In order to make RMCs universally consumable across RM projects, they must be developed according to a specific set of build tooling guidelines (see **RealMassive Component Guidelines**). And in order to consume any RMC, projects must also use similar or compatible build tooling guidelines (see **RMC-Consuming Project Guidelines**).

# Development and Viewing

## Getting started

1. Make sure you are logged into NPM (run `npm login`) and belong to the RealMassive organization
1. Clone this repo and `cd` to it
1. `npm install`
1. Run `npm run setup`

The `setup` command looks up any packages on NPM prefixed with `@realmassive/rmc-`, installs them as regular node modules, and then symlinks them into a local `components` directory. If there is a `.devcomponents.json` file, it will symlink local directories specified in the JSON file to the `components` directory as well. (See **Local development** for more info on this).

Note that if new `rmc-` components are added to the NPM registry, you will need to run `npm run setup` again to pick them up.

## Viewing components

After running the steps from **Getting started**:

1. `npm run styleguide`
2. Navigate to http://localhost:6060.

## Local development

In order to develop locally, you use a `.devcomponents.json` file in the root of this project to configure the `npm run setup` command. It has the following syntax:

```json
{
	"linkLocal": {
		"rmc-component": "../rmc-component-directory"
	},
	"skipRemote": true
}
```

Using the `linkLocal` property will create a symlink in the `components` directory, with the same name as the key provided. The symlink target will be the resolved path passed as the value. For example, in the above case, the directory `components/rmc-component` would be created, pointing to the directory `../rmc-component-directory` on your filesystem. If the key of a `linkLocal` repository is the same as a remote, existing `rmc-*` NPM package, the remote package will not be downloaded, favoring the locally symlinked directory.

If set to `true`, the `skipRemote` property will cause `npm run setup` command to skip searching the remote NPM registry, which is useful if you only need to set up the project to develop local components.

Once directories are symlinked, you can edit the components directly from your local `realmassive-components` repo. Styleguidist live-reloads your changes, giving you quick feedback. Check the [react-styleguidist docs](https://react-styleguidist.js.org/docs/documenting.html) for more info on how to document your components for the library and make them easy to use.

After you're done making changes, you will need to commit your work in the actual component repos that you have symlinked, not this one (unless you have made modifications to this project).

NOTE: **DO NOT** create new module repositories directly within the `components/` directory. It is not tracked by git, and is emptied out every time `npm run setup` is run. You should create a separate directory and add it to your `.devcomponents.json` file.

# RealMassive Component Rules and Guidelines

## Rules

These are the rules for working with RMCs. Many of these are already handled for you by `@realmassive/generator-rmc`, as explained in Development and Publishing:

- Handled for you by `@realmassive/generator-rmc` and Yeoman:
	- The component's package name must begin with `@realmassive/rmc-`.
	- The component must be a React component.
	- The component should be developed using the `@realmassive/component-build-chain` package
	- The component should specify the `"entry"` key in the `package.json` as `"dist/index.js"`
	- The component should specify the `"files"` key in the `package.json` as `"dist"`
	- All generated files should end up in the "dist" property
- Things you have to set up:
	- For single-component packages:
		- The package must have a `src/index.js` file and build out a top-level `index.js` which can be imported.
		- The package must supply a top-level README.md which can be read by react-styleguidist to use
	- For multi-component packages ([**rmc-icons**](https://github.com/RealMassive/rmc-icons), for example):
		- The package must have a `src/index.js` file which exports all the expected files

## Development and Publishing

Developing individual RMC packages has a specific workflow required.

1. Setup
	1. `npm install -g yo @realmassive/generator-rmc` - Install Yeoman and the RMC template generator
	1. `yo @realmassive/rmc <component-name>` - Create your component project (omit the initial `rmc-`, it will be added for you)
1. Development in `realmassive-components` project
	1. Add path to component folder to your `.devcomponents.json` file then `npm run setup`
	1. Develop locally in `realmassive-components`, taking advantage of hot reload and documentation
1. Publishing
	1. Create GitHub repository and push
	1. Run `npm run build` and `npm publish` in the individual package

NOTE/POTENTIAL ISSUE: This creates a coupling between the build tooling in `component-build-chain` and the webpack config in this project's `styleguide.config.js`. If an RMC expands the scope of the build tooling in `component-build-chain`, this project's webpack config must also be updated to accomodate it.

Currently, the webpack config in Styleguidist supports Babel with babel-preset-env for the last 2 browser versions, React, and loading image assets (.png, .jpg, and .gif).
