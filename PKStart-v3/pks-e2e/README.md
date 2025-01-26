PKStart E2E tests
=================

Code quality checks
-------------------
Husky is set up to run the linter and check code formatting before each commit.
These checks however can also be run using the `npm run lint` and `npm run format:check` commands for the entire repository.

Also, these checks will run after each push using Github action workflows.

Web frontend e2e tests
----------------------

There are many ways to run the tests:

### Watch mode (for development)
```shell
npm run watch:web
```
This will open the Cypress UI where we can see each step while the tests are running. Especially useful while writing the tests themselves.

### Headless mode 
```shell
npm run test:web
```
This will run all the tests using a headless browser all in the bacground. Results will be displayed in the log (standard outpu)

> For **Watch mode** and **Headless mode** please note:
> - Make sure everything is running in the background (DB, API, Web).
> - For each fresh test run the DB should be cleared using `npm run clear:db` and then `npm run start:db` in the `pks-api` repository.

### Testing in docker, local files
```shell
npm run test:web:docker-local
```
It is now possible to run all Web e2e tests in a completely encapsulated docker environment. This command will use the apps from the local file system. Make sure the `pks-api` and `pks-web` repositories are available next to the current folder with the same folder names!

### Testing in docker, pushed code, but locally
```shell
npm run test:web:docker
```
Similar to the option above, but in this case the workflow will actually pull the current `develop` branch of the `pks-api` and `pks-web` applications directly from Github, and it is not using the local files!

### Testing in docker online, with Github Actions

Dockerized testing is also possible in the cloud on Github using Actions.
Go to the `pks-e2e` repository, go to the **Actions** tab, choose the **Web e2e tests** workflow, and click **Run workflow**.
There is no automatic trigger set up yet.

> For all dockerized test runs (locally) you don't need the other apps running, everything will happen inside the containers. On the contrary, **it is important not to run any of the applications locally, because it will cause the used ports numbers to clash!**
