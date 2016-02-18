function drawDungeon(dungeon) {
    var spawnRoom = dungeon.spawnRoom;
    var grid = dungeon.dungeon;
    var realval = "";
    var val = "";

    console.log(grid);

    grid = grid[0].map(function (col, i) {
        return grid.map(function (row) {
            return row[i]
        })
    });

    console.log(grid);

    for (i = 0; i < grid.length; i++) {
        for (j = 0; j < grid[i].length; j++) {
            switch(grid[i][j].type) {
                case -1:
                    val = '<b class="room empty" myx="' + i + '" myy="' + j + '">[E]</b>';
                    break;

                case 0:
                    val = '<b class="room spawn" myx="' + i + '" myy="' + j + '">[S]</b>';
                    break;

                case 1:
                    val = '<b class="room normal" myx="' + i + '" myy="' + j + '">[R]</b>';
                    break;
            }

            realval += val
        }
        realval += '<br />';
    }
    $("body").html(realval);
    $("body").on('click', 'b.room', function() {
        var thisx = $(this).attr('myx');
        var thisy = $(this).attr('myy');

        console.log(window.dungeon.dungeon[thisx][thisy]);
    })
}

//THIS IS NEEDED CODE

function randrange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateDungeon(width, height, difficulty, max_rooms, startx, starty) {
    var done = false;
    var dungeon = [];
    var data = {};
    var row = [];
    var roomList = [];
    var rooms = 0;
    var currentroom, oldroom;

    //Create empty dungeon
    for (var i = 0; i < width; i++) {
        row = [];
        for (var j = 0; j < height; j++) {
            row[j] = {
                "type": -1,
                "x": i,
                "y": j,
                "doors": {
                    "left": false,
                    "right": false,
                    "up": false,
                    "down": false
                },
                "difficulty": 0
            }
        }
        dungeon[i] = row
    }

    //Create first room
    currentroom = dungeon[startx][starty];
    console.log(currentroom);
    currentroom.type = 0;
    roomList.push(currentroom);

    rooms++;

    data.spawnRoom = currentroom;

    while (!done) {
        oldroom = roomList[randrange(0, roomList.length - 1)];
        currentroom = null;
        switch (randrange(0, 3)) {
            case 0:
                if (typeof(dungeon[oldroom.x - 1]) != "undefined" && typeof(dungeon[oldroom.x - 1][oldroom.y]) != "undefined") {
                    currentroom = dungeon[oldroom.x - 1][oldroom.y];
                    if (currentroom.type == -1) {
                        oldroom.doors.left = true;
                        currentroom.doors.right = true;
                    }
                }
                break;

            case 1:
                if (typeof(dungeon[oldroom.x + 1]) != "undefined" && typeof(dungeon[oldroom.x + 1][oldroom.y]) != "undefined") {
                    currentroom = dungeon[oldroom.x + 1][oldroom.y];
                    if (currentroom.type == -1) {
                        oldroom.doors.right = true;
                        currentroom.doors.left = true;
                    }
                }
                break;

            case 2:
                if (typeof(dungeon[oldroom.x]) != "undefined" && typeof(dungeon[oldroom.x][oldroom.y - 1]) != "undefined") {
                    currentroom = dungeon[oldroom.x][oldroom.y - 1];
                    if (currentroom.type == -1) {
                        oldroom.doors.up = true;
                        currentroom.doors.down = true;
                    }
                }
                break;

            case 3:
                if (typeof(dungeon[oldroom.x]) != "undefined" && typeof(dungeon[oldroom.x][oldroom.y + 1]) != "undefined") {
                    currentroom = dungeon[oldroom.x][oldroom.y + 1];
                    if (currentroom.type == -1) {
                        oldroom.doors.down = true;
                        currentroom.doors.up = true;
                    }
                }
                break;
        }

        if (currentroom != null) {
            if (currentroom.type == -1) {
                currentroom.type = 1;
                rooms++;
                roomList.push(currentroom);
            }
        }

        if (rooms >= max_rooms) {
            done = true;
        }
    }

    data.dungeon = dungeon;

    return JSON.stringify(data);
}

function getJSONValue(json_string, identifier) {
    var json_object = JSON.parse(json_string);
    var ids = identifier.split('.');
    var current
    for(var id in ids) {
        current = ids[id];
        json_object = json_object[current];
    }
    if(typeof(json_object) != 'string' && typeof(json_object) != 'number') {
        json_object = JSON.stringify(json_object);
    }
    return json_object;
}

//NEEDED CODE ENDS HERE

$(function () {
    var dung = generateDungeon(50, 50, 1, 30, 29, 29);
    drawDungeon(dung);
    console.log(JSON.stringify(dung));
    window.dungeon = dung;
});