# realmassive-components

This project is a component _browser_ and navigator designed for enabling developers and end users to inspect our various shared components which are used in multiple downstream applications, including but not limited to our core platform, 3rd party-deployed widgets, and search/listing portal solutions. This project uses [Storybook](https://storybook.js.org/) to present a convenient component library interface.

## Architecture and Philosophy

RealMassive Components (RMCs) are used in multiple places throughout the RealMassive platform. This project exists to make it easy to find and develop RMCs.

Each RMC exists in its own NPM package, whose name must be prefixed with `rmc-` so that this application can identify it as an RMC in the NPM registry. This is done instead of having modules in this repository so that modules are not tied to the version of the `realmassive-components` project, which can cause hassles with backwards compatibility or conflicting needs for modules at different versions in downstream projects.

In order to make RMCs universally consumable across RM projects, they must be developed according to a specific set of build tooling guidelines (see **RealMassive Component Guidelines**). And in order to consume any RMC, projects must also use similar or compatible build tooling guidelines (see **RMC-Consuming Project Guidelines**).

# Development and Viewing

## Getting started

1. Make sure you are logged into NPM (run `npm login`) and belong to the RealMassive organization
1. Clone this repo and `cd` to it
1. `npm install`

## Viewing components

After running the steps from **Getting started**:

1. `npm run storybook`
2. Navigate to `http://localhost:9001`.

## Local development

In order to develop locally, you can simply add the package to this repository's dependency list in `package.json` then run `npm link <path to local directory>`. Then you can import your package by the official name. For instance, if you intend to do development on a package called `@realmassive/rmc-fancy-box`, and you had a local `fancy-box` repository as a sibling of your `realmassive-components` directory, you would run the following from the `realmassive-components` directory:

	1. Add `@realmassive/rmc-fancy-box` to the `package.json` `dependencies` object
	1. Generate a new component boilerplate with `yo @realmassive/rmc <component-name>` (see Development and Publishing)
	1. `npm link ../fancy-box`
	1. `npm run storybook`
	1. In another terminal inside of the `fancy-box` directory, `npm run dev`
	1. Write a new story for your component inside of `stories`.
	1. Add a new entry to `.storybook/config.js` for your file.

Once directories are symlinked, you can edit the components directly from your local `realmassive-components` repo. Storybook live-reloads your changes, giving you quick feedback. Check the [Storybook docs](https://storybook.js.org/basics/writing-stories/) for more info on how to write stories for your component.

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

## Issues and TODOs

- Because we rely on the compiled versions of rmc-components (to avoid various issues with conflicting dependencies/etc.), the rendered source code names in the Storybook are minified names like "w", "e", etc. Potential solutions are welcomed.