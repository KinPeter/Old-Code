const hun = {

    wordsForCommas: new Set([
        "de", "hogy", "viszont", "pedig", "s", "és", "persze",
        "szólott", "mondta", "mondotta", "hanem", "ami", "amit",
        "amelyet", "mely", "amely", "azt", "ezt", "mert", "ezért", 
        "azért", "amilyen", "amikor", "ahol", "hol", "mint",
        "mikor", "ezzel", "azzal", "arra", "erre", "tehát", "ha",
        "kérdezte", "kiáltott", "szólt"
    ]),

    ignored: new Set([
        "a", "az", "és", "s", "van", "volt", "nem", "is", "csak", "azt", "de"
    ]),

    error: {
        wordNotInList: 'Ezzel a szóval sajnos nem tudunk bullshitet generálni, nem szerepel a szövegben.',
        fileNotFound: 'A fájl nem található.',
        fileNotLoaded: 'A fájl nem töltődött be megfelelően...',
        oneWordOnly: 'Csak egy szót írj be!',
        fileNameError: 'Válassz egy forrásfájlt!'
    },

    note: {
        fileLoaded: ['Szuper!', 'A fájl betöltve.'],
        chooseFile: `<i class="fas fa-angle-double-right"></i> Válassz egy forrásfájlt 
                 <br><i class="fas fa-angle-double-right"></i> Töltsd be a fájlt 
                 <br><i class="fas fa-angle-double-right"></i> Ha szeretnéd, adj meg egy kezdőszót 
                 <br><i class="fas fa-angle-double-right"></i> Állítsd be a bullshit hosszát 
                 <br><i class="fas fa-angle-double-right"></i> Generálj!`
    },

    btn: {
        lang: 'In English <span><i class="fas fa-language"></i></span>',
        fileList: 'Forrásfájlok listája <i class="fas fa-caret-down"></i>',
        loadFile: 'Fájl betöltése',
        placeHolder: 'Írj be egy szót',
        generate: 'Bullshit generálása <i class="far fa-play-circle"></i>'
    },

    label: {
        firstWord: 'Kezdőszó:',
        notMandatory: 'Nem kötelező',
        bsLength: 'Bullshit hossza:'
    },

    files: [
        ['Tolsztoj: Háború és béke, I.kötet', 'haboru-es-beke.txt'],
        ['Osho: Az egész a változásról szól', 'osho.txt'],
        ['Rejtő Jenő: Piszkos Fred közbelép', 'rejto-piszkos-fred.txt'],
        ['Gaal György: Magyar népmesék gyűjteménye', 'magyar-nepmesek.txt'],
        ['Kristóf Miklós UFO Magazin cikkei', 'ufo.txt']
    ]
}

const eng = {

    wordsForCommas: new Set([
        "but", "therefore", "so", "like", "said", "thus", "asked"
    ]),

    ignored: new Set([
        "the", "and", "is", "are", "was", "were", "no", "not", "too", "only", "but", 
        "this", "that", "mr", "mrs", "ms"
    ]),

    error: {
        wordNotInList: 'Cannot use this word, it does not exist in the source file.',
        fileNotFound: 'File not found.',
        fileNotLoaded: 'File is not loaded properly...',
        oneWordOnly: 'Please enter only one word!',
        fileNameError: 'Please choose source file!'
    },

    note: {
        fileLoaded: ['Great!', 'File loaded successfully.'],
        chooseFile: `<i class="fas fa-angle-double-right"></i> Choose a source file 
                 <br><i class="fas fa-angle-double-right"></i> Load the file
                 <br><i class="fas fa-angle-double-right"></i> Set a starting word, if you like
                 <br><i class="fas fa-angle-double-right"></i> Set the length of the bullshit
                 <br><i class="fas fa-angle-double-right"></i> Generate!`
    },

    btn: {
        lang: 'Magyarul <span><i class="fas fa-language"></i></span>',
        fileList: 'Source files <i class="fas fa-caret-down"></i>',
        loadFile: 'Load file',
        placeHolder: 'Enter a word',
        generate: 'Generate Bullshit <i class="far fa-play-circle"></i>'
    },

    label: {
        firstWord: 'Starting word:',
        notMandatory: 'Not mandatory',
        bsLength: 'Bullshit length:'
    },

    files: [
        ['Tolstoy: War and Peace', 'war-and-peace.txt'],
        ['Osho: Beyond Enlightment', 'osho_en.txt'],
        ['Bram Stoker: Dracula\'s Guest', 'draculas-guest.txt'],
        ['The Brothers Grimm: Grimms\' Fairy Tales', 'grimm.txt'],
        ['The Constitution and Bill of Rights of the USA', 'usa.txt']
    ]
}