/**
 * Created by iguest on 10/27/14.
 */

$(document).ready(function() {
    var count = 0;
    var pre_tile;
    var pre_img;
    var match = 0;
    var miss = 0;
    var totalPairs = 8;
    var remainingPairs;
    var tilePairs = [];
    var start = true;

    $('#start').click(function() {
        //need to clear the previous game away 
        startGame();
        start = !start;
        match = 0;
        miss = 0;
        remainingPairs = 0;
        gameInfo();
    });

    //select 8 tiles
    function startGame() {
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

        _.forEach(selectedTiles, function (tile) {
            tilePairs.push(_.clone(tile));
            tilePairs.push(_.clone(tile));
        });

        tilePairs = _.shuffle(tilePairs);

        //build game board
        var gameBoard = $('#game-board');
        var row = $(document.createElement('div'));
        var img;
        _.forEach(tilePairs, function (tile, elemIndex) {
            if (elemIndex > 0 && 0 == elemIndex % 4) {
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
                animateFlip(img, tile);
            }
            else {
                animateFlip(img, tile);
                //second move of the turn
                if (tile.tileNum == pre_tile.tileNum) {
                    console.log("they match")
                    //tiles match, do count match num
                    match++;
                    pre_img = "";
                    pre_tile = "";
                }
                else {
                    miss++;
                    //set time out 1 sec, and flip them back
                    setTimeout(function() {
                        animateFlip(pre_img, pre_tile);
                        animateFlip(img, tile);
                        pre_img = "";
                        pre_tile = "";
                    }, 1000);

                }
            }

        }); // on click of gameboard image

    }


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

    function gameInfo() {
        var startTime = _.now();
        remainingPairs = totalPairs - match;
        var timer = window.setInterval(function () {
            var elapsedSeconds = Math.floor((_.now() - startTime) / 1000);
            $('#elapsed-seconds').text("Time Used: " + elapsedSeconds + "; Missed: " + miss + "; Matched: " + match
            + "Remaining Pairs: " + remainingPairs);

            if (match == 8) {
                window.clearInterval(timer);
            } // to stop timer
        }, 1000);
    }

});
