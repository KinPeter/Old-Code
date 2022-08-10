/**
 *  TILES functions
 */

// Mouse functions
function tileMouseFunctions() {
    var originalBG = $('.tile').css('background-color');
    var originalBorder = $('.tile').css('border');
    var x, y, xy, dark, light, bg;
    //change border and pointer on hover
    $('.tile').hover(function() {
        $(this).css('border', '1px solid hsl(33, 0%, 80%)');
        $(this).css("cursor", "pointer");
    //move the gradient background on mouse movement
    }).mousemove(function(e) {
        x  = e.pageX - this.offsetLeft;
        y  = e.pageY - this.offsetTop;
        xy = x + " " + y;
        dark = "hsl(33, 0%, 30%)";
        light = "hsl(33, 0%, 45%)";
        bg = `-webkit-gradient(radial, ${xy}, 0, ${xy}, 100, from(${light}), to(${dark})), ${originalBG}`;
        $(this).css('background', bg );
    //set back the original border and background on mouse leave                    
    }).mouseleave(function() {			
        $(this).css('background', originalBG);
        $(this).css('border', originalBorder);
    });
}
//starting function to load the tiles
function getTileData(category, dom) {
    //show loading text
    dom.html('Loading...');
    //get the data from the API and call the filling function
    $.getJSON(`${domain}/start/php/server.php?met=all&cat=${category}`, (data) => {
        fillTiles(data, dom);
    }).fail((xhr, status, message) => {
        dom.html('Sorry, something went wrong. ' + status + ': ' + message);
    });
}
//fills up the tile divs with the data
function fillTiles(data, dom) {
    var html;
    //clear loading text
    dom.html('');
    //append the tiles as html
    data.forEach((tile) => {
        html = `
            <div class="tile" onclick="window.open('${tile.link}','_blank')">
                <div class="tile-content">
                    <img src="./images/icons/${tile.icon}"><br>
                    ${tile.name}
                </div>
            </div>`;      
        dom.append(html);
    });
    //activate the mouse functions when the divs are appended
    tileMouseFunctions();
}



