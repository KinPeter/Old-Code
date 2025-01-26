PKStart Common
==============

CI pipelines and testing
------------------------

### Github actions
Github action workflows are set up for code quality checks, build and testing. These pipelines are triggered on each push and pull request for the `develop` and `master` branches, and also can be started manually on Github on any branch.

* `code-check-build.yml`: This workflow is responsible for linting, format check and to make sure that builds are passing for each component.

Testing locally
---------------

### Code quality checks
> After each new local (dev) installation please run the `npm run husky:install` script. This should be automatic by default, but since this repo is used as a package, we can't use the `prepare` npm script for husky.

Husky is set up to run the linter and check code formatting before each commit.
These checks however can also be run using the `npm run lint` and `npm run format:check` commands for the entire repository.
