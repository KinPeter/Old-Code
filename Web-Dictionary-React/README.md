## My Korean-Hungarian dictionary

Web-dictionary app that uses my own word list.  

![WebDict](https://stuff.p-kin.com/screentogif/webdict.gif)

:point_right: [Try it here!](https://dict.p-kin.com)

### Features: 
- **Data from Google Sheet -**
The app downloads the wordlist file directly from a published Google Sheet in TSV format which is then easily parsed by JavaScript.

- **Autocomplete -**
I implemented my own autocomplete component made in React

- **Prioritized search algorithm -**
The search algorithm checks both languages, first looking for exact matches, then the word standing on its own, then anything starting with the word, and finally anything that contains the word. 

### Technologies used: 
- TypeScript
- React
- SCSS