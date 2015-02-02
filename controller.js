var five = require("johnny-five");
var Lever = require("./lever")(five);
var board = new five.Board();

board.on("ready", function() {

// Servos:
// ---------------------------------
  //base
  five.Servo({
    id: 'rotator',
    pin: 7,
    range: [0, 180],
    startAt: 50
  });

  // Shoulder
  five.Servo({
    id: 'upper',
    range: [0, 180],
    pin: 8
  });

  // Elbow
  five.Servo({
    id: 'fore',
    range: [0, 180],
    pin: 9
  });

  //wrist
  five.Servo({
    id: 'wrist',
    range: [0, 180],
    pin: 11
  });

  //twisty
  five.Servo({
    id: 'wrist',
    range: [0, 180],
    pin: 12
  });

  // grabbers
  five.Servo({
    id: 'grabber',
    range: [0, 75],
    pin: 13
  });

  var pins = ["A1", "A2", "A3", "A4", "A5"];
  var levers = pins.map(function(pin) {
    return new Lever(pin);
  });

  armParts = new five.Servos();

  board.repl.inject({
    armParts: armParts
  });

  armParts.to(90, 500, 20);

  var increment = 2;

  levers.forEach(function(lever) {
    ["hold", "pivot"].forEach(function(type) {
      lever.on(type, function(event) {
        console.log("%s Lever: %s", type.toUpperCase(), "A" + lever.pin, Lever.NAMES[event.code]);
        switch (lever.pin) {
          case 1:
            var shoulder = armParts[1];
            var shoulderPrev = shoulder.position;

            if (Lever.NAMES[event.code]==="up"){
              shoulder.to(shoulderPrev+increment);
              console.log("shoulder goes up");
            } else if (Lever.NAMES[event.code]==="down"){
              shoulder.to(shoulderPrev-increment);
              console.log("shoulder goes down");
            }

            break;
          case 2:
            var elbow = armParts[2];
            var elbowPrev = elbow.position;

            if (Lever.NAMES[event.code]==="up"){
              elbow.to(elbowPrev+increment);
              console.log("elbow goes up");
            } else if (Lever.NAMES[event.code]==="down"){
              elbow.to(elbowPrev-increment);
              console.log("elbow goes down");
            }

            break;
          case 3:
            var wrist = armParts[3];
            var wristPrev = wrist.position;

            if (Lever.NAMES[event.code]==="up"){
              wrist.to(wristPrev+increment);
              console.log("wrist goes up");
            } else if (Lever.NAMES[event.code]==="down"){
              wrist.to(wristPrev-increment);
              console.log("wrist goes down");
            }

            break;
          case 4:
            var grabbers = armParts[5];
            var grabbersPrev = grabbers.position;

            if (Lever.NAMES[event.code]==="up"){
              grabbers.to(grabbersPrev+increment);
              console.log("grabbers expand");
            } else if (Lever.NAMES[event.code]==="down"){
              grabbers.to(grabbersPrev-increment);
              console.log("grabbers contract");
            }

            break;
          case 5:
            var base = armParts[0];
            var basePrev = base.position;

            if (Lever.NAMES[event.code]==="up"){
              base.to(basePrev+increment);
              console.log("base left one");
            } else if (Lever.NAMES[event.code]==="down"){
              base.to(basePrev-increment);
              console.log("base right one");
            }
            break;

          default:
            break;
        }

      })
    });
  });
});
