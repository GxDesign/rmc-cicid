# realmassive-components

This project is a component _browser_ and editor designed for enabling developers and end users to inspect our various shared components which are used in multiple downstream applications, including but not limited to our core platform, 3rd party-deployed widgets, and search/listing portal solutions. This project uses [react-styleguidist](https://react-styleguidist.js.org/) to present a convenient component library interface.

## Getting started

1. Clone this repo and `cd` to it
2. `npm install`
3. `


## Local development

realmassive-components

## Tests

# RealMassive Component Guidelines

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

NOTE that realmassive-components can simply have a component force symlinked into its `components` directory--but `init.js` will overwrite any component that conflicts with existing NPM packages or that is specified within `.devcomponents.json`. (I should fix this so that you can flag whether or not you intend to overwrite. Don't overwrite by default, probably?)