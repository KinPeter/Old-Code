# VocabCards-App
Mobile-friendly web app to practice Korean words from my wordlist, using flashcards.

![Vocabcards gif](https://stuff.p-kin.com/screentogif/vocabcards.gif)

### Features:
- **Data from Google Sheet**  
The app downloads the wordlist file directly from a published Google Sheet in TSV format which is then easily parsed by JavaScript.

- **Progress saved on server**  
The progress is saved in a JSON file on the server using arrays to store the indexes of the words.

- **Difficult Words**  
If a choice is not correct, the word goes into a separate array so the user can review those words later again.

- **Random, with a twist**  
The cards are picked randomly, but the different choices are programmed not to be so easy if possible - in case there are similar words in the list.

### Technologies used:
- JavaScript
- JQuery
- PHP

### Mobile view:
![Vocabcards gif](https://stuff.p-kin.com/screentogif/vocabcards-mobile.gif)