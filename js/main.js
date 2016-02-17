function randrange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function hasDoors(room, dungeon) {
    var roomList = [];
    var side, sides;
    var retval;

    if(room.doors.left == false) {
        roomList.append(dungeon[room.x - 1][room.y]);
        sides.append(0);
    }
    if(room.doors.right == false) {
        roomList.append(dungeon[room.x + 1][room.y]);
        sides.append(1);
    }
    if(room.doors.up == false) {
        roomList.append(dungeon[room.x][room.y - 1]);
        sides.append(2);
    }
    if(room.doors.down == false) {
        roomList.append(dungeon[room.x][room.y + 1]);
        sides.append(3);
    }

    if(sides.length > 0) {
        side = randrange(0, sides.length - 1);
    } else {
        side = -1;
    }

    retval[0] = roomList;
    retval[1] = side;

    return retval;
}

function generateDungeon(width, height, difficulty, max_rooms, startx, starty) {
    var done = false;
    var dungeon = [];
    var data = {};
    var row = [];
    var rooms = 0;
    var currentroom, oldroom;

    //Create empty dungeon
    for (var i = 0; i < width; i++) {
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
    currentroom.type = 0;

    rooms++;

    data.spawnRoom = currentroom;

    while (!done) {
        if(currentroom.type == -1) {
            var retval = hasDoors(currentroom, dungeon);
            var doors = retval[0];
            var side = retval[1];

            if(doors.length > 0) {
                oldroom = currentroom;
                currentroom = doors[randrange(0, doors.length - 1)];

                switch(side) {
                    case 0:
                        oldroom.left = true;
                        currentroom.right = true;
                        break;

                    case 1:
                        oldroom.right = true;
                        currentroom.left = true;
                        break;

                    case 2:
                        oldroom.up = true;
                        currentroom.down = true;
                        break;

                    case 3:
                        oldroom.down = true;
                        currentroom.up = true;
                        break;
                }

                rooms++;
            }
        }
    }

    data.dungeon = dungeon;

    return data;
}

$(function () {
    console.log(generateDungeon(3, 4, 1, 4, 1, 2))
});