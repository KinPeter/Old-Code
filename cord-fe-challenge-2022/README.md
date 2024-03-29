# cord Coding Challenge (Front-end)

## Development

### Getting Started

First, install the dependencies using:

```shell
npm ci
```

Create a `.env` file in the project root directory and add your MovieDB API Key as in the example below:

```shell
REACT_APP_API_KEY=YourSuperSecretKey
```

To start serving the application in development mode using a web server, run:

```shell
npm run start
```

And open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


### Code quality

For ensuring proper code quality we use ESLint and Prettier.
[ESLint](https://eslint.org/) enforces Javascript/Typescript best practices while [Prettier](https://prettier.io/) keeps our files nicely formatted.

It is important to **set up your IDE** to automatically use these tools:

- lint code while typing
- format files on each save

To check the linting and formatting you can also run these commands:

```shell
npm run lint
npm run format:check
```

If, for some reason Prettier didn't format a file, it is possible to run it in `--write` mode to format everything in the project:

```shell
npm run format
```

We also use [Husky](https://www.npmjs.com/package/husky) to perform an automatic check before each commit, so in case there is a linting error or not properly formatted file within your changes, the `git commit` will fail.


## Challenge notes

### Introduction

Welcome! This coding challenge is designed to explore your React & SCSS Front-end skills. You will have to create a simple SPA based on the provided mockup and make a few API calls to a public web API.

### The challenge

You have to complete the test and write any necessary code so that the discover page looks like this [mockup] designs. All the images/icons you need are already imported and you can find them under the `images` folder.

The discover page should enable the user to search for movies as keywords are typed into the search bar. Functionality for filtering does not need to be implemented, however the filter categories should still be expandable/collapsable upon clicking. On mobile devices, the navigation bar should slide in from left to right when the user clicks on the hamburger icon, and back when the user clicks on a close icon or outside the `SideBar`. In addition, you have to add all the responsive stylesheets for the app to run smoothly on mobile devices.

PS. Once you've completed the test follow all the `TODO` comments to make sure you have implemented all required functionality.

Movie data can be queried via [theMovieDB]:

- Popular movies API doc: [popularMovies]
- Movie Genres API doc: [movieGenres]
- Search movies API doc: [searchMovies]

Packages & Technologies used in the repo:

- `axios`
- `sass`
- `react-router-dom`
- `styled-components`

### Submission guide

Once you are done, please share your test on github with tech@cord.co and email the link to the repo to our In-house recruiter, Monika at monika@cord.co

### How we review

- **Design**: Were you able to translate the mockup into a web application that works well on various browsers and devices? Does the output match the mockup? Are all the required interactions implemented? Is your web app accessible? This is the most important aspect. Weight: 50%
- **Functionality**: Does the search function work? Do the results load instantly as the user types? If the API backend has rate limiting enforced, how do you implement the aforementioned while also taking rate limiting into account? Weight: 25%
- **Code quality**: Is the code easy to understand, maintain and scale? Is the coding style consistent with the language's best practices? Do you demonstrate a good grasp of JavaScript, React and SCSS? Weight: 15%
- **Performance**: Does the UI render quickly with no performance issues? Have you ensured that API requests do not fire so often that they can brick browser performance? Weight: 10%

### Bonus points

- **Automated Tests** - Are there any automated tests?
- **Documentation** - Is the README well written? Are the commit messages clear?
- **Reporting** - React Profiler report with demonstrated knowledge of reading / reporting performance data
- **Production-readiness** - Is there proper error handling? Is the code ready to put into production? Code-Splitting?
- **Future-readiness** - React Hooks? Web workers? PWA? Client-side caching?

[mockup]: https://cord-coding-challenges.s3-eu-west-1.amazonaws.com/frontend-test-mockups.zip
[themoviedb]: https://www.themoviedb.org/documentation/api
[popularmovies]: https://developers.themoviedb.org/3/movies/get-popular-movies
[moviegenres]: https://developers.themoviedb.org/3/genres/get-movie-list
[searchmovies]: https://developers.themoviedb.org/3/search/search-movies
