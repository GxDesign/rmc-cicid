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

# RealMassive Component Guidelines

TODO: use https://github.com/webpack-contrib/eslint-loader

Working packages:

- styled-components

How realmassive-components will work:

- Centralized project uses react-styleguidist to create a list of components.
- On load, use a command to load in the latest versions of the components. Will check the versions of these packages and show updated packages. This is a package _browser_. (Maybe on-the-fly compilation? Not sure if I can get that to work.) The developer can choose to symlink a package locally.
- In order to use `realmassive-components`, the user must be logged in to NPM and have access to the RealMassive private package registry.
- User can specify a local directory and a package name (similar to how package.json#dependencies works) to define a working component for development inside of a `devcomponents.json` file (which will be gitignored)
- RM components (or RMCs)
	- RMCs must be React components.
	- RMCs must use ES6 syntax and expect to be imported via webpack.
	- RMCs must export a top-level index.jsx file that exports the component.
	- RMCs must define a top-level README.md file.
	- RMCs must use CSS Modules.
	- RMCs must document their CSS structure
	- RMCs must export only one top-level component per package (although that component may rely on child components--but these child components should not be used by downstream consumers).
	- RMCs must provide tests which match the glob `*.test.js`.
	- RMCs may utilize functionality from the following toolchain:
		- webpack
		- babel-preset-react
		- babel-preset-es2015
		- babel-preset-stage-0
		- babel-plugin-react-css-modules
	- RMCs do not provide dist versions of themselves because they are to be consumed by downstream applications which we control; third parties do not need distributed versions of our files.
	- RMCs must provide a way to override or utilize the CSS classes provided.

- Downtream consumers (applications, projects, 3rd party embeds)

NOTE that realmassive-components can simply have a component force symlinked into its `components` directory--but `setup.js` will overwrite any component that conflicts with existing NPM packages or that is specified within `.devcomponents.json`. (I should fix this so that you can flag whether or not you intend to overwrite. Don't overwrite by default, probably?)

# RMC-Consuming Project Guidelines