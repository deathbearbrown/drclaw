var five = require("johnny-five"),
board, array;
board = new five.Board();
board.on("ready", function() {

    //base
    five.Servo({
      id: 'rotator',
      pin: 2,
      range: [0, 180],
      startAt: 50
    });

    // Shoulder
    five.Servo({
      id: 'upper',
      range: [0, 180],
      pin: 3
    });

    // Elbow
    five.Servo({
      id: 'fore',
      range: [0, 180],
      pin: 4
    });

    //wrist
    five.Servo({
      id: 'wrist',
      range: [0, 180],
      pin:5
    });

    //twisty
    five.Servo({
      id: 'wrist',
      range: [0, 180],
      pin: 6
    });

    // grabbers
    five.Servo({
      id: 'grabber',
      range: [0, 75],
      pin: 7
    });


  array = new five.Servos();


  board.repl.inject({
    array: array
  });


  array.to(90, 750, 10);
});
