PKStart PWA
============

Running the PWA Frontend
------------------------

### Common code in the `pks-common` repository
Types, interfaces and utils common to all PKStart applications are stored in the `pks-common` [repository](https://github.com/PKStart/pks-common). The code is added to each app's repo as an NPM package directly from Github by the following command:
```shell
npm install git+https://github.com/PKStart/pks-common.git
```
Make sure to reinstall and update this package whenever the common code changes. Use the `npm run update:common` command for this.

### Environment variables
Before starting the app, make sure there is a `.env` file in the root directory with all the environment variables listed in the `.env.example` file.

### DEV Server
To run the development server for the frontend, simply use the `npm run start` script and open your browser at [http://localhost:8300](http://localhost:8300).


CI pipelines and testing
------------------------

### Github actions
Github action workflows are set up for code quality checks and build. These pipelines are triggered on each push and pull request for the `develop` and `master` branches, and also can be started manually on Github on any branch.

* `code-check-build.yml`: This workflow is responsible for linting, format check and to make sure that builds are passing for each component.


Testing locally
---------------

### Code quality checks
Husky is set up to run the linter and check code formatting before each commit.
These checks however can also be run using the `npm run lint` and `npm run format:check` commands for the entire repository.


Deploying for production
------------------------

The PWA frontend is hosted on a static private server.

### Automatic deployment
Automatic deployment is set up using Github Actions in the `deploy.yml` file under the workflows folder.

The process will automatically run by pushing to the `master` branch or can be started manually on Github with the dispatch action.

Environment variables are stored on Github as repository secrets.

### Manual deployment
Run the `npm run build` command and simply use FTP as usual :) 
