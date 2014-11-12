/**
 * Created by iguest on 10/27/14.
 */

$(document).ready(function() {
    var count = 0;
    var pre_tile;
    var pre_img;
    var match = 0;
    var miss = 0;
    var has_pre = false;
    var flip_wrong_match;


    //select 8 tiles
    var tiles = [];
    var idx; //loop variable
    for (idx = 1; idx <= 32; ++idx) {
        tiles.push({
           tileNum: idx,
           src: 'img/tile' + idx + '.jpg',
           flipped: false
        });
    }

    console.log(tiles);

    var shuffledTiles = _.shuffle(tiles);
    console.log(shuffledTiles);

    var selectedTiles = shuffledTiles.slice(0, 8);
    console.log(selectedTiles);



    var tilePairs = [];
    _.forEach(selectedTiles, function(tile) {
        tilePairs.push(_.clone(tile));
        tilePairs.push(_.clone(tile));
    });



    tilePairs = _.shuffle(tilePairs);


    //below is code for grid

    var gameBoard = $('#game-board');
    var row = $(document.createElement('div'));
    var img;
    _.forEach(tilePairs, function(tile, elemIndex) {
       if(elemIndex > 0 && 0 == elemIndex % 4) {
           gameBoard.append(row);
           row = $(document.createElement('div'));
       }
        img = $(document.createElement('img'));
        img.attr({
           src: 'img/tile-back.png',
           alt: 'image of tile ' + tile.tileNum
        });
        img.data('tile', tile);
        row.append(img);

    });
    gameBoard.append(row);


    //working here!!!
    //no need for count
    $('#game-board img').click(function() {
        var img = $(this);
        var tile = img.data('tile');
        if (tile.flipped) {
            return;
        }
        //console.log(pre_tile.tileNum + " is previous tile");
        if (!pre_img) {
            //first move of the turn
            pre_img = img;
            pre_tile = img.data('tile');
            has_pre = true;
            console.log("this is your first move. the tile number is " + pre_tile.tileNum);
            animateFlip(img, tile);
        }
        else {
            animateFlip(img, tile);
            console.log("Now you enter second move of the turn. The previous tile number is " + pre_tile.tileNum
                + ", and current one's is " + tile.tileNum);
            //second move of the turn
            if (tile.tileNum == pre_tile.tileNum) {
                console.log("they match")
                //tiles match, do count match num
                match++;
                console.log("now previous tile's number should be undefined, and it is " + pre_tile.tileNum);
            }
            else {
                miss++;
                //set time out 1 sec, and flip them back
                animateFlip(img, tile)
                animateFlip(pre_img, pre_tile);
            }
            pre_img = "";
            pre_tile = "";
            console.log(pre_img.src);
        }

    }); // on click of gameboard image

    function animateFlip(img, tile) {
        img.fadeOut(100, function() {
            if (tile.flipped) {
                img.attr('src', 'img/tile-back.png');
            } else {
                img.attr('src', tile.src);
            }
            tile.flipped = !tile.flipped;
            img.fadeIn(100);
        });
    }
    console.log(miss);
    var startTime = _.now();
    var timer = window.setInterval(function() {
        var elapsedSeconds = Math.floor((_.now() - startTime) / 1000);
        $('#elapsed-seconds').text("Time Used: " + elapsedSeconds + "; Missed: " + miss + "; Matched: " + match);

        if (match == 8) {
            window.clearInterval(timer);
        } // to stop timer
    }, 1000);

});