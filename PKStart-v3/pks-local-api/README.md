PKStart Local API
=================

Running the Local API
---------------------

### Common code in the `pks-common` repository
Types, interfaces and utils common to all PKStart applications are stored in the `pks-common` [repository](https://github.com/PKStart/pks-common). The code is added to each app's repo as an NPM package directly from Github by the following command:
```shell
npm install git+https://github.com/PKStart/pks-common.git
```
Make sure to reinstall and update this package whenever the common code changes. Use the `npm run update:common` command for this.

### Environment variables
Before starting the API, make sure there is a `.env` file in the root directory with all the environment variables listed in the `.env.example` file.

> Note: At this point no environment variables are used.

### DEV Server
To start the API in development mode simply run the `npm run start:dev` script, and it will be served at [http://localhost:8400](http://localhost:8400).

### API documentation
* Swagger UI documentation is available at [http://localhost:8400/api](http://localhost:8100/api)
* OpenAPI JSON can be downloaded from the [http://localhost:8400/api-json](http://localhost:8100/api-json) URL, which can be imported to Insomnia or Postman for testing.


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

### API e2e / integration tests
TBA

Running the local server in the background
------------------------------------------

One easy way to run the server in the background is using `nohup`. 
Create an alias in the `~/.bashrc` file to make it easier:
```shell
alias pks-local='nohup node /path/to/pks-local-api/dist/main.js > /path/to/pks-local.out &'
```
- The last argument is a path where the log file will be stored. Each new run of the app will clear the log and start over.
- Also note that in the log file you can actually see the PID of the running app, e.g. `[Nest] 23947 - 08/21/2022, 6:32:26 PM LOG ...`

Useful commands to find and to stop the server:
```shell
# list the running node processes
pgrep node 

# get detailed info about a process by PID
ps -Flww -p <PID>

# stop the server (process) by PID
kill <PID>
```
