/*@include: ./keys.js, ./welcome-weather.js, ./tiles.js, ./links.js, ./dictionary.js,  ./notes.js, ./search.js, ./daily-korean.js @end*/

//Get user name, location and weather data
getLocationByIP(user, $('.welcome'), $('.weather'), getWeather);

//Fill up the notes
if (user === 'Peter') {
    fetchNotes();
}

//Fill up the tile boxes 
getTileData('top', $('#top-links'));
getTileData('coding', $('#coding-links'));
getTileData('google', $('#google-links'));
getTileData('fun', $('#fun-links'));
getTileData('others', $('#other-links'));

//Load Daily Korean cards
// --> loaded only when fetching dictionary is complete (fetchDictFromGoogleSheet())
