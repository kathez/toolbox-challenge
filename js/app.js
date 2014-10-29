/**
 * Created by iguest on 10/27/14.
 */

$(document).ready(function() {
    var pre_tile;
    var count = 0;

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
    $('#game-board img').click(function() {
        var img = $(this);
        var tile = img.data('tile');
        if (count < 2 && !tile.flipped) {
            animateFlip(img, tile);
            count++;
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

    var startTime = _.now();
    var timer = window.setInterval(function() {
        var elapsedSeconds = Math.floor((_.now() - startTime) / 1000);
        $('#elapsed-seconds').text(elapsedSeconds);

        if (elapsedSeconds >= 10) {
            window.clearInterval(timer);
        } // to stop timer
    }, 1000);

});
